create extension if not exists pgcrypto;

create table if not exists public.user_entitlements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product text not null,
  status text not null check (status in ('active', 'expired', 'cancelled', 'refunded')),
  payment_provider text,
  payment_reference text,
  expires_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists user_entitlements_lookup_idx
  on public.user_entitlements (user_id, product, status);

create unique index if not exists user_entitlements_payment_reference_idx
  on public.user_entitlements (payment_provider, payment_reference)
  where payment_reference is not null;

create table if not exists public.tarot_readings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  reading_type text not null,
  question text,
  cards jsonb not null,
  result jsonb not null,
  model text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.daily_fortune_readings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  reading_date date not null,
  profile jsonb not null,
  calendar_context jsonb,
  result jsonb not null,
  model text not null,
  created_at timestamptz not null default now()
);

create index if not exists tarot_readings_user_created_idx
  on public.tarot_readings (user_id, created_at desc);

create index if not exists daily_fortune_readings_user_date_idx
  on public.daily_fortune_readings (user_id, reading_date desc);

alter table public.user_entitlements enable row level security;
alter table public.tarot_readings enable row level security;
alter table public.daily_fortune_readings enable row level security;

drop policy if exists "Users can read own entitlements" on public.user_entitlements;
create policy "Users can read own entitlements"
  on public.user_entitlements
  for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can read own tarot readings" on public.tarot_readings;
create policy "Users can read own tarot readings"
  on public.tarot_readings
  for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can read own daily fortunes" on public.daily_fortune_readings;
create policy "Users can read own daily fortunes"
  on public.daily_fortune_readings
  for select
  to authenticated
  using (auth.uid() = user_id);

-- 결제 성공 웹훅은 SUPABASE_SECRET_KEY를 사용하는 백엔드에서만
-- user_entitlements를 생성/갱신해야 합니다. 브라우저에는 쓰기 정책을 제공하지 않습니다.
-- 개발 중 유료 권한 예시:
-- insert into public.user_entitlements (user_id, product, status)
-- values ('AUTH_USER_UUID', 'tarot', 'active');
-- values ('AUTH_USER_UUID', 'daily-fortune', 'active');
