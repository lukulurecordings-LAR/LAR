import type { IncomingMessage, ServerResponse } from 'node:http';
import Stripe from 'stripe';
import { getCatalogItem } from './_lib/catalog.js';

type VercelRequest = IncomingMessage & { body?: unknown };
type VercelResponse = ServerResponse;

const allowedContextKeys = new Set([
  'name',
  'email',
  'date',
  'time',
  'service',
  'beat',
  'licence',
]);

type CheckoutBody = {
  itemId?: unknown;
  context?: unknown;
};

function sendJson(
  response: VercelResponse,
  status: number,
  body: Record<string, unknown>,
) {
  response.statusCode = status;
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.setHeader('Cache-Control', 'no-store');
  response.end(JSON.stringify(body));
}

function parseBody(request: VercelRequest): CheckoutBody | null {
  if (request.body && typeof request.body === 'object') {
    return request.body as CheckoutBody;
  }

  if (typeof request.body === 'string') {
    try {
      return JSON.parse(request.body) as CheckoutBody;
    } catch {
      return null;
    }
  }

  return null;
}

function sanitizeContext(value: unknown) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return {};
  }

  const clean: Record<string, string> = {};
  for (const [key, rawValue] of Object.entries(value)) {
    if (!allowedContextKeys.has(key) || typeof rawValue !== 'string') {
      continue;
    }

    const normalized = Array.from(rawValue, (character) => {
      const codePoint = character.charCodeAt(0);
      return codePoint <= 31 || codePoint === 127 ? ' ' : character;
    })
      .join('')
      .trim();
    if (normalized) {
      clean[key] = normalized.slice(0, 200);
    }
  }

  return clean;
}

function normalizeUrl(value: string | undefined) {
  if (!value) return null;

  const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  try {
    const url = new URL(withProtocol);
    if (!['http:', 'https:'].includes(url.protocol)) return null;
    return url.origin;
  } catch {
    return null;
  }
}

function getSiteUrl() {
  const candidates = [
    process.env.PUBLIC_SITE_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_URL,
  ];

  for (const candidate of candidates) {
    const normalized = normalizeUrl(candidate);
    if (normalized) return normalized;
  }

  if (process.env.NODE_ENV !== 'production') {
    return 'http://localhost:5173';
  }

  return null;
}

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return sendJson(response, 405, { error: 'Method not allowed.' });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return sendJson(response, 503, {
      error: 'Online checkout is being connected. Please contact Lukulu to order.',
      code: 'STRIPE_NOT_CONFIGURED',
    });
  }

  const siteUrl = getSiteUrl();
  if (!siteUrl) {
    return sendJson(response, 503, {
      error: 'Checkout return URL is not configured.',
      code: 'SITE_URL_NOT_CONFIGURED',
    });
  }

  const body = parseBody(request);
  if (!body || typeof body.itemId !== 'string') {
    return sendJson(response, 400, { error: 'A valid product is required.' });
  }

  const item = getCatalogItem(body.itemId);
  if (!item) {
    return sendJson(response, 400, { error: 'That product is not available.' });
  }

  const context = sanitizeContext(body.context);
  const customerEmail = context.email;
  if (customerEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
    return sendJson(response, 400, { error: 'Enter a valid email address.' });
  }

  const stripe = new Stripe(secretKey);
  const recurring = item.mode === 'subscription' ? { interval: 'month' as const } : undefined;
  const metadata = {
    itemId: item.id,
    category: item.category,
    ...context,
  };

  try {
    const session = await stripe.checkout.sessions.create({
      mode: item.mode,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'zar',
            unit_amount: item.unitAmount,
            recurring,
            product_data: {
              name: item.name,
              description: item.description,
            },
          },
        },
      ],
      success_url: `${siteUrl}/?checkout=success&item=${encodeURIComponent(item.id)}#pricing`,
      cancel_url: `${siteUrl}/?checkout=cancelled&item=${encodeURIComponent(item.id)}#pricing`,
      customer_email: customerEmail,
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
      phone_number_collection: {
        enabled: item.category === 'studio',
      },
      submit_type: item.submitType,
      metadata,
      ...(item.mode === 'subscription'
        ? { subscription_data: { metadata } }
        : { payment_intent_data: { metadata } }),
    });

    if (!session.url) {
      throw new Error('Stripe did not return a Checkout URL.');
    }

    return sendJson(response, 200, {
      url: session.url,
      sessionId: session.id,
    });
  } catch (error) {
    console.error('Stripe Checkout session creation failed', {
      itemId: item.id,
      error: error instanceof Error ? error.message : 'Unknown error',
    });

    return sendJson(response, 502, {
      error: 'Checkout could not start. Please try again or contact Lukulu.',
      code: 'CHECKOUT_UNAVAILABLE',
    });
  }
}
