import type { IncomingMessage } from 'node:http';
import { getSupabaseConfig } from './environment.js';
import { getBearerToken } from './http.js';

type SupabaseResult<T> =
  | { ok: true; data: T; status: number }
  | { ok: false; code: 'NOT_CONFIGURED' | 'REQUEST_FAILED'; status: number };

function restUrl(table: string, query = '') {
  const config = getSupabaseConfig();
  if (!config.url) return null;
  return `${config.url}/rest/v1/${table}${query ? `?${query}` : ''}`;
}

export async function supabaseAdminRequest<T>(
  table: string,
  options: {
    method?: 'GET' | 'POST' | 'PATCH';
    query?: string;
    body?: unknown;
    prefer?: string;
  } = {},
): Promise<SupabaseResult<T>> {
  const config = getSupabaseConfig();
  const url = restUrl(table, options.query);
  if (!url || !config.adminKey) return { ok: false, code: 'NOT_CONFIGURED', status: 503 };

  try {
    const response = await fetch(url, {
      method: options.method ?? 'GET',
      headers: {
        apikey: config.adminKey,
        ...(!config.adminKey.startsWith('sb_')
          ? { Authorization: `Bearer ${config.adminKey}` }
          : {}),
        Accept: 'application/json',
        ...(options.body === undefined ? {} : { 'Content-Type': 'application/json' }),
        ...(options.prefer ? { Prefer: options.prefer } : {}),
      },
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) return { ok: false, code: 'REQUEST_FAILED', status: response.status };
    const text = await response.text();
    const data = (text ? JSON.parse(text) : null) as T;
    return { ok: true, data, status: response.status };
  } catch {
    return { ok: false, code: 'REQUEST_FAILED', status: 503 };
  }
}

type VerifiedUser = { id: string; email: string | null };
export type AuthResult =
  | { status: 'missing' }
  | { status: 'setup-required' }
  | { status: 'invalid' }
  | { status: 'verified'; user: VerifiedUser };

export async function verifySupabaseUser(request: IncomingMessage): Promise<AuthResult> {
  const token = getBearerToken(request);
  if (!token) return { status: 'missing' };

  const config = getSupabaseConfig();
  if (!config.url || !config.authKey) return { status: 'setup-required' };

  try {
    const response = await fetch(`${config.url}/auth/v1/user`, {
      headers: { apikey: config.authKey, Authorization: `Bearer ${token}` },
      signal: AbortSignal.timeout(8_000),
    });
    if (!response.ok) return { status: 'invalid' };
    const user = (await response.json()) as {
      id?: unknown;
      email?: unknown;
      is_anonymous?: unknown;
    };
    if (
      typeof user.id !== 'string' ||
      !/^[0-9a-f]{8}-[0-9a-f-]{27}$/i.test(user.id) ||
      user.is_anonymous === true
    ) {
      return { status: 'invalid' };
    }
    return {
      status: 'verified',
      user: { id: user.id, email: typeof user.email === 'string' ? user.email : null },
    };
  } catch {
    return { status: 'invalid' };
  }
}

export function eq(value: string) {
  return `eq.${encodeURIComponent(value)}`;
}

export function stripeObjectId(value: unknown) {
  if (typeof value === 'string') return value;
  if (value && typeof value === 'object' && 'id' in value && typeof value.id === 'string') {
    return value.id;
  }
  return null;
}
