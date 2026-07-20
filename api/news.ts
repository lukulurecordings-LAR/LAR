import type { ApiRequest, ApiResponse } from './_lib/http.js';
import { requireMethod, sendJson } from './_lib/http.js';
import { supabaseAdminRequest } from './_lib/supabase.js';

const curatedSources = [
  {
    name: 'Lukulu Academy & Recordings',
    type: 'website',
    url: 'https://lar-main.vercel.app/',
    note: 'Official website and service updates.',
  },
  {
    name: 'Google News search',
    type: 'google',
    url: 'https://news.google.com/search?q=%22Lukulu%20Academy%20%26%20Recordings%22',
    note: 'Independent web coverage; results are not automatically republished.',
  },
] as const;

type NewsRow = {
  id?: unknown;
  title?: unknown;
  summary?: unknown;
  url?: unknown;
  source_name?: unknown;
  source_type?: unknown;
  content_type?: unknown;
  image_url?: unknown;
  published_at?: unknown;
};

function safeUrl(value: unknown) {
  if (typeof value !== 'string' || value.length > 1000) return null;
  try {
    const url = new URL(value);
    return ['http:', 'https:'].includes(url.protocol) ? url.toString() : null;
  } catch {
    return null;
  }
}

function normalize(row: NewsRow) {
  const id = typeof row.id === 'string' ? row.id : null;
  const title = typeof row.title === 'string' ? row.title.trim().slice(0, 180) : '';
  const summary = typeof row.summary === 'string' ? row.summary.trim().slice(0, 500) : '';
  const url = safeUrl(row.url);
  const publishedAt = typeof row.published_at === 'string' && !Number.isNaN(Date.parse(row.published_at))
    ? row.published_at
    : null;
  const sourceType = typeof row.source_type === 'string'
    ? row.source_type.toLowerCase().slice(0, 30)
    : 'website';
  if (!id || !title || !summary || !url || !publishedAt) return null;
  return {
    id,
    title,
    summary,
    url,
    sourceName: typeof row.source_name === 'string' ? row.source_name.trim().slice(0, 100) : 'Lukulu',
    source: typeof row.source_name === 'string' ? row.source_name.trim().slice(0, 100) : 'Lukulu',
    sourceType,
    type: typeof row.content_type === 'string' ? row.content_type.toLowerCase().slice(0, 30) : 'news',
    kind: typeof row.content_type === 'string' ? row.content_type.toLowerCase().slice(0, 30) : 'news',
    approved: true,
    canonicalUrl: url,
    imageUrl: safeUrl(row.image_url),
    publishedAt,
    date: publishedAt,
  };
}

export default async function handler(request: ApiRequest, response: ApiResponse) {
  if (!requireMethod(request, response, 'GET')) return;

  const query = [
    'select=id,title,summary,url,source_name,source_type,content_type,image_url,published_at',
    'status=eq.published',
    'approved_at=not.is.null',
    `published_at=lte.${encodeURIComponent(new Date().toISOString())}`,
    'order=published_at.desc',
    'limit=12',
  ].join('&');
  const result = await supabaseAdminRequest<NewsRow[]>('label_news_items', { query });

  if (!result.ok) {
    return sendJson(response, 200, {
      status: result.code === 'NOT_CONFIGURED' ? 'setup-required' : 'temporarily-unavailable',
      sourceStatus: {
        state: result.code === 'NOT_CONFIGURED' ? 'setup-required' : 'temporarily-unavailable',
        moderation: 'manual-approval-required',
      },
      items: [],
      curatedSources,
      message: 'No social post or search result is republished until the label approves it.',
    });
  }

  const items = result.data.map(normalize).filter((item) => item !== null);
  return sendJson(response, 200, {
    status: items.length ? 'published' : 'awaiting-published-items',
    sourceStatus: {
      state: items.length ? 'published' : 'awaiting-published-items',
      moderation: 'approved-only',
    },
    items,
    curatedSources,
    message: items.length
      ? 'Showing label-approved news.'
      : 'No label-approved news has been published yet.',
  });
}
