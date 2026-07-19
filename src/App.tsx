import { CheckoutNotice } from './components/CheckoutNotice';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';

export function App() {
  return (
    <div className="min-h-screen bg-bg text-white font-body">
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <Navbar />
      <CheckoutNotice />
      <main id="main-content">
        <HomePage />
      </main>
    </div>
  );
}
