import { getCatalogSetup } from './catalog.js';

function normalizeOrigin(value: string | undefined) {
  if (!value) return null;
  const candidate = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  try {
    const url = new URL(candidate);
    return ['http:', 'https:'].includes(url.protocol) ? url.origin : null;
  } catch {
    return null;
  }
}

export function getSiteUrl() {
  for (const candidate of [
    process.env.PUBLIC_SITE_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_URL,
  ]) {
    const origin = normalizeOrigin(candidate);
    if (origin) return origin;
  }
  return process.env.NODE_ENV === 'production' ? null : 'http://localhost:5173';
}

export function getStripeKey() {
  return (process.env.STRIPE_RESTRICTED_KEY || process.env.STRIPE_SECRET_KEY || '').trim() || null;
}

export function getSupabaseConfig() {
  const url = normalizeOrigin(process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL);
  const adminKey = (
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    ''
  ).trim();
  const authKey = (
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    process.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    adminKey
  ).trim();
  return { url, adminKey: adminKey || null, authKey: authKey || null };
}

export function getSetupState() {
  const supabase = getSupabaseConfig();
  const catalog = getCatalogSetup();
  return {
    stripe: getStripeKey() ? 'configured' : 'setup-required',
    stripeWebhook: process.env.STRIPE_WEBHOOK_SECRET ? 'configured' : 'setup-required',
    supabaseDatabase: supabase.url && supabase.adminKey ? 'configured' : 'setup-required',
    supabaseAuth: supabase.url && supabase.authKey ? 'configured' : 'setup-required',
    siteUrl: getSiteUrl() ? 'configured' : 'setup-required',
    priceCatalog: catalog.pricesReady ? 'configured' : 'setup-required',
    configuredPrices: catalog.configuredPrices,
    totalPrices: catalog.totalPrices,
  } as const;
}
