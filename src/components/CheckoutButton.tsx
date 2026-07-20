import { useState, type ReactNode } from 'react';
import { AlertCircleIcon, LoaderCircleIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

type CheckoutContext = Record<string, string>;

type CheckoutButtonProps = {
  itemId: string;
  context?: CheckoutContext;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
  onBeforeCheckout?: () => boolean;
};

type CheckoutResponse = {
  url?: string;
  error?: string;
  message?: string;
  code?: string;
};

export function CheckoutButton({
  itemId,
  context,
  children,
  className = 'button button-primary',
  disabled = false,
  ariaLabel,
  onBeforeCheckout,
}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [needsContact, setNeedsContact] = useState(false);
  const [needsSignIn, setNeedsSignIn] = useState(false);

  const beginCheckout = async () => {
    if (loading || disabled) return;
    if (onBeforeCheckout && !onBeforeCheckout()) return;

    setLoading(true);
    setError('');
    setNeedsContact(false);
    setNeedsSignIn(false);

    try {
      const idempotencyKey = window.crypto.randomUUID();
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Idempotency-Key': idempotencyKey,
      };
      const membershipCheckout = itemId.startsWith('plan_');
      const { data: sessionData } = supabase
        ? await supabase.auth.getSession()
        : { data: { session: null } };
      const accessToken = sessionData.session?.access_token;

      if (accessToken) headers.Authorization = `Bearer ${accessToken}`;
      if (membershipCheckout && !accessToken) {
        setNeedsSignIn(true);
        throw new Error('Student sign-in is required before starting a membership checkout.');
      }

      const body = context ? { itemId, context } : { itemId };
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      });
      const data = (await response.json().catch(() => ({}))) as CheckoutResponse;

      if (!response.ok) {
        const rawMessage = data.error || data.message || '';
        if (data.code === 'AUTH_REQUIRED' || data.code === 'INVALID_SESSION') {
          setNeedsSignIn(true);
          throw new Error('Student sign-in is required before starting a membership checkout.');
        }
        const stripeUnavailable =
          data.code === 'STRIPE_NOT_CONFIGURED' ||
          /not configured|configuration|stripe unavailable/i.test(rawMessage);
        if (stripeUnavailable) {
          setNeedsContact(true);
          throw new Error('Online checkout is not available yet. Contact us and we will help you place the order.');
        }
        throw new Error(rawMessage || 'Checkout could not start. Please try again.');
      }

      if (!data.url) {
        throw new Error('Checkout could not start. Please try again.');
      }

      window.location.assign(data.url);
    } catch (checkoutError) {
      setError(
        checkoutError instanceof Error
          ? checkoutError.message
          : 'Checkout could not start. Please try again.',
      );
      setLoading(false);
    }
  };

  return (
    <div className="checkout-action">
      <button
        type="button"
        className={className}
        onClick={beginCheckout}
        disabled={disabled || loading}
        aria-label={ariaLabel}
        aria-describedby={error ? `${itemId}-checkout-error` : undefined}
      >
        {loading && <LoaderCircleIcon className="spin" aria-hidden="true" />}
        <span>{loading ? 'Opening secure checkout…' : children}</span>
      </button>
      <div
        id={`${itemId}-checkout-error`}
        className="checkout-error"
        aria-live="polite"
        role={error ? 'status' : undefined}
      >
        {error && (
          <>
            <AlertCircleIcon aria-hidden="true" />
            <span>
              {error}{' '}
              {needsContact && (
                <a href="mailto:lukulurecordings@gmail.com?subject=Lukulu%20order%20help">
                  Email Lukulu
                </a>
              )}
              {needsSignIn && (
                <Link to="/student/login">Sign in to continue</Link>
              )}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
