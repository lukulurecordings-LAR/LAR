import { createHash, randomBytes, randomUUID } from 'node:crypto';
import Stripe from 'stripe';
import { getCatalogItem, getStripePriceId } from './_lib/catalog.js';
import { getSiteUrl, getStripeKey, getSupabaseConfig } from './_lib/environment.js';
import type { ApiRequest, ApiResponse } from './_lib/http.js';
import { jsonBodyError, readJsonBody, requireMethod, sendJson } from './_lib/http.js';
import { eq, supabaseAdminRequest, verifySupabaseUser } from './_lib/supabase.js';

type CheckoutBody = { itemId?: unknown; context?: unknown; requestId?: unknown };
type OrderRow = {
  id: string;
  item_id: string;
  user_id: string | null;
  stripe_checkout_session_id: string | null;
  stripe_checkout_url: string | null;
};
type CustomerRow = { user_id: string; stripe_customer_id: string };

const allowedContextKeys = new Set(['name', 'email', 'date', 'time', 'service', 'beat', 'licence']);

function sanitizeContext(value: unknown) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {};
  const clean: Record<string, string> = {};
  for (const [key, raw] of Object.entries(value)) {
    if (!allowedContextKeys.has(key) || typeof raw !== 'string') continue;
    const normalized = Array.from(raw, (character) => {
      const code = character.charCodeAt(0);
      return code <= 31 || code === 127 ? ' ' : character;
    }).join('').replace(/\s+/g, ' ').trim();
    if (normalized) clean[key] = normalized.slice(0, 200);
  }
  return clean;
}

function requestKey(request: ApiRequest, body: CheckoutBody) {
  const header = request.headers['idempotency-key'];
  const value = typeof header === 'string' ? header : body.requestId;
  if (typeof value === 'string' && /^[A-Za-z0-9._:-]{8,128}$/.test(value)) return value;
  return randomUUID();
}

function hash(value: string) {
  return createHash('sha256').update(value).digest('hex');
}

function integrationIdentifier() {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  return `lukulu_${[...randomBytes(8)].map((byte) => letters[byte % letters.length]).join('')}`;
}

function returnHash(category: string) {
  return ({ membership: '#pricing', studio: '#studio', beat: '#beats', design: '#design' } as const)[
    category as 'membership' | 'studio' | 'beat' | 'design'
  ];
}

async function ensureProfile(userId: string) {
  return supabaseAdminRequest<unknown[]>('student_profiles?on_conflict=id', {
    method: 'POST',
    body: { id: userId },
    prefer: 'resolution=ignore-duplicates,return=minimal',
  });
}

async function getOrCreateCustomer(stripe: Stripe, user: { id: string; email: string | null }) {
  const existing = await supabaseAdminRequest<CustomerRow[]>('stripe_customers', {
    query: `select=user_id,stripe_customer_id&user_id=${eq(user.id)}&limit=1`,
  });
  if (!existing.ok) throw new Error('CUSTOMER_LOOKUP_FAILED');
  if (existing.data[0]) return existing.data[0].stripe_customer_id;

  const customer = await stripe.customers.create(
    {
      ...(user.email ? { email: user.email } : {}),
      metadata: { student_profile_id: user.id },
    },
    { idempotencyKey: `student_customer_${user.id}` },
  );
  const saved = await supabaseAdminRequest<unknown[]>('stripe_customers?on_conflict=user_id', {
    method: 'POST',
    body: { user_id: user.id, stripe_customer_id: customer.id, updated_at: new Date().toISOString() },
    prefer: 'resolution=merge-duplicates,return=minimal',
  });
  if (!saved.ok) throw new Error('CUSTOMER_MAPPING_FAILED');
  return customer.id;
}

async function createOrder(input: {
  itemId: string;
  category: string;
  mode: string;
  userId: string | null;
  context: Record<string, string>;
  clientRequestHash: string;
}) {
  const id = randomUUID();
  const inserted = await supabaseAdminRequest<OrderRow[]>('orders?on_conflict=client_request_hash', {
    method: 'POST',
    body: {
      id,
      item_id: input.itemId,
      category: input.category,
      checkout_mode: input.mode,
      user_id: input.userId,
      request_context: input.context,
      client_request_hash: input.clientRequestHash,
      status: 'pending',
    },
    prefer: 'resolution=ignore-duplicates,return=representation',
  });
  if (!inserted.ok) throw new Error(inserted.code);
  if (inserted.data[0]) return inserted.data[0];

  const existing = await supabaseAdminRequest<OrderRow[]>('orders', {
    query: `select=id,item_id,user_id,stripe_checkout_session_id,stripe_checkout_url&client_request_hash=${eq(input.clientRequestHash)}&limit=1`,
  });
  if (!existing.ok || !existing.data[0]) throw new Error('ORDER_LOOKUP_FAILED');
  return existing.data[0];
}

async function updateOrder(id: string, values: Record<string, unknown>) {
  return supabaseAdminRequest<unknown[]>('orders', {
    method: 'PATCH',
    query: `id=${eq(id)}`,
    body: { ...values, updated_at: new Date().toISOString() },
    prefer: 'return=minimal',
  });
}

export default async function handler(request: ApiRequest, response: ApiResponse) {
  if (!requireMethod(request, response, 'POST')) return;

  let body: CheckoutBody;
  try {
    body = await readJsonBody<CheckoutBody>(request);
  } catch (error) {
    return jsonBodyError(response, error);
  }
  if (!body || typeof body !== 'object' || typeof body.itemId !== 'string') {
    return sendJson(response, 400, { error: 'A valid product is required.', code: 'INVALID_PRODUCT' });
  }

  const item = getCatalogItem(body.itemId);
  if (!item) return sendJson(response, 400, { error: 'That product is not available.', code: 'PRODUCT_UNAVAILABLE' });

  const price = getStripePriceId(item);
  if (!price) return sendJson(response, 503, { error: 'This product price is not configured.', code: 'PRICE_NOT_CONFIGURED' });
  const stripeKey = getStripeKey();
  if (!stripeKey) return sendJson(response, 503, { error: 'Online checkout is not configured.', code: 'STRIPE_NOT_CONFIGURED' });
  const siteUrl = getSiteUrl();
  if (!siteUrl) return sendJson(response, 503, { error: 'Checkout return URL is not configured.', code: 'SITE_URL_NOT_CONFIGURED' });
  const supabase = getSupabaseConfig();
  if (!supabase.url || !supabase.adminKey) {
    return sendJson(response, 503, { error: 'Order storage is not configured.', code: 'PERSISTENCE_NOT_CONFIGURED' });
  }

  const auth = await verifySupabaseUser(request);
  if (auth.status === 'setup-required') return sendJson(response, 503, { error: 'Student authentication is not configured.', code: 'AUTH_NOT_CONFIGURED' });
  if (auth.status === 'invalid') return sendJson(response, 401, { error: 'Sign in again to continue.', code: 'INVALID_SESSION' });
  if (item.mode === 'subscription' && auth.status !== 'verified') {
    return sendJson(response, 401, { error: 'Student sign-in is required for memberships.', code: 'AUTH_REQUIRED' });
  }

  const context = sanitizeContext(body.context);
  if (context.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(context.email)) {
    return sendJson(response, 400, { error: 'Enter a valid email address.', code: 'INVALID_EMAIL' });
  }
  const user = auth.status === 'verified' ? auth.user : null;
  if (user) {
    const profile = await ensureProfile(user.id);
    if (!profile.ok) return sendJson(response, 502, { error: 'Student profile could not be prepared.', code: 'PROFILE_UNAVAILABLE' });
  }

  let order: OrderRow;
  try {
    order = await createOrder({
      itemId: item.id,
      category: item.category,
      mode: item.mode,
      userId: user?.id ?? null,
      context,
      clientRequestHash: hash(requestKey(request, body)),
    });
  } catch {
    return sendJson(response, 502, { error: 'Checkout could not create an order.', code: 'ORDER_PERSISTENCE_FAILED' });
  }
  if (order.item_id !== item.id || order.user_id !== (user?.id ?? null)) {
    return sendJson(response, 409, { error: 'This checkout request conflicts with an earlier request.', code: 'IDEMPOTENCY_CONFLICT' });
  }
  if (order.stripe_checkout_session_id && order.stripe_checkout_url) {
    return sendJson(response, 200, { url: order.stripe_checkout_url, sessionId: order.stripe_checkout_session_id, orderId: order.id });
  }

  const stripe = new Stripe(stripeKey, { apiVersion: '2026-06-24.dahlia', telemetry: false });
  try {
    const customerId = user ? await getOrCreateCustomer(stripe, user) : null;
    const metadata = { order_id: order.id, item_id: item.id, ...(user ? { student_profile_id: user.id } : {}) };
    const section = returnHash(item.category);
    const session = await stripe.checkout.sessions.create(
      {
        mode: item.mode,
        line_items: [{ quantity: 1, price }],
        success_url: `${siteUrl}/?checkout=success&order=${encodeURIComponent(order.id)}${section}`,
        cancel_url: `${siteUrl}/?checkout=cancelled&order=${encodeURIComponent(order.id)}${section}`,
        ...(customerId ? { customer: customerId } : context.email ? { customer_email: context.email } : {}),
        allow_promotion_codes: true,
        billing_address_collection: 'auto',
        phone_number_collection: { enabled: item.category === 'studio' },
        submit_type: item.submitType,
        integration_identifier: integrationIdentifier(),
        metadata,
        ...(item.mode === 'subscription'
          ? { subscription_data: { metadata } }
          : { payment_intent_data: { metadata } }),
      },
      { idempotencyKey: `checkout_${order.id}` },
    );
    if (!session.url) throw new Error('CHECKOUT_URL_MISSING');
    const updated = await updateOrder(order.id, {
      stripe_checkout_session_id: session.id,
      stripe_checkout_url: session.url,
      stripe_customer_id: customerId,
      status: 'checkout_created',
    });
    if (!updated.ok) throw new Error('ORDER_UPDATE_FAILED');
    return sendJson(response, 200, { url: session.url, sessionId: session.id, orderId: order.id });
  } catch {
    await updateOrder(order.id, { status: 'checkout_failed' });
    return sendJson(response, 502, { error: 'Checkout could not start. Please try again.', code: 'CHECKOUT_UNAVAILABLE' });
  }
}
