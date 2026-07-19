import { useEffect, useState } from 'react';
import { CheckCircle2Icon, InfoIcon, XIcon } from 'lucide-react';

type CheckoutState = 'success' | 'cancelled' | null;

export function CheckoutNotice() {
  const [checkoutState, setCheckoutState] = useState<CheckoutState>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const state = params.get('checkout');
    if (state === 'success' || state === 'cancelled') setCheckoutState(state);
  }, []);

  const dismiss = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('checkout');
    url.searchParams.delete('item');
    window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
    setCheckoutState(null);
  };

  if (!checkoutState) return null;

  const success = checkoutState === 'success';
  return (
    <aside
      className={`checkout-notice ${success ? 'checkout-notice--success' : ''}`}
      aria-live="polite"
      aria-label="Checkout update"
    >
      {success ? (
        <CheckCircle2Icon aria-hidden="true" />
      ) : (
        <InfoIcon aria-hidden="true" />
      )}
      <p>
        <strong>{success ? 'You returned from Stripe.' : 'Checkout was cancelled.'}</strong>
        <span>
          {success
            ? ' Payment status will be confirmed separately; your order is not yet marked as fulfilled.'
            : ' Nothing was charged. You can return to any item whenever you are ready.'}
        </span>
      </p>
      <button type="button" onClick={dismiss} aria-label="Dismiss checkout update">
        <XIcon aria-hidden="true" />
      </button>
    </aside>
  );
}
