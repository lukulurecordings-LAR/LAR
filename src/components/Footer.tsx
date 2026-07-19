import { LockKeyholeIcon, MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-shell">
        <div className="footer-lead">
          <a href="#home" className="brand-lockup">
            <img src="/Lukulu_Logo.png" alt="Lukulu Academy & Recordings" />
            <span><strong>LUKULU</strong><small>Academy & Recordings</small></span>
          </a>
          <p>Learn music. Create music. Release music. Your music career starts here in South Africa.</p>
        </div>

        <div className="footer-nav">
          <div>
            <h2>Explore</h2>
            <a href="#courses">Academy courses</a>
            <a href="#pricing">Membership plans</a>
            <a href="#studio">Studio booking</a>
            <a href="#beats">Beat licences</a>
          </div>
          <div>
            <h2>Make contact</h2>
            <a href="mailto:lukulurecordings@gmail.com"><MailIcon aria-hidden="true" /> lukulurecordings@gmail.com</a>
            <a href="tel:+27730933554"><PhoneIcon aria-hidden="true" /> +27 73 093 3554</a>
            <span><MapPinIcon aria-hidden="true" /> South Africa</span>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Lukulu Academy & Recordings. All rights reserved.</p>
          <p><LockKeyholeIcon aria-hidden="true" /> Payments are secured by Stripe’s hosted checkout.</p>
        </div>
      </div>
    </footer>
  );
}
