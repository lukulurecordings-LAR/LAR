import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRightIcon,
  BookOpenIcon,
  CircleHelpIcon,
  FileTextIcon,
  HeadphonesIcon,
  ImageIcon,
  LockKeyholeIcon,
  Mic2Icon,
  SendIcon,
  XIcon,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const routes = [
  {
    label: 'Learn production',
    note: 'Compare courses and Academy plans',
    to: '/#courses',
    icon: BookOpenIcon,
  },
  {
    label: 'Book the studio',
    note: 'Tell us the session and date you need',
    to: '/enquire?category=studio&service=recording',
    icon: Mic2Icon,
  },
  {
    label: 'Licence a beat',
    note: 'Compare Basic and Premium usage rights',
    to: '/#beats',
    icon: HeadphonesIcon,
  },
  {
    label: 'Order design',
    note: 'Choose artwork, video or social content',
    to: '/enquire?category=design&service=cover',
    icon: ImageIcon,
  },
  {
    label: 'Submit music',
    note: 'Send a listening link to the label team',
    to: '/enquire?category=label&service=demo-submission',
    icon: SendIcon,
  },
  {
    label: 'Request an invoice',
    note: 'Ask Accounts for a receipt or invoice',
    to: '/enquire?category=accounts&service=receipt-invoice',
    icon: FileTextIcon,
  },
  {
    label: 'Student & billing help',
    note: 'Sign in or manage an existing membership',
    to: '/student/billing',
    icon: LockKeyholeIcon,
  },
];

export function HelpAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstRouteRef = useRef<HTMLAnchorElement>(null);
  const location = useLocation();

  useEffect(() => setIsOpen(false), [location.pathname, location.search, location.hash]);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const frame = window.requestAnimationFrame(() => firstRouteRef.current?.focus());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setIsOpen(false);
        triggerRef.current?.focus();
        return;
      }

      if (event.key !== 'Tab') return;
      const focusable = Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="wayfinder-trigger"
        onClick={() => setIsOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <CircleHelpIcon aria-hidden="true" />
        <span>Help me choose</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="wayfinder-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                setIsOpen(false);
                triggerRef.current?.focus();
              }
            }}
          >
            <motion.div
              ref={dialogRef}
              className="wayfinder"
              role="dialog"
              aria-modal="true"
              aria-labelledby="wayfinder-title"
              initial={{ opacity: 0, y: 24, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.985 }}
              transition={{ duration: 0.2 }}
            >
              <div className="wayfinder__head">
                <div>
                  <p className="console-label">SIGNAL ROUTING / 01–07</p>
                  <h2 id="wayfinder-title">What do you need?</h2>
                  <p>Choose one goal. We will route you to the clearest next step.</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    triggerRef.current?.focus();
                  }}
                  aria-label="Close help assistant"
                >
                  <XIcon aria-hidden="true" />
                </button>
              </div>
              <div className="wayfinder__routes">
                {routes.map((route, index) => {
                  const Icon = route.icon;
                  return (
                    <Link
                      ref={index === 0 ? firstRouteRef : undefined}
                      key={route.label}
                      to={route.to}
                    >
                      <span className="wayfinder__number">{String(index + 1).padStart(2, '0')}</span>
                      <Icon aria-hidden="true" />
                      <span><strong>{route.label}</strong><small>{route.note}</small></span>
                      <ArrowRightIcon aria-hidden="true" />
                    </Link>
                  );
                })}
              </div>
              <p className="wayfinder__foot">No chatbot. No guesswork. One clear route.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
