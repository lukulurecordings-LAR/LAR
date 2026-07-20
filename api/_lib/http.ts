import type { IncomingMessage, ServerResponse } from 'node:http';

export type ApiRequest = IncomingMessage & { body?: unknown };
export type ApiResponse = ServerResponse;

export function sendJson(
  response: ApiResponse,
  status: number,
  body: Record<string, unknown>,
) {
  response.statusCode = status;
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.setHeader('Cache-Control', 'no-store');
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.end(JSON.stringify(body));
}

export function requireMethod(
  request: ApiRequest,
  response: ApiResponse,
  method: 'GET' | 'POST',
) {
  if (request.method === method) return true;
  response.setHeader('Allow', method);
  sendJson(response, 405, { error: 'Method not allowed.', code: 'METHOD_NOT_ALLOWED' });
  return false;
}

export async function readRawBody(request: IncomingMessage, maxBytes = 32_768) {
  const declaredLength = Number(request.headers['content-length'] ?? 0);
  if (Number.isFinite(declaredLength) && declaredLength > maxBytes) {
    throw new Error('BODY_TOO_LARGE');
  }

  const chunks: Buffer[] = [];
  let size = 0;
  for await (const chunk of request) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    size += buffer.length;
    if (size > maxBytes) throw new Error('BODY_TOO_LARGE');
    chunks.push(buffer);
  }
  return Buffer.concat(chunks);
}

export async function readJsonBody<T>(request: ApiRequest, maxBytes = 32_768): Promise<T> {
  if (!String(request.headers['content-type'] ?? '').toLowerCase().includes('application/json')) {
    throw new Error('UNSUPPORTED_CONTENT_TYPE');
  }

  let existing: unknown;
  try {
    existing = request.body;
  } catch {
    throw new Error('INVALID_JSON');
  }

  if (existing !== undefined && existing !== null) {
    const serialized = typeof existing === 'string' ? existing : JSON.stringify(existing);
    if (Buffer.byteLength(serialized, 'utf8') > maxBytes) throw new Error('BODY_TOO_LARGE');
    try {
      return (typeof existing === 'string' ? JSON.parse(existing) : existing) as T;
    } catch {
      throw new Error('INVALID_JSON');
    }
  }

  const raw = await readRawBody(request, maxBytes);
  try {
    return JSON.parse(raw.toString('utf8')) as T;
  } catch {
    throw new Error('INVALID_JSON');
  }
}

export function jsonBodyError(response: ApiResponse, error: unknown) {
  const code = error instanceof Error ? error.message : 'INVALID_JSON';
  if (code === 'BODY_TOO_LARGE') {
    return sendJson(response, 413, { error: 'Request body is too large.', code });
  }
  if (code === 'UNSUPPORTED_CONTENT_TYPE') {
    return sendJson(response, 415, { error: 'Send JSON content.', code });
  }
  return sendJson(response, 400, { error: 'Request body is not valid JSON.', code: 'INVALID_JSON' });
}

export function getBearerToken(request: IncomingMessage) {
  const header = request.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) return null;
  const token = header.slice(7).trim();
  return token && token.length <= 4096 ? token : null;
}
