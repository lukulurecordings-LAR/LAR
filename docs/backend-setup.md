# LAR backend setup and review notes

This foundation is intentionally inert until fresh credentials, persistent Stripe Prices, and the reviewed database migration are configured. The secret pasted into chat was not used, stored, or tested.

## Setup order

1. Rotate the exposed Stripe test key and review its Workbench request logs.
2. Review `supabase/migrations/20260720020000_lar_commerce_foundation.sql`, then apply it through the normal Supabase migration workflow. It has not been applied to a live project.
3. Configure the environment names from `.env.example` in separate Preview and Production environments. Prefer a Supabase `sb_secret_` key and a least-privilege Stripe restricted key.
4. Create persistent Stripe Products and Prices, then map every internal catalog code to its `STRIPE_PRICE_*` variable. Never substitute browser-supplied amounts or inline `price_data`.
5. Create a Stripe webhook destination for `https://lar-main.vercel.app/api/stripe-webhook`, select the events below, and store its signing secret as `STRIPE_WEBHOOK_SECRET`.
6. Configure the Customer Portal in Stripe, then exercise Checkout, renewal, failed-payment, cancellation and portal flows in a sandbox before enabling live keys.

`GET /api/health` reports only non-sensitive setup state and the configured Price count. It never returns keys, database URLs, Price IDs, or webhook secrets.

## Implemented event handling

- Checkout completion, asynchronous success/failure and expiration update the internal order.
- Subscription lifecycle events upsert the mapped student's membership. A subscription event alone does not grant access.
- `invoice.paid` upserts the invoice and grants or extends the mapped entitlement.
- Invoice payment failure/action-required moves the membership to `past_due` and entitlement to `grace`.
- Finalized, sent, voided, uncollectible and finalization-failed invoices are synchronized for student billing history.
- Refund creation/update and dispute creation flag the related internal order for staff review.
- Every verified event is claimed in `stripe_events` by event ID. Retried operations are upserts or deterministic updates.

The webhook uses Vercel's Web `Request.text()` raw-body pattern and Stripe's official signature verifier. Raw payloads and customer PII are not stored in the event ledger.

## Deliberately deferred

- Refund completion and dispute closure do not automatically revoke or restore fulfilment or academy access until staff approve those business rules.
- One-time service fulfilment remains a staff workflow after a verified paid order.
- Custom invoices remain staff-created in Stripe Dashboard; no public arbitrary-amount invoice endpoint exists.
- Entitlement grace duration, plan switching/proration and downgrade timing require business policy approval.
- Production rate limiting should be configured at Vercel's edge for the public enquiry endpoint; the endpoint already has strict validation, a size limit and a honeypot.
- Stripe Tax remains disabled until appropriate tax registrations are confirmed.

## Endpoint contracts

- `POST /api/enquiries`: accepts the exact category/service IDs used by the UI, persists first, and returns a reference only after a successful insert.
- `GET /api/news`: returns approved, published normalized items only. When storage is unavailable or empty, it reports the true state and provides curated links; it never scrapes or republishes search/social content.
- `POST /api/checkout`: requires persistent Price mapping and order storage. Memberships require a verified Supabase bearer token; one-time purchases may be guests.
- `POST /api/billing-portal`: requires a verified student token and derives the Stripe Customer from the server-side mapping.
- `POST /api/stripe-webhook`: requires a valid raw-body Stripe signature and configured database ledger.

Supabase Auth authorization is based only on the verified user ID. User-editable metadata is not used for roles or access decisions. All public tables have RLS enabled and explicit grants; there are no public `SECURITY DEFINER` helpers.
