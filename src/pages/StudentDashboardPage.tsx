import { useEffect, useState } from 'react';
import type { Session } from '@supabase/supabase-js';
import {
  AlertCircleIcon,
  ArrowRightIcon,
  BookOpenIcon,
  CheckCircle2Icon,
  CircleDollarSignIcon,
  Clock3Icon,
  ExternalLinkIcon,
  GraduationCapIcon,
  LoaderCircleIcon,
  LogOutIcon,
  MailIcon,
  ShieldCheckIcon,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { DocumentTitle } from '../components/DocumentTitle';
import { Footer } from '../components/Footer';
import { isSupabaseConfigured, supabase } from '../lib/supabase';

type StudentDashboardPageProps = { billingFocus?: boolean };

export function StudentDashboardPage({ billingFocus = false }: StudentDashboardPageProps) {
  const [session, setSession] = useState<Session | null>(null);
  const [authState, setAuthState] = useState<'loading' | 'ready'>('loading');
  const [billingState, setBillingState] = useState<'idle' | 'pending' | 'error'>('idle');

  useEffect(() => {
    if (!supabase) {
      setAuthState('ready');
      return;
    }
    let active = true;
    void supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setSession(data.session);
      setAuthState('ready');
    });
    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setAuthState('ready');
    });
    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, []);

  const openBillingPortal = async () => {
    if (!session || billingState === 'pending') return;
    setBillingState('pending');
    try {
      const response = await fetch('/api/billing-portal', {
        method: 'POST',
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      const data = (await response.json().catch(() => ({}))) as { url?: unknown };
      if (!response.ok || typeof data.url !== 'string') throw new Error('Billing portal unavailable');
      const portalUrl = new URL(data.url);
      if (portalUrl.protocol !== 'https:') throw new Error('Invalid billing portal URL');
      window.location.assign(portalUrl.toString());
    } catch {
      setBillingState('error');
    }
  };

  const signOut = async () => {
    await supabase?.auth.signOut();
    setSession(null);
  };

  return (
    <>
      <DocumentTitle title={billingFocus ? 'Student Billing' : 'Student Dashboard'} />
      <section className="student-page signal-section" aria-labelledby="student-dashboard-title">
        <div className="page-shell">
          <header className="student-page__head">
            <div>
              <p className="signal-label"><span>ST</span><span>Private student channel</span></p>
              <h1 id="student-dashboard-title">{billingFocus ? 'Student billing' : 'Student dashboard'}</h1>
              <p>A clear view of your account, Academy access and billing connection.</p>
            </div>
            {session && <button type="button" className="button button-quiet" onClick={() => void signOut()}><LogOutIcon aria-hidden="true" /> Sign out</button>}
          </header>

          {!isSupabaseConfigured ? (
            <div className="student-gate">
              <AlertCircleIcon aria-hidden="true" />
              <div><p className="console-label">AUTH SETUP REQUIRED</p><h2>Student access is not connected yet</h2><p>The public Supabase configuration is missing. No login or membership lookup has been attempted.</p><Link className="button button-primary" to="/enquire?category=academy&service=billing-help">Ask Academy support <ArrowRightIcon aria-hidden="true" /></Link></div>
            </div>
          ) : authState === 'loading' ? (
            <div className="student-loading" role="status"><LoaderCircleIcon className="spin" aria-hidden="true" /> Checking your secure session…</div>
          ) : !session ? (
            <div className="student-gate">
              <ShieldCheckIcon aria-hidden="true" />
              <div><p className="console-label">SIGN-IN REQUIRED</p><h2>Open your student channel</h2><p>Use the enrolled email address linked to your Academy account.</p><Link className="button button-primary" to="/student/login">Go to student login <ArrowRightIcon aria-hidden="true" /></Link></div>
            </div>
          ) : (
            <div className="student-console">
              <aside className="student-account">
                <div className="student-account__avatar"><GraduationCapIcon aria-hidden="true" /></div>
                <p className="console-label">SIGNED-IN ACCOUNT</p>
                <h2>{session.user.email ?? 'Student account'}</h2>
                <span><CheckCircle2Icon aria-hidden="true" /> Secure session active</span>
                <Link to="/enquire?category=academy&service=course-advice"><MailIcon aria-hidden="true" /> Contact student support</Link>
              </aside>

              <div className="student-modules">
                <article>
                  <div><CircleDollarSignIcon aria-hidden="true" /><p className="console-label">MEMBERSHIP STATUS</p></div>
                  <h2>Verification pending</h2>
                  <p>Webhook-backed membership records are not connected to this dashboard yet. This screen does not claim paid access.</p>
                  <button type="button" className="button button-primary" onClick={() => void openBillingPortal()} disabled={billingState === 'pending'}>
                    {billingState === 'pending' ? <LoaderCircleIcon className="spin" aria-hidden="true" /> : <ExternalLinkIcon aria-hidden="true" />}
                    {billingState === 'pending' ? 'Opening billing…' : 'Manage billing'}
                  </button>
                  {billingState === 'error' && <div className="status-panel status-panel--error"><AlertCircleIcon aria-hidden="true" /><div><strong>Billing portal unavailable</strong><p>Your customer link may still be pending. <Link to="/enquire?category=accounts&service=subscription-help">Ask Accounts for help</Link>.</p></div></div>}
                </article>

                <article>
                  <div><BookOpenIcon aria-hidden="true" /><p className="console-label">ENROLLED COURSES</p></div>
                  <h2>Not yet connected</h2>
                  <p>No lessons are shown until an enrolled-course record is available for this account.</p>
                  <Link className="section-link" to="/#courses">Browse the public curriculum <ArrowRightIcon aria-hidden="true" /></Link>
                </article>

                <article className="student-modules__note">
                  <Clock3Icon aria-hidden="true" />
                  <div><strong>Access looks wrong?</strong><p>Send your enrolled email and payment reference through the secure enquiry route. Never send card details.</p></div>
                  <Link to="/enquire?category=academy&service=billing-help">Get help <ArrowRightIcon aria-hidden="true" /></Link>
                </article>
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
