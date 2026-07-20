-- Review locally before applying. This migration was not run against a live project.
create extension if not exists pgcrypto with schema extensions;

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  reference_id text not null unique,
  name text not null check (char_length(name) between 2 and 100),
  email text not null check (char_length(email) between 5 and 254),
  phone text check (phone is null or char_length(phone) <= 40),
  category text not null check (category in ('academy', 'studio', 'beats', 'design', 'label', 'accounts')),
  service text not null,
  message text not null check (char_length(message) between 20 and 3000),
  reference_url text check (reference_url is null or char_length(reference_url) <= 1000),
  preferred_date date,
  status text not null default 'new' check (status in ('new', 'in_review', 'replied', 'closed', 'spam')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.student_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text check (display_name is null or char_length(display_name) <= 100),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.stripe_customers (
  user_id uuid primary key references public.student_profiles(id) on delete cascade,
  stripe_customer_id text not null unique check (stripe_customer_id ~ '^cus_[A-Za-z0-9]+$'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.student_profiles(id) on delete set null,
  item_id text not null check (char_length(item_id) between 3 and 100),
  category text not null check (category in ('membership', 'studio', 'beat', 'design')),
  checkout_mode text not null check (checkout_mode in ('payment', 'subscription')),
  status text not null default 'pending' check (status in (
    'pending', 'checkout_created', 'checkout_completed', 'paid', 'payment_failed',
    'expired', 'checkout_failed', 'refund_pending', 'refunded', 'disputed', 'cancelled'
  )),
  client_request_hash text not null unique check (char_length(client_request_hash) = 64),
  request_context jsonb not null default '{}'::jsonb check (jsonb_typeof(request_context) = 'object'),
  stripe_checkout_session_id text unique,
  stripe_checkout_url text,
  stripe_customer_id text,
  stripe_payment_intent_id text,
  stripe_subscription_id text,
  stripe_refund_id text,
  stripe_dispute_id text,
  amount_total bigint check (amount_total is null or amount_total >= 0),
  currency text check (currency is null or currency ~ '^[a-z]{3}$'),
  paid_at timestamptz,
  stripe_event_created_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists orders_user_created_idx on public.orders(user_id, created_at desc);
create index if not exists orders_subscription_idx on public.orders(stripe_subscription_id) where stripe_subscription_id is not null;

create table if not exists public.memberships (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.student_profiles(id) on delete cascade,
  item_id text not null check (item_id in ('plan_basic', 'plan_pro', 'plan_vip')),
  stripe_subscription_id text not null unique,
  stripe_customer_id text not null,
  latest_stripe_invoice_id text,
  status text not null check (status in (
    'incomplete', 'incomplete_expired', 'trialing', 'active', 'past_due',
    'canceled', 'unpaid', 'paused'
  )),
  cancel_at_period_end boolean not null default false,
  current_period_start timestamptz,
  current_period_end timestamptz,
  stripe_event_created_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists memberships_user_idx on public.memberships(user_id);

create table if not exists public.entitlements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.student_profiles(id) on delete cascade,
  entitlement_key text not null check (char_length(entitlement_key) between 3 and 100),
  source_membership_id uuid references public.memberships(id) on delete set null,
  status text not null check (status in ('active', 'grace', 'suspended', 'expired')),
  access_starts_at timestamptz,
  access_ends_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, entitlement_key)
);

create table if not exists public.invoices (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.student_profiles(id) on delete cascade,
  stripe_invoice_id text not null unique,
  stripe_customer_id text not null,
  stripe_subscription_id text,
  status text not null,
  amount_due bigint not null default 0 check (amount_due >= 0),
  amount_paid bigint not null default 0 check (amount_paid >= 0),
  amount_remaining bigint not null default 0 check (amount_remaining >= 0),
  currency text not null check (currency ~ '^[a-z]{3}$'),
  hosted_invoice_url text,
  invoice_pdf text,
  due_at timestamptz,
  paid_at timestamptz,
  period_start timestamptz,
  period_end timestamptz,
  stripe_event_created_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists invoices_user_idx on public.invoices(user_id, created_at desc);

create table if not exists public.stripe_events (
  event_id text primary key,
  event_type text not null,
  livemode boolean not null,
  api_version text,
  stripe_created_at timestamptz,
  processing_status text not null check (processing_status in ('processing', 'processed', 'ignored', 'failed')),
  attempt_count integer not null default 1 check (attempt_count > 0),
  last_error_code text check (last_error_code is null or char_length(last_error_code) <= 80),
  processed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.label_news_items (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 3 and 180),
  summary text not null check (char_length(summary) between 10 and 500),
  url text not null check (char_length(url) <= 1000),
  source_name text not null check (char_length(source_name) between 2 and 100),
  source_type text not null check (source_type in ('instagram', 'facebook', 'youtube', 'tiktok', 'google', 'website', 'press', 'store')),
  content_type text not null default 'news' check (content_type in ('news', 'release', 'music')),
  image_url text check (image_url is null or char_length(image_url) <= 1000),
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  published_at timestamptz,
  approved_at timestamptz,
  approved_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (status <> 'published' or (approved_at is not null and published_at is not null))
);
create index if not exists label_news_published_idx
  on public.label_news_items(published_at desc)
  where status = 'published' and approved_at is not null;

alter table public.enquiries enable row level security;
alter table public.student_profiles enable row level security;
alter table public.stripe_customers enable row level security;
alter table public.orders enable row level security;
alter table public.memberships enable row level security;
alter table public.entitlements enable row level security;
alter table public.invoices enable row level security;
alter table public.stripe_events enable row level security;
alter table public.label_news_items enable row level security;

revoke all on table public.enquiries, public.student_profiles, public.stripe_customers,
  public.orders, public.memberships, public.entitlements, public.invoices,
  public.stripe_events, public.label_news_items from anon, authenticated;

grant select, insert, update, delete on table public.enquiries, public.student_profiles,
  public.stripe_customers, public.orders, public.memberships, public.entitlements,
  public.invoices, public.stripe_events, public.label_news_items to service_role;

grant select, insert, update on table public.student_profiles to authenticated;
grant select on table public.stripe_customers, public.orders, public.memberships,
  public.entitlements, public.invoices to authenticated;
grant select on table public.label_news_items to anon, authenticated;

create policy "students read own profile"
  on public.student_profiles for select to authenticated
  using ((select auth.uid()) = id);
create policy "students create own profile"
  on public.student_profiles for insert to authenticated
  with check ((select auth.uid()) = id);
create policy "students update own profile"
  on public.student_profiles for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

create policy "students read own stripe mapping"
  on public.stripe_customers for select to authenticated
  using ((select auth.uid()) = user_id);
create policy "students read own orders"
  on public.orders for select to authenticated
  using ((select auth.uid()) = user_id);
create policy "students read own memberships"
  on public.memberships for select to authenticated
  using ((select auth.uid()) = user_id);
create policy "students read own entitlements"
  on public.entitlements for select to authenticated
  using ((select auth.uid()) = user_id);
create policy "students read own invoices"
  on public.invoices for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "public reads approved published news"
  on public.label_news_items for select to anon, authenticated
  using (
    status = 'published'
    and approved_at is not null
    and published_at is not null
    and published_at <= now()
  );

comment on table public.stripe_events is
  'Idempotency ledger only; raw Stripe payloads and customer PII are intentionally not stored.';
