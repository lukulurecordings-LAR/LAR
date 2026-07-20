import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import {
  AlertCircleIcon,
  ArrowUpRightIcon,
  Disc3Icon,
  ExternalLinkIcon,
  NewspaperIcon,
  RefreshCwIcon,
  SendIcon,
} from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { DocumentTitle } from '../components/DocumentTitle';
import { EnquiryForm } from '../components/EnquiryForm';
import { Footer } from '../components/Footer';
import { PageHero } from '../components/PageHero';

type NewsTab = 'releases' | 'news' | 'demo';

type NewsItem = {
  id?: string;
  title: string;
  summary?: string;
  source?: string;
  sourceName?: string;
  sourceType?: string;
  publishedAt?: string;
  date?: string;
  canonicalUrl?: string;
  url?: string;
  type?: string;
  kind?: string;
  approved?: boolean;
};

type NewsResponse = {
  items?: NewsItem[];
  sourceStatus?: unknown;
  status?: unknown;
  curatedSources?: Array<{ name?: unknown; type?: unknown; url?: unknown; note?: unknown }>;
};

const tabs: Array<{ id: NewsTab; label: string; icon: typeof Disc3Icon }> = [
  { id: 'releases', label: 'Releases', icon: Disc3Icon },
  { id: 'news', label: 'Label News', icon: NewspaperIcon },
  { id: 'demo', label: 'Submit Demo', icon: SendIcon },
];

const curatedSources = {
  releases: [
    {
      title: 'Lukulu Recordings on Beatport',
      source: 'Beatport',
      summary: 'Browse the label catalogue on its confirmed Beatport label page.',
      url: 'https://www.beatport.com/label/lukulu-recordings/90528',
    },
    {
      title: 'Lukulu Recordings on Traxsource',
      source: 'Traxsource',
      summary: 'Visit the confirmed Traxsource label page for available releases.',
      url: 'https://www.traxsource.com/label/53294/lukulu-recordings',
    },
  ],
  news: [
    {
      title: 'Updates on Instagram',
      source: 'Instagram',
      summary: 'Open Lukulu Recordings’ confirmed Instagram profile for current posts.',
      url: 'https://www.instagram.com/lukulurecordings/',
    },
    {
      title: 'Updates on Facebook',
      source: 'Facebook',
      summary: 'Open the confirmed Lukulu Recordings Facebook page for label updates.',
      url: 'https://www.facebook.com/Lukulu-Recordings-111653077359354',
    },
  ],
};

function safeExternalUrl(item: NewsItem) {
  const candidate = item.canonicalUrl || item.url;
  if (!candidate) return null;
  try {
    const url = new URL(candidate);
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.toString() : null;
  } catch {
    return null;
  }
}

function displayDate(value?: string) {
  if (!value) return 'Date not supplied';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' }).format(date);
}

export function NewsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryTab = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState<NewsTab>(queryTab === 'news' || queryTab === 'demo' ? queryTab : 'releases');
  const [items, setItems] = useState<NewsItem[]>([]);
  const [sourceStatus, setSourceStatus] = useState<unknown>();
  const [apiCuratedSources, setApiCuratedSources] = useState<NewsResponse['curatedSources']>([]);
  const [fetchState, setFetchState] = useState<'loading' | 'ready' | 'error'>('loading');
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const loadNews = async (signal?: AbortSignal) => {
    setFetchState('loading');
    try {
      const response = await fetch('/api/news', { signal, headers: { Accept: 'application/json' } });
      const data = (await response.json().catch(() => ({}))) as NewsResponse;
      if (!response.ok) throw new Error('News feed unavailable');
      const approved = Array.isArray(data.items)
        ? data.items.filter((item) => item && typeof item.title === 'string' && item.approved !== false)
        : [];
      setItems(approved);
      setSourceStatus(data.sourceStatus ?? data.status);
      setApiCuratedSources(Array.isArray(data.curatedSources) ? data.curatedSources : []);
      setFetchState('ready');
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') return;
      setItems([]);
      setFetchState('error');
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    void loadNews(controller.signal);
    return () => controller.abort();
  }, []);

  useEffect(() => {
    setActiveTab(queryTab === 'news' || queryTab === 'demo' ? queryTab : 'releases');
  }, [queryTab]);

  const selectTab = (tab: NewsTab) => {
    setActiveTab(tab);
    if (tab === 'releases') setSearchParams({}, { replace: true });
    else setSearchParams({ tab }, { replace: true });
  };

  const moveTabFocus = (event: KeyboardEvent, index: number) => {
    let nextIndex = index;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
    else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === 'Home') nextIndex = 0;
    else if (event.key === 'End') nextIndex = tabs.length - 1;
    else return;
    event.preventDefault();
    selectTab(tabs[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  };

  const visibleItems = items.filter((item) => {
    const type = `${item.sourceType ?? ''} ${item.type ?? ''} ${item.kind ?? ''}`.toLowerCase();
    const release = ['release', 'music', 'beatport', 'traxsource', 'catalogue'].some((token) => type.includes(token));
    return activeTab === 'releases' ? release : !release;
  });

  const hasSourceStatus = Boolean(sourceStatus && (typeof sourceStatus !== 'object' || Object.keys(sourceStatus as object).length));
  const googleDiscoveryUrl = apiCuratedSources?.find((source) => String(source.type).toLowerCase() === 'google' && typeof source.url === 'string')?.url;
  const sourceDirectory = [
    { name: 'Instagram', url: 'https://www.instagram.com/lukulurecordings/', kind: 'Confirmed social' },
    { name: 'Facebook', url: 'https://www.facebook.com/Lukulu-Recordings-111653077359354', kind: 'Confirmed social' },
    { name: 'Beatport', url: 'https://www.beatport.com/label/lukulu-recordings/90528', kind: 'Confirmed catalogue' },
    { name: 'Traxsource', url: 'https://www.traxsource.com/label/53294/lukulu-recordings', kind: 'Confirmed catalogue' },
    {
      name: 'Google discovery',
      url: typeof googleDiscoveryUrl === 'string'
        ? googleDiscoveryUrl
        : 'https://news.google.com/search?q=%22Lukulu%20Academy%20%26%20Recordings%22',
      kind: 'Moderated candidates only',
    },
  ];

  return (
    <>
      <DocumentTitle title="Label News" />
      <PageHero
        eyebrow="Label signal"
        title="Releases with a source"
        description="Approved label updates, confirmed catalogue links and a clear demo route. Discovery results are moderated before anything appears here."
        aside={(
          <div className="news-source-note">
            <span className="live-dot">MODERATED FEED</span>
            <strong>Sources first</strong>
            <p>Every published item needs a source, date and canonical destination.</p>
          </div>
        )}
      />

      <section className="news-page signal-section section-pad" aria-labelledby="news-tabs-heading">
        <div className="page-shell">
          <h2 id="news-tabs-heading" className="visually-hidden">Label news sections</h2>
          <div className="news-tabs" role="tablist" aria-label="Label content">
            {tabs.map((tab, index) => {
              const Icon = tab.icon;
              const selected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  ref={(element) => { tabRefs.current[index] = element; }}
                  type="button"
                  role="tab"
                  id={`news-tab-${tab.id}`}
                  aria-selected={selected}
                  aria-controls={`news-panel-${tab.id}`}
                  tabIndex={selected ? 0 : -1}
                  className={selected ? 'is-active' : undefined}
                  onClick={() => selectTab(tab.id)}
                  onKeyDown={(event) => moveTabFocus(event, index)}
                >
                  <Icon aria-hidden="true" />{tab.label}
                </button>
              );
            })}
          </div>

          <div id={`news-panel-${activeTab}`} role="tabpanel" aria-labelledby={`news-tab-${activeTab}`} tabIndex={0}>
            {activeTab === 'demo' ? (
              <div className="news-demo-layout">
                <aside>
                  <p className="console-label">DEMO INTAKE / LINK ONLY</p>
                  <h2>Let the music travel first</h2>
                  <p>Send a streamable or downloadable listening link. This page does not upload audio files and does not promise a release.</p>
                </aside>
                <EnquiryForm initialCategory="label" initialService="demo-submission" compact />
              </div>
            ) : (
              <div className="news-feed" aria-live="polite" aria-busy={fetchState === 'loading'}>
                <div className="news-feed__head">
                  <div>
                    <p className="console-label">{activeTab === 'releases' ? 'CATALOGUE MONITOR' : 'LABEL DESK'}</p>
                    <h2>{activeTab === 'releases' ? 'Release desk' : 'Approved updates'}</h2>
                  </div>
                  {fetchState === 'error' && (
                    <button type="button" className="button button-quiet" onClick={() => void loadNews()}>
                      <RefreshCwIcon aria-hidden="true" /> Retry feed
                    </button>
                  )}
                </div>

                {fetchState === 'loading' && (
                  <div className="news-loading" role="status">
                    <span className="spin-ring" aria-hidden="true" />
                    <strong>Checking approved sources…</strong>
                    <p>Only normalized, moderated items are displayed.</p>
                  </div>
                )}

                {fetchState !== 'loading' && (
                  <>
                    {fetchState === 'error' && (
                      <div className="status-panel status-panel--error news-status">
                        <AlertCircleIcon aria-hidden="true" />
                        <div><strong>Live feed unavailable</strong><p>Confirmed source links are still available below.</p></div>
                      </div>
                    )}

                    {visibleItems.length > 0 ? (
                      <div className="news-ledger">
                        {visibleItems.map((item, index) => {
                          const href = safeExternalUrl(item);
                          return (
                            <article key={item.id ?? `${item.title}-${index}`}>
                              <span className="news-ledger__number">{String(index + 1).padStart(2, '0')}</span>
                              <div>
                                <p className="console-label">{item.sourceName || item.source || 'Approved source'} / {displayDate(item.publishedAt || item.date)}</p>
                                <h3>{item.title}</h3>
                                <p>{item.summary || 'Open the canonical source for the full update.'}</p>
                              </div>
                              {href && <a href={href} target="_blank" rel="noreferrer">Open source <ExternalLinkIcon aria-hidden="true" /></a>}
                            </article>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="curated-feed">
                        <div className="curated-feed__label">
                          <span>CURATED FALLBACK</span>
                          <p>{fetchState === 'ready' ? 'No approved items are published in this channel yet.' : 'Live items could not be loaded.'}</p>
                        </div>
                        {curatedSources[activeTab].map((source, index) => (
                          <article key={source.url}>
                            <span>{String(index + 1).padStart(2, '0')}</span>
                            <div><p className="console-label">CONFIRMED / {source.source}</p><h3>{source.title}</h3><p>{source.summary}</p></div>
                            <a href={source.url} target="_blank" rel="noreferrer">Visit source <ArrowUpRightIcon aria-hidden="true" /></a>
                          </article>
                        ))}
                      </div>
                    )}

                    <p className="news-moderation-note">
                      Google discovery may help the team find candidates, but nothing is published automatically.
                      {hasSourceStatus && ' A source-sync status report was received with this feed.'}
                    </p>
                    <div className="source-directory" aria-label="Confirmed and discovery sources">
                      <p className="console-label">SOURCE DIRECTORY / ATTRIBUTED LINKS</p>
                      {sourceDirectory.map((source) => (
                        <a key={source.name} href={source.url} target="_blank" rel="noreferrer">
                          <span><strong>{source.name}</strong><small>{source.kind}</small></span>
                          <ArrowUpRightIcon aria-hidden="true" />
                        </a>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
