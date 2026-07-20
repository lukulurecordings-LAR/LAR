import { Clock3Icon, MailIcon, RouteIcon } from 'lucide-react';
import { DocumentTitle } from '../components/DocumentTitle';
import { EnquiryForm } from '../components/EnquiryForm';
import { Footer } from '../components/Footer';
import { PageHero } from '../components/PageHero';

export function EnquiryPage() {
  return (
    <>
      <DocumentTitle title="Enquire" />
      <PageHero
        eyebrow="Enquiry desk"
        title="One form. The right room."
        description="Choose a service and your message is routed with the context our Academy, studio, label, creative or accounts team needs."
        aside={(
          <div className="page-hero__route-note">
            <RouteIcon aria-hidden="true" />
            <p className="console-label">ROUTING ASSIST</p>
            <strong>Category → service → team</strong>
            <span>No vague contact box. Choose the exact signal path.</span>
          </div>
        )}
      />
      <section className="enquiry-page signal-section section-pad" aria-label="Enquiry form and contact details">
        <div className="page-shell enquiry-page__layout">
          <aside className="brand-panel">
            <picture>
              <source srcSet="/lar-brand-mark.webp" type="image/webp" />
              <img src="/lar-brand-mark.png" alt="Lukulu Academy & Recordings" width="768" height="768" />
            </picture>
            <div>
              <p className="console-label">LAR / SOUTH AFRICA</p>
              <h2>Ready when you are</h2>
              <p>Send enough detail for a useful first response. Links are welcome; files are not uploaded through this form.</p>
              <ul>
                <li><Clock3Icon aria-hidden="true" /> Response timing depends on the service and project scope.</li>
                <li><MailIcon aria-hidden="true" /> If online storage is unavailable, the form prepares an email instead.</li>
              </ul>
            </div>
          </aside>
          <EnquiryForm />
        </div>
      </section>
      <Footer />
    </>
  );
}
