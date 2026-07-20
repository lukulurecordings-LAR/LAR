import type { ApiRequest, ApiResponse } from './_lib/http.js';
import { getSetupState } from './_lib/environment.js';
import { requireMethod, sendJson } from './_lib/http.js';

export default function handler(request: ApiRequest, response: ApiResponse) {
  if (!requireMethod(request, response, 'GET')) return;
  return sendJson(response, 200, { status: 'ok', setup: getSetupState() });
}
