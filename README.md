# Lukulu Academy & Recordings

The public website and commerce front door for Lukulu Academy & Recordings: music-production courses, studio bookings, beat licences, design services, and demo submissions.

## Live deployments

- **Full Academy platform:** [lar-main-self.vercel.app](https://lar-main-self.vercel.app)
- **ChatGPT Sites edition:** [lukulu-academy.phushiplan.chatgpt.site](https://lukulu-academy.phushiplan.chatgpt.site)

The root Vite/Vercel application remains the full platform with student access,
payments, enquiries, news and backend routes. The source for the ChatGPT Sites
edition is preserved separately under `sites/lukulu-academy/` so both versions
can evolve without one overwriting the other.

## Local development

```bash
npm install
npm run dev
```

Use `npx vercel dev` when testing the Vercel API routes and Stripe Checkout locally.

Run the full quality gate before deployment:

```bash
npm run check
npm audit
```

## Stripe Checkout

Checkout sessions are created only by `api/checkout.ts`. Product names and ZAR prices are resolved from the server-side catalogue in `api/_lib/catalog.ts`; the browser never supplies a trusted price.

Create `.env.local` from `.env.example` and set:

```dotenv
STRIPE_SECRET_KEY=your_test_key_here
PUBLIC_SITE_URL=http://localhost:3000
```

Add the same secret as a protected Vercel environment variable for deployed checkouts. Never expose it through a `VITE_` variable or commit it to Git.

Payments currently use Stripe-hosted Checkout with manual order fulfilment. Exclusive beat licences remain enquiry-only so one-off rights are not sold twice.
