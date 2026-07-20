import { createHash } from 'node:crypto';
import Stripe from 'stripe';
import { getCatalogItem } from './_lib/catalog.js';
import { getStripeKey, getSupabaseConfig } from './_lib/environment.js';
import { eq, stripeObjectId, supabaseAdminRequest } from './_lib/supabase.js';

const MAX_WEBHOOK_BYTES = 1_048_576;
type ProcessResult = 'processed' | 'ignored';
type LedgerRow = { event_id: string; processing_status: string; attempt_count: number };
type CustomerRow = { user_id: string };
type MembershipRow = { id: string; user_id: string; item_id: string; stripe_event_created_at?: string | null };
type PaidInvoiceRow = { period_start: string | null; period_end: string | null };
type EventTimestampRow = { stripe_event_created_at: string | null };

function reply(status: number, body: Record<string, unknown>) {
  return Response.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' },
  });
}

function uuid(value: unknown) {
  return typeof value === 'string' && /^[0-9a-f]{8}-[0-9a-f-]{27}$/i.test(value) ? value : null;
}

function iso(seconds: unknown) {
  return typeof seconds === 'number' && Number.isFinite(seconds)
    ? new Date(seconds * 1000).toISOString()
    : null;
}

function stringValue(value: unknown) {
  return typeof value === 'string' ? value : null;
}

function stableUuid(value: string) {
  const hex = createHash('sha256').update(value).digest('hex').slice(0, 32);
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-4${hex.slice(13, 16)}-a${hex.slice(17, 20)}-${hex.slice(20)}`;
}

function isStale(current: string | null | undefined, incomingSeconds: number) {
  return Boolean(current && Date.parse(current) > incomingSeconds * 1000);
}

async function update(table: string, query: string, values: Record<string, unknown>) {
  const result = await supabaseAdminRequest<unknown[]>(table, {
    method: 'PATCH', query, body: { ...values, updated_at: new Date().toISOString() }, prefer: 'return=minimal',
  });
  if (!result.ok) throw new Error('DATABASE_UPDATE_FAILED');
}

async function beginEvent(event: Stripe.Event) {
  const inserted = await supabaseAdminRequest<LedgerRow[]>('stripe_events?on_conflict=event_id', {
    method: 'POST',
    body: {
      event_id: event.id,
      event_type: event.type,
      livemode: event.livemode,
      api_version: event.api_version,
      stripe_created_at: iso(event.created),
      processing_status: 'processing',
      attempt_count: 1,
    },
    prefer: 'resolution=ignore-duplicates,return=representation',
  });
  if (!inserted.ok) throw new Error('EVENT_LEDGER_FAILED');
  if (inserted.data[0]) return { duplicate: false, row: inserted.data[0] };

  const existing = await supabaseAdminRequest<LedgerRow[]>('stripe_events', {
    query: `select=event_id,processing_status,attempt_count&event_id=${eq(event.id)}&limit=1`,
  });
  if (!existing.ok || !existing.data[0]) throw new Error('EVENT_LEDGER_LOOKUP_FAILED');
  if (['processed', 'ignored'].includes(existing.data[0].processing_status)) {
    return { duplicate: true, row: existing.data[0] };
  }
  await update('stripe_events', `event_id=${eq(event.id)}`, {
    processing_status: 'processing',
    attempt_count: (existing.data[0].attempt_count || 0) + 1,
    last_error_code: null,
  });
  return { duplicate: false, row: existing.data[0] };
}

async function finishEvent(eventId: string, status: ProcessResult, errorCode: string | null = null) {
  const result = await supabaseAdminRequest<unknown[]>('stripe_events', {
    method: 'PATCH',
    query: `event_id=${eq(eventId)}`,
    body: {
      processing_status: errorCode ? 'failed' : status,
      processed_at: errorCode ? null : new Date().toISOString(),
      last_error_code: errorCode,
    },
    prefer: 'return=minimal',
  });
  if (!result.ok) throw new Error('EVENT_LEDGER_UPDATE_FAILED');
}

async function userForCustomer(customerId: string | null) {
  if (!customerId) return null;
  const result = await supabaseAdminRequest<CustomerRow[]>('stripe_customers', {
    query: `select=user_id&stripe_customer_id=${eq(customerId)}&limit=1`,
  });
  if (!result.ok) throw new Error('CUSTOMER_MAPPING_LOOKUP_FAILED');
  return result.data[0]?.user_id ?? null;
}

async function grantEntitlement(
  userId: string,
  itemId: string,
  membershipId: string,
  periodStart: string | null,
  periodEnd: string | null,
) {
  const entitlement = await supabaseAdminRequest<unknown[]>('entitlements?on_conflict=user_id,entitlement_key', {
    method: 'POST',
    body: {
      id: stableUuid(`entitlement:${userId}:${itemId}`),
      user_id: userId,
      entitlement_key: itemId,
      source_membership_id: membershipId,
      status: 'active',
      access_starts_at: periodStart,
      access_ends_at: periodEnd,
      updated_at: new Date().toISOString(),
    },
    prefer: 'resolution=merge-duplicates,return=minimal',
  });
  if (!entitlement.ok) throw new Error('ENTITLEMENT_SYNC_FAILED');
}

async function checkoutEvent(type: string, session: Stripe.Checkout.Session, eventCreated: number): Promise<ProcessResult> {
  const orderId = uuid(session.metadata?.order_id);
  if (!orderId) return 'ignored';
  const current = await supabaseAdminRequest<(EventTimestampRow & { item_id: string })[]>('orders', {
    query: `select=item_id,stripe_event_created_at&id=${eq(orderId)}&limit=1`,
  });
  if (!current.ok) throw new Error('ORDER_LOOKUP_FAILED');
  if (!current.data[0] || current.data[0].item_id !== session.metadata?.item_id) return 'ignored';
  if (isStale(current.data[0].stripe_event_created_at, eventCreated)) return 'ignored';
  let status = 'checkout_completed';
  if (type === 'checkout.session.expired') status = 'expired';
  else if (type === 'checkout.session.async_payment_failed') status = 'payment_failed';
  else if (type === 'checkout.session.async_payment_succeeded') status = 'paid';
  else if (session.mode === 'payment' && session.payment_status === 'paid') status = 'paid';

  await update('orders', `id=${eq(orderId)}`, {
    status,
    stripe_checkout_session_id: session.id,
    stripe_checkout_url: null,
    stripe_customer_id: stripeObjectId(session.customer),
    stripe_payment_intent_id: stripeObjectId(session.payment_intent),
    stripe_subscription_id: stripeObjectId(session.subscription),
    amount_total: session.amount_total,
    currency: session.currency,
    paid_at: status === 'paid' ? new Date().toISOString() : null,
    stripe_event_created_at: iso(eventCreated),
  });
  return 'processed';
}

function subscriptionPeriod(subscription: Stripe.Subscription) {
  const item = subscription.items.data[0];
  return {
    start: iso(item?.current_period_start),
    end: iso(item?.current_period_end),
  };
}

async function subscriptionEvent(subscription: Stripe.Subscription, eventCreated: number): Promise<ProcessResult> {
  const customerId = stripeObjectId(subscription.customer);
  const userId = await userForCustomer(customerId);
  const itemId = stringValue(subscription.metadata?.item_id);
  if (!userId || !itemId || getCatalogItem(itemId)?.mode !== 'subscription') return 'ignored';
  const existingMembership = await supabaseAdminRequest<MembershipRow[]>('memberships', {
    query: `select=id,user_id,item_id,stripe_event_created_at&stripe_subscription_id=${eq(subscription.id)}&limit=1`,
  });
  if (!existingMembership.ok) throw new Error('MEMBERSHIP_LOOKUP_FAILED');
  if (isStale(existingMembership.data[0]?.stripe_event_created_at, eventCreated)) return 'ignored';
  const period = subscriptionPeriod(subscription);
  const membershipId = existingMembership.data[0]?.id ?? uuid(subscription.metadata?.membership_id) ?? uuid(subscription.metadata?.order_id) ?? stableUuid(`membership:${subscription.id}`);
  const saved = await supabaseAdminRequest<unknown[]>('memberships?on_conflict=stripe_subscription_id', {
    method: 'POST',
    body: {
      id: membershipId,
      user_id: userId,
      item_id: itemId,
      stripe_subscription_id: subscription.id,
      stripe_customer_id: customerId,
      status: subscription.status,
      cancel_at_period_end: subscription.cancel_at_period_end,
      current_period_start: period.start,
      current_period_end: period.end,
      stripe_event_created_at: iso(eventCreated),
      updated_at: new Date().toISOString(),
    },
    prefer: 'resolution=merge-duplicates,return=minimal',
  });
  if (!saved.ok) throw new Error('MEMBERSHIP_SYNC_FAILED');

  const entitlementStatus = subscription.status === 'past_due'
    ? 'grace'
    : ['canceled', 'unpaid', 'incomplete_expired', 'paused'].includes(subscription.status)
      ? 'suspended'
      : null;
  if (entitlementStatus) {
    await update('entitlements', `user_id=${eq(userId)}&entitlement_key=${eq(itemId)}`, {
      status: entitlementStatus,
      access_ends_at: period.end,
    });
  } else if (subscription.status === 'active') {
    // Reconcile an out-of-order invoice.paid that arrived before the membership row.
    const paidInvoice = await supabaseAdminRequest<PaidInvoiceRow[]>('invoices', {
      query: `select=period_start,period_end&stripe_subscription_id=${eq(subscription.id)}&status=${eq('paid')}&order=period_end.desc&limit=1`,
    });
    if (!paidInvoice.ok) throw new Error('PAID_INVOICE_LOOKUP_FAILED');
    if (paidInvoice.data[0]) {
      await grantEntitlement(
        userId,
        itemId,
        membershipId,
        paidInvoice.data[0].period_start,
        paidInvoice.data[0].period_end,
      );
    }
  }
  return 'processed';
}

function invoiceSubscriptionId(invoice: Stripe.Invoice) {
  const parent = invoice.parent as unknown as {
    subscription_details?: { subscription?: unknown };
  } | null;
  return stripeObjectId(parent?.subscription_details?.subscription);
}

async function invoiceEvent(type: string, invoice: Stripe.Invoice, eventCreated: number): Promise<ProcessResult> {
  const customerId = stripeObjectId(invoice.customer);
  const userId = await userForCustomer(customerId);
  if (!userId) return 'ignored';
  const existingInvoice = await supabaseAdminRequest<EventTimestampRow[]>('invoices', {
    query: `select=stripe_event_created_at&stripe_invoice_id=${eq(invoice.id)}&limit=1`,
  });
  if (!existingInvoice.ok) throw new Error('INVOICE_LOOKUP_FAILED');
  if (isStale(existingInvoice.data[0]?.stripe_event_created_at, eventCreated)) return 'ignored';
  const subscriptionId = invoiceSubscriptionId(invoice);
  const membership = subscriptionId
    ? await supabaseAdminRequest<MembershipRow[]>('memberships', {
        query: `select=id,user_id,item_id&stripe_subscription_id=${eq(subscriptionId)}&limit=1`,
      })
    : null;
  if (membership && !membership.ok) throw new Error('MEMBERSHIP_LOOKUP_FAILED');
  const membershipRow = membership?.ok ? membership.data[0] : null;

  const saved = await supabaseAdminRequest<unknown[]>('invoices?on_conflict=stripe_invoice_id', {
    method: 'POST',
    body: {
      id: stableUuid(`invoice:${invoice.id}`),
      user_id: userId,
      stripe_invoice_id: invoice.id,
      stripe_customer_id: customerId,
      stripe_subscription_id: subscriptionId,
      status: invoice.status ?? type.replace('invoice.', ''),
      amount_due: invoice.amount_due,
      amount_paid: invoice.amount_paid,
      amount_remaining: invoice.amount_remaining,
      currency: invoice.currency,
      hosted_invoice_url: invoice.hosted_invoice_url ?? null,
      invoice_pdf: invoice.invoice_pdf ?? null,
      due_at: iso(invoice.due_date),
      paid_at: iso(invoice.status_transitions?.paid_at),
      period_start: iso(invoice.period_start),
      period_end: iso(invoice.period_end),
      stripe_event_created_at: iso(eventCreated),
      updated_at: new Date().toISOString(),
    },
    prefer: 'resolution=merge-duplicates,return=minimal',
  });
  if (!saved.ok) throw new Error('INVOICE_SYNC_FAILED');

  if (membershipRow && type === 'invoice.paid') {
    await update('memberships', `id=${eq(membershipRow.id)}`, {
      status: 'active',
      latest_stripe_invoice_id: invoice.id,
      current_period_start: iso(invoice.period_start),
      current_period_end: iso(invoice.period_end),
    });
    await grantEntitlement(
      userId,
      membershipRow.item_id,
      membershipRow.id,
      iso(invoice.period_start),
      iso(invoice.period_end),
    );
  } else if (membershipRow && ['invoice.payment_failed', 'invoice.payment_action_required'].includes(type)) {
    await update('memberships', `id=${eq(membershipRow.id)}`, { status: 'past_due', latest_stripe_invoice_id: invoice.id });
    await update('entitlements', `user_id=${eq(userId)}&entitlement_key=${eq(membershipRow.item_id)}`, { status: 'grace' });
  }
  return 'processed';
}

async function refundEvent(refund: Stripe.Refund): Promise<ProcessResult> {
  const paymentIntentId = stripeObjectId(refund.payment_intent);
  if (!paymentIntentId) return 'ignored';
  const status = refund.status === 'succeeded' ? 'refunded' : 'refund_pending';
  await update('orders', `stripe_payment_intent_id=${eq(paymentIntentId)}`, {
    status,
    stripe_refund_id: refund.id,
  });
  return 'processed';
}

async function disputeEvent(dispute: Stripe.Dispute): Promise<ProcessResult> {
  const paymentIntentId = stripeObjectId(dispute.payment_intent);
  if (!paymentIntentId) return 'ignored';
  await update('orders', `stripe_payment_intent_id=${eq(paymentIntentId)}`, {
    status: 'disputed',
    stripe_dispute_id: dispute.id,
  });
  return 'processed';
}

async function processEvent(event: Stripe.Event): Promise<ProcessResult> {
  if ([
    'checkout.session.completed',
    'checkout.session.async_payment_succeeded',
    'checkout.session.async_payment_failed',
    'checkout.session.expired',
  ].includes(event.type)) {
    return checkoutEvent(event.type, event.data.object as Stripe.Checkout.Session, event.created);
  }
  if (event.type.startsWith('customer.subscription.')) {
    return subscriptionEvent(event.data.object as Stripe.Subscription, event.created);
  }
  if ([
    'invoice.paid',
    'invoice.payment_failed',
    'invoice.payment_action_required',
    'invoice.finalized',
    'invoice.sent',
    'invoice.voided',
    'invoice.marked_uncollectible',
    'invoice.finalization_failed',
  ].includes(event.type)) {
    return invoiceEvent(event.type, event.data.object as Stripe.Invoice, event.created);
  }
  if (event.type === 'refund.created' || event.type === 'refund.updated') {
    return refundEvent(event.data.object as Stripe.Refund);
  }
  if (event.type === 'charge.dispute.created') {
    return disputeEvent(event.data.object as Stripe.Dispute);
  }
  return 'ignored';
}

export default {
  async fetch(request: Request) {
    if (request.method !== 'POST') return reply(405, { error: 'Method not allowed.', code: 'METHOD_NOT_ALLOWED' });
    const stripeKey = getStripeKey();
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET?.trim();
    const supabase = getSupabaseConfig();
    if (!stripeKey || !webhookSecret || !supabase.url || !supabase.adminKey) {
      return reply(503, { error: 'Webhook processing is not configured.', code: 'WEBHOOK_NOT_CONFIGURED' });
    }
    const signature = request.headers.get('stripe-signature');
    if (!signature) return reply(400, { error: 'Webhook signature is missing.', code: 'SIGNATURE_MISSING' });
    const declaredLength = Number(request.headers.get('content-length') ?? 0);
    if (Number.isFinite(declaredLength) && declaredLength > MAX_WEBHOOK_BYTES) {
      return reply(413, { error: 'Webhook payload is too large.', code: 'BODY_TOO_LARGE' });
    }

    const rawBody = await request.text();
    if (Buffer.byteLength(rawBody, 'utf8') > MAX_WEBHOOK_BYTES) {
      return reply(413, { error: 'Webhook payload is too large.', code: 'BODY_TOO_LARGE' });
    }
    const stripe = new Stripe(stripeKey, { apiVersion: '2026-06-24.dahlia', telemetry: false });
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    } catch {
      return reply(400, { error: 'Webhook signature is invalid.', code: 'INVALID_SIGNATURE' });
    }

    try {
      const ledger = await beginEvent(event);
      if (ledger.duplicate) return reply(200, { received: true, duplicate: true });
      const result = await processEvent(event);
      await finishEvent(event.id, result);
      return reply(200, { received: true });
    } catch (error) {
      const code = error instanceof Error ? error.message.slice(0, 80) : 'PROCESSING_FAILED';
      try { await finishEvent(event.id, 'ignored', code); } catch { /* Stripe retries the original event. */ }
      console.error('Stripe webhook processing failed', { eventId: event.id, eventType: event.type, code });
      return reply(500, { error: 'Webhook processing failed.', code: 'WEBHOOK_PROCESSING_FAILED' });
    }
  },
};
