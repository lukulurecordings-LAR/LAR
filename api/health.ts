import type { IncomingMessage, ServerResponse } from 'node:http';

export default function handler(
  request: IncomingMessage,
  response: ServerResponse,
) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    response.statusCode = 405;
    response.setHeader('Content-Type', 'application/json; charset=utf-8');
    return response.end(JSON.stringify({ error: 'Method not allowed.' }));
  }

  response.setHeader('Cache-Control', 'no-store');
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.statusCode = 200;
  return response.end(
    JSON.stringify({
      status: 'ok',
      checkout: process.env.STRIPE_SECRET_KEY ? 'configured' : 'setup-required',
    }),
  );
}
