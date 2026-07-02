-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles table (extends auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  name text not null default '',
  email text not null default '',
  avatar_url text,
  credits integer not null default 5,
  subscription_tier text not null default 'free' check (subscription_tier in ('free', 'pro', 'enterprise')),
  stripe_customer_id text unique,
  subscription_id text,
  subscription_status text default 'inactive' check (subscription_status in ('active', 'inactive', 'cancelled', 'past_due')),
  preferred_tone text default 'professional',
  preferred_type text default 'cold-outreach',
  total_emails_generated integer not null default 0,
  referral_code text unique default substr(md5(random()::text), 1, 8),
  referred_by uuid references public.profiles(id),
  failed_login_attempts integer not null default 0,
  locked_until timestamptz,
  last_login_at timestamptz,
  last_login_ip text,
  -- Profile fields
  job_title text default '',
  experience_level text default 'Student' check (experience_level in ('Student', 'Junior', 'Mid-Level', 'Senior')),
  tech_stack text default '',
  projects text default '',
  github_url text default '',
  linkedin_url text default '',
  portfolio_url text default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Credit history table
create table public.credit_history (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  amount integer not null,
  type text not null check (type in ('earn', 'spend')),
  description text not null default '',
  created_at timestamptz not null default now()
);

-- RLS policies
alter table public.profiles enable row level security;
alter table public.credit_history enable row level security;

-- Users can read their own profile
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

-- Users can update their own profile
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Users can read their own credit history
create policy "Users can view own credit history"
  on public.credit_history for select
  using (auth.uid() = user_id);

-- Function to create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', ''),
    new.email
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to create profile on signup
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Function to update updated_at
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Trigger for updated_at
create trigger handle_profiles_updated_at
  before update on public.profiles
  for each row execute function public.handle_updated_at();
