# Lukulu Stripe integration plan

Generated for `https://lar-main.vercel.app` using Stripe's official implementation guidance after the Stripe MCP planner remained unavailable pending OAuth.

## Security first

- Rotate the test secret that was pasted into chat and review its Workbench request logs.
- Do not use or deploy that value. Store fresh test credentials only in Vercel's encrypted environment settings.
- Prefer separate least-privilege restricted API keys for Checkout and Invoicing instead of one broad secret key.
- Keep the publishable key client-side only if a future embedded Stripe UI needs it. Hosted Checkout does not need it.

## Target architecture

```text
Browser
  |-- Supabase Auth -> student identity
  |-- POST /api/checkout -> Stripe-hosted Checkout
  |-- POST /api/billing-portal -> Stripe Customer Portal
  `-- authenticated student pages -> Supabase RLS data

Stripe webhooks
  `-- POST /api/stripe-webhook
      |-- verify the signature against the raw body
      |-- deduplicate by Stripe event ID
      |-- update orders, subscriptions and invoices
      `-- grant or revoke student access
```

Stripe owns payment collection, recurring billing, retries, payment-method selection and hosted invoice payment. Supabase owns users, enquiries, orders, memberships and application access.

## Delivery phases

### 1. Identity and data foundation

- Use Supabase email OTP for student login.
- Require login before Basic, Pro or VIP subscription Checkout.
- Allow guest Checkout for one-time studio, design and beat purchases where appropriate.
- Store one Stripe Customer ID against each student profile; never map access by email alone.
- Protect student data with row-level security and keep staff roles in trusted database state.

Core tables: `student_profiles`, `stripe_customers`, `orders`, `memberships`, `entitlements`, `invoices`, `stripe_events`, `enquiries` and `label_news_items`.

### 2. Stable Products and Prices

- Replace inline `price_data` with persistent sandbox Products and Prices.
- Model Basic, Pro and VIP as separate Products with monthly ZAR Prices.
- Use clear Products for each one-time studio, design and beat/licence service.
- Keep the existing internal catalog codes and map them server-side to `price_*` environment variables or Stripe lookup keys.
- Create a new Price when an amount changes; archive old Prices instead of rewriting history.

### 3. Payments and Checkout

- Retain Stripe-hosted Checkout and dynamic payment methods.
- Create a pending internal order before creating a Checkout Session.
- Resolve catalog codes and prices only on the server.
- Reuse the signed-in student's Stripe Customer.
- Put internal IDs, not personal data, in Stripe metadata.
- Use idempotency keys and category-specific return routes.
- Never fulfil an order or grant access from the browser success URL.

### 4. Billing and student access

- Use subscription Checkout for Academy plans.
- Grant or extend access only after verified `invoice.paid` state.
- Synchronize upgrades, downgrades, cancellations and failed payments from webhooks.
- Add an authenticated Customer Portal route that derives the Stripe Customer ID server-side.
- Initially enable payment-method updates, invoice history and cancellation. Add self-service switching only after proration and downgrade rules are approved.

### 5. Invoicing

Use one-time Checkout for fixed prices. Use Stripe Invoicing for custom studio packages, label campaigns, B2B payment terms, deposits and approved balances.

The initial workflow remains staff-controlled in Stripe Dashboard: create or select a customer, add approved line items, review a draft, finalize it, then send the Hosted Invoice Page. Do not expose anonymous invoice creation or arbitrary amounts.

## Required webhook coverage

- Checkout: completion, asynchronous success/failure and expiration.
- Billing: subscription created/updated/deleted/paused/resumed and invoice paid/failed/action-required/finalization-failed.
- Invoicing and operations: invoice finalized/sent/voided/uncollectible, refunds and disputes.

Every event must pass signature verification, be inserted once by event ID and tolerate retries or out-of-order delivery.

## Tax boundary

Do not enable automatic tax until Lukulu's South African VAT and cross-border registrations are confirmed. Enabling Stripe Tax without an active registration can result in zero tax being collected while the integration appears enabled.

## Go-live gates

- Exposed key rotated and request logs reviewed.
- Fresh test and live restricted keys stored only in Vercel.
- Stable Products and Prices reviewed in sandbox and live mode.
- Webhook signing secret configured and replay/idempotency tests pass.
- Supabase RLS and staff authorization reviewed.
- Customer Portal and invoice settings tested in sandbox.
- Refund, cancellation, failed-payment, privacy and invoice terms published.
- Stripe account verification, branding, receipts, statement descriptor and payout account complete.
- Desktop/mobile Checkout, portal, invoice and student access verified end to end.

## Non-goals

- No Stripe Connect marketplace or artist payout splitting.
- No custom card form or raw card handling.
- No manual subscription renewal loop.
- No automatic tax without confirmed registrations.
- No access provisioning from a success redirect.
- No public invoice creation endpoint.
- No live charges during implementation verification.
