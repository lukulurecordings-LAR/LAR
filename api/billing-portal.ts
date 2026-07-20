import Stripe from 'stripe';
import { getSiteUrl, getStripeKey, getSupabaseConfig } from './_lib/environment.js';
import type { ApiRequest, ApiResponse } from './_lib/http.js';
import { requireMethod, sendJson } from './_lib/http.js';
import { eq, supabaseAdminRequest, verifySupabaseUser } from './_lib/supabase.js';

type CustomerRow = { stripe_customer_id: string };

export default async function handler(request: ApiRequest, response: ApiResponse) {
  if (!requireMethod(request, response, 'POST')) return;

  const stripeKey = getStripeKey();
  const siteUrl = getSiteUrl();
  const supabase = getSupabaseConfig();
  if (!stripeKey) return sendJson(response, 503, { error: 'Billing is not configured.', code: 'STRIPE_NOT_CONFIGURED' });
  if (!siteUrl) return sendJson(response, 503, { error: 'Billing return URL is not configured.', code: 'SITE_URL_NOT_CONFIGURED' });
  if (!supabase.url || !supabase.adminKey || !supabase.authKey) {
    return sendJson(response, 503, { error: 'Student billing is not configured.', code: 'PERSISTENCE_NOT_CONFIGURED' });
  }

  const auth = await verifySupabaseUser(request);
  if (auth.status === 'missing') return sendJson(response, 401, { error: 'Student sign-in is required.', code: 'AUTH_REQUIRED' });
  if (auth.status === 'setup-required') return sendJson(response, 503, { error: 'Student authentication is not configured.', code: 'AUTH_NOT_CONFIGURED' });
  if (auth.status !== 'verified') return sendJson(response, 401, { error: 'Sign in again to continue.', code: 'INVALID_SESSION' });

  const mapping = await supabaseAdminRequest<CustomerRow[]>('stripe_customers', {
    query: `select=stripe_customer_id&user_id=${eq(auth.user.id)}&limit=1`,
  });
  if (!mapping.ok) return sendJson(response, 502, { error: 'Billing profile could not be loaded.', code: 'CUSTOMER_LOOKUP_FAILED' });
  if (!mapping.data[0]) return sendJson(response, 404, { error: 'No billing profile exists for this student yet.', code: 'CUSTOMER_NOT_FOUND' });

  try {
    const stripe = new Stripe(stripeKey, { apiVersion: '2026-06-24.dahlia', telemetry: false });
    const session = await stripe.billingPortal.sessions.create({
      customer: mapping.data[0].stripe_customer_id,
      return_url: `${siteUrl}/student/billing`,
    });
    return sendJson(response, 200, { url: session.url });
  } catch {
    return sendJson(response, 502, { error: 'The billing portal could not open.', code: 'PORTAL_UNAVAILABLE' });
  }
}
