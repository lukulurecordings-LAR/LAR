import { randomUUID } from 'node:crypto';
import type { ApiRequest, ApiResponse } from './_lib/http.js';
import { jsonBodyError, readJsonBody, requireMethod, sendJson } from './_lib/http.js';
import { supabaseAdminRequest } from './_lib/supabase.js';

const services = {
  academy: ['course-advice', 'basic', 'pro', 'vip', 'billing-help'],
  studio: ['recording', 'mixing', 'mastering', 'podcast'],
  beats: ['basic-licence', 'premium-licence', 'exclusive-availability', 'custom-production'],
  design: ['cover', 'poster', 'album', 'video', 'social-pack'],
  label: ['demo-submission', 'release-distribution', 'artist-support'],
  accounts: ['payment-help', 'subscription-help', 'receipt-invoice'],
} as const;

type Category = keyof typeof services;
type EnquiryBody = Record<string, unknown>;

function cleanText(value: unknown, min: number, max: number) {
  if (typeof value !== 'string') return null;
  const clean = Array.from(value, (character) => {
    const code = character.charCodeAt(0);
    return code <= 31 || code === 127 ? ' ' : character;
  }).join('').replace(/\s+/g, ' ').trim();
  return clean.length >= min && clean.length <= max ? clean : null;
}

function optionalText(value: unknown, max: number) {
  if (value === undefined || value === null || value === '') return null;
  return cleanText(value, 1, max);
}

function optionalUrl(value: unknown) {
  if (value === undefined || value === null || value === '') return null;
  if (typeof value !== 'string' || value.length > 500) return undefined;
  try {
    const url = new URL(value);
    return ['http:', 'https:'].includes(url.protocol) ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}

function optionalDate(value: unknown) {
  if (value === undefined || value === null || value === '') return null;
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return undefined;
  const parsed = Date.parse(`${value}T00:00:00Z`);
  return Number.isNaN(parsed) ? undefined : value;
}

function validate(body: EnquiryBody) {
  const name = cleanText(body.name, 2, 100);
  const email = cleanText(body.email, 5, 254)?.toLowerCase() ?? null;
  const phone = optionalText(body.phone, 40);
  const message = cleanText(body.message, 20, 3000);
  const category = typeof body.category === 'string' && body.category in services
    ? body.category as Category
    : null;
  const service = category && typeof body.service === 'string' &&
    (services[category] as readonly string[]).includes(body.service)
    ? body.service
    : null;
  const referenceUrl = optionalUrl(body.referenceUrl);
  const preferredDate = optionalDate(body.preferredDate);

  if (typeof body.company === 'string' && body.company.trim()) return { error: 'SPAM_DETECTED' as const };
  if (!name) return { error: 'INVALID_NAME' as const };
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: 'INVALID_EMAIL' as const };
  if (body.phone && phone === null) return { error: 'INVALID_PHONE' as const };
  if (!category || !service) return { error: 'INVALID_SERVICE' as const };
  if (!message) return { error: 'INVALID_MESSAGE' as const };
  if (referenceUrl === undefined) return { error: 'INVALID_REFERENCE_URL' as const };
  if (preferredDate === undefined) return { error: 'INVALID_PREFERRED_DATE' as const };

  return { value: { name, email, phone, category, service, message, referenceUrl, preferredDate } };
}

export default async function handler(request: ApiRequest, response: ApiResponse) {
  if (!requireMethod(request, response, 'POST')) return;

  let body: EnquiryBody;
  try {
    body = await readJsonBody<EnquiryBody>(request, 24_000);
  } catch (error) {
    return jsonBodyError(response, error);
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return sendJson(response, 400, { error: 'Enter valid enquiry details.', code: 'INVALID_ENQUIRY' });
  }
  const parsed = validate(body);
  if ('error' in parsed) {
    return sendJson(response, 400, { error: 'Check the highlighted enquiry details.', code: parsed.error });
  }

  const id = randomUUID();
  const date = new Date().toISOString().slice(0, 10).replaceAll('-', '');
  const referenceId = `LAR-${date}-${id.slice(0, 8).toUpperCase()}`;
  const result = await supabaseAdminRequest<unknown[]>('enquiries', {
    method: 'POST',
    body: {
      id,
      reference_id: referenceId,
      name: parsed.value.name,
      email: parsed.value.email,
      phone: parsed.value.phone,
      category: parsed.value.category,
      service: parsed.value.service,
      message: parsed.value.message,
      reference_url: parsed.value.referenceUrl,
      preferred_date: parsed.value.preferredDate,
      status: 'new',
    },
    prefer: 'return=minimal',
  });

  if (!result.ok) {
    const code = result.code === 'NOT_CONFIGURED'
      ? 'ENQUIRIES_NOT_CONFIGURED'
      : 'ENQUIRY_PERSISTENCE_FAILED';
    return sendJson(response, result.code === 'NOT_CONFIGURED' ? 503 : 502, {
      error: 'The enquiry could not be saved.',
      code,
    });
  }

  return sendJson(response, 201, { referenceId });
}
