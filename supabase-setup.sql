-- ============================================================
-- BOOKED BY BOYLE — SUPABASE DATABASE SETUP
-- Run this in your Supabase SQL Editor (supabase.com → SQL Editor)
-- ============================================================

-- USERS / PROFILES
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  full_name text,
  role text check (role in ('contractor', 'residential', 'commercial', 'admin')),
  phone text,
  company text,
  created_at timestamp default now()
);

-- CONTRACTORS
create table public.contractors (
  id uuid references public.profiles(id) on delete cascade primary key,
  business_name text,
  trade text,
  service_area text,
  license_number text,
  license_expiry date,
  insurance_provider text,
  insurance_expiry date,
  years_in_business text,
  market text,
  website text,
  google_business text,
  referral_code text unique,
  credit_balance numeric default 100,
  verified boolean default false,
  approved boolean default false,
  created_at timestamp default now()
);

-- JOB POSTINGS (the board)
create table public.jobs (
  id uuid default gen_random_uuid() primary key,
  posted_by uuid references public.profiles(id),
  trade text,
  town text,
  hamlet text,
  description text,
  time_slots text,
  num_quotes integer,
  property_type text check (property_type in ('residential', 'commercial')),
  photo_urls text[],
  appointment_fee numeric,
  backend_pct numeric,
  status text default 'open' check (status in ('open', 'pending_approval', 'filled', 'cancelled')),
  awarded_to uuid references public.contractors(id),
  created_at timestamp default now()
);

-- CONTRACTOR JOB APPLICATIONS
create table public.job_applications (
  id uuid default gen_random_uuid() primary key,
  job_id uuid references public.jobs(id) on delete cascade,
  contractor_id uuid references public.contractors(id) on delete cascade,
  applied_at timestamp default now(),
  status text default 'pending' check (status in ('pending', 'approved', 'rejected')),
  unique(job_id, contractor_id)
);

-- REFERRAL TRACKING
create table public.referrals (
  id uuid default gen_random_uuid() primary key,
  referral_code text,
  contractor_id uuid references public.contractors(id),
  referred_user_id uuid references public.profiles(id),
  job_id uuid references public.jobs(id),
  credit_amount numeric,
  status text default 'pending' check (status in ('pending', 'earned', 'redeemed')),
  created_at timestamp default now()
);

-- CREDIT TRANSACTIONS
create table public.credit_transactions (
  id uuid default gen_random_uuid() primary key,
  contractor_id uuid references public.contractors(id),
  amount numeric,
  type text check (type in ('earned', 'redeemed')),
  description text,
  job_id uuid references public.jobs(id),
  created_at timestamp default now()
);

-- PROPERTY OWNER REQUESTS (saved from forms)
create table public.owner_requests (
  id uuid default gen_random_uuid() primary key,
  owner_id uuid references public.profiles(id),
  trade text,
  description text,
  availability text,
  num_quotes integer,
  contact_sharing text,
  referral_code_used text,
  property_type text,
  address_full text, -- kept private, never shown on board
  town text,
  hamlet text,
  photo_urls text[],
  status text default 'submitted' check (status in ('submitted', 'posted', 'scheduled', 'completed')),
  created_at timestamp default now()
);

-- ROW LEVEL SECURITY
alter table public.profiles enable row level security;
alter table public.contractors enable row level security;
alter table public.jobs enable row level security;
alter table public.job_applications enable row level security;
alter table public.referrals enable row level security;
alter table public.credit_transactions enable row level security;
alter table public.owner_requests enable row level security;

-- Profiles: users can read/update own profile
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

-- Contractors can view their own contractor record
create policy "Contractors view own record" on public.contractors for select using (auth.uid() = id);
create policy "Contractors update own record" on public.contractors for update using (auth.uid() = id);

-- Jobs: approved contractors can view open jobs
create policy "Approved contractors view jobs" on public.jobs for select using (
  exists (select 1 from public.contractors where id = auth.uid() and approved = true)
  or exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Admin can do everything (you)
create policy "Admin full access jobs" on public.jobs for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
);

-- Applications: contractors see own applications
create policy "Contractors view own applications" on public.job_applications for select using (contractor_id = auth.uid());
create policy "Contractors insert applications" on public.job_applications for insert with check (contractor_id = auth.uid());

-- Credits: contractors see own credits
create policy "Contractors view own credits" on public.credit_transactions for select using (contractor_id = auth.uid());

-- Owner requests: owners see own requests
create policy "Owners view own requests" on public.owner_requests for select using (owner_id = auth.uid());
create policy "Owners insert requests" on public.owner_requests for insert with check (owner_id = auth.uid());