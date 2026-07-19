import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MenuIcon, XIcon } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Courses', href: '#courses' },
  { label: 'Plans', href: '#pricing' },
  { label: 'Studio', href: '#studio' },
  { label: 'Beats', href: '#beats' },
  { label: 'Design', href: '#design' },
  { label: 'Label', href: '#label' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const sections = NAV_LINKS.map(({ href }) => document.querySelector(href)).filter(
      (section): section is Element => Boolean(section),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: '-20% 0px -68% 0px', threshold: [0, 0.15, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusFrame = window.requestAnimationFrame(() => firstMobileLinkRef.current?.focus());
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setIsOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key === 'Tab') {
        const focusableElements = Array.from(
          mobileNavRef.current?.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ) ?? [],
        ).filter((element) => !element.hasAttribute('disabled'));

        if (focusableElements.length === 0) return;
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        const activeElement = document.activeElement;

        if (
          event.shiftKey &&
          (activeElement === firstElement || !mobileNavRef.current?.contains(activeElement))
        ) {
          event.preventDefault();
          lastElement.focus();
        } else if (
          !event.shiftKey &&
          (activeElement === lastElement || !mobileNavRef.current?.contains(activeElement))
        ) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="site-nav" aria-label="Primary navigation">
      <div className="nav-inner">
        <a href="#home" className="brand-lockup" onClick={closeMenu}>
          <img src="/Lukulu_Logo.png" alt="Lukulu Academy & Recordings" />
          <span>
            <strong>LUKULU</strong>
            <small>Academy & Recordings</small>
          </span>
        </a>

        <div className="desktop-nav" aria-label="Page sections">
          {NAV_LINKS.map((link) => {
            const isCurrent = activeSection === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                className={isCurrent ? 'is-current' : undefined}
                aria-current={isCurrent ? 'location' : undefined}
              >
                {link.label}
              </a>
            );
          })}
          <a className="nav-cta" href="#label">
            Submit demo
          </a>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          className="menu-toggle"
          onClick={() => setIsOpen((open) => !open)}
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
        >
          {isOpen ? <XIcon aria-hidden="true" /> : <MenuIcon aria-hidden="true" />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={mobileNavRef}
            id="mobile-navigation"
            className="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18 }}
          >
            <div className="mobile-nav__signal" aria-hidden="true">
              <span>MENU / SIGNAL PATH</span>
              <i />
            </div>
            {NAV_LINKS.map((link, index) => {
              const isCurrent = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  ref={index === 0 ? firstMobileLinkRef : undefined}
                  href={link.href}
                  onClick={closeMenu}
                  className={isCurrent ? 'is-current' : undefined}
                  aria-current={isCurrent ? 'location' : undefined}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {link.label}
                </a>
              );
            })}
            <a className="button button-primary" href="#label" onClick={closeMenu}>
              Submit your demo
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
