import { ArrowLeftIcon, RouteIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DocumentTitle } from '../components/DocumentTitle';
import { Footer } from '../components/Footer';

export function NotFoundPage() {
  return (
    <>
      <DocumentTitle title="Page Not Found" />
      <section className="not-found signal-section">
        <div className="page-shell">
          <RouteIcon aria-hidden="true" />
          <p className="console-label">SIGNAL NOT FOUND / 404</p>
          <h1>This route is quiet</h1>
          <p>The page may have moved. Return to the main studio signal.</p>
          <Link className="button button-primary" to="/"><ArrowLeftIcon aria-hidden="true" /> Back to Lukulu</Link>
        </div>
      </section>
      <Footer />
    </>
  );
}
