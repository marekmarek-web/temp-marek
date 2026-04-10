-- Audience (subscribers) + obsahová distribuce + fronta follow-up u leadů

-- 1) Subscribers — marketingový souhlas oddělený od leadů; zápis jen přes service_role API
create table public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  name text,
  source text not null
    check (source in (
      'blog_listing', 'blog_article', 'footer', 'lead_success', 'homepage', 'general'
    )),
  raw_source text,
  source_path text,
  interest_segment text not null default 'general_updates'
    check (interest_segment in ('blog_audience', 'calculators', 'general_updates', 'content_interest')),
  consent_marketing boolean not null default false,
  consent_marketing_at timestamptz,
  consent_text_version text,
  status text not null default 'active'
    check (status in ('active', 'unsubscribed', 'bounced', 'pending')),
  unsubscribed_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  related_lead_id uuid references public.leads (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index subscribers_email_lower_idx on public.subscribers (lower(trim(email)));

create index subscribers_created_at_idx on public.subscribers (created_at desc);
create index subscribers_status_idx on public.subscribers (status);
create index subscribers_segment_idx on public.subscribers (interest_segment);

alter table public.subscribers enable row level security;

create policy "Staff read subscribers"
  on public.subscribers for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role in ('admin', 'editor')
    )
  );

create policy "Staff update subscribers"
  on public.subscribers for update
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role in ('admin', 'editor')
    )
  );

create trigger subscribers_updated_at
  before update on public.subscribers
  for each row execute function public.set_updated_at();

-- 2) Posts — operační stav distribuce (newsletter / sociální sítě / follow-up)
alter table public.posts add column if not exists distribution_status text not null default 'none'
  check (distribution_status in ('none', 'awaiting_distribution', 'distributed', 'needs_followup'));

alter table public.posts add column if not exists promoted_at timestamptz;
alter table public.posts add column if not exists newsletter_ready boolean not null default false;

-- 3) Leads — fronta „potřebuje akci“ (doplňuje stav pipeline)
alter table public.leads add column if not exists needs_follow_up boolean not null default true;
