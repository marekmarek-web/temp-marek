-- CRM-light: leads + status history. Inserts z API přes service_role; čtení/úpravy jen staff (admin|editor).

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null default '',
  phone text,
  phone_normalized text,
  note text,
  source_type text not null
    check (source_type in ('homepage', 'footer', 'contact', 'calculator', 'article', 'service_page')),
  raw_source text,
  source_path text,
  lead_category text not null
    check (lead_category in (
      'general', 'consultation', 'pension', 'life', 'mortgage', 'investment', 'insurance', 'real_estate'
    )),
  calculator_type text
    check (calculator_type is null or calculator_type in ('pension', 'life', 'mortgage', 'investment')),
  life_intent text
    check (life_intent is null or life_intent in ('general', 'proposal', 'check')),
  result_summary text,
  metadata jsonb not null default '{}'::jsonb,
  topic text,
  interest text,
  consent boolean,
  status text not null default 'new'
    check (status in ('new', 'contacted', 'qualified', 'waiting', 'closed_won', 'closed_lost', 'archived')),
  assignee_id uuid references public.profiles (id) on delete set null,
  internal_notes text,
  duplicate_of_id uuid references public.leads (id) on delete set null,
  possible_duplicate boolean not null default false,
  last_edited_by uuid references auth.users (id) on delete set null,
  attachment_filename text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index leads_created_at_idx on public.leads (created_at desc);
create index leads_status_idx on public.leads (status);
create index leads_email_lower_idx on public.leads (lower(email));
create index leads_phone_norm_idx on public.leads (phone_normalized) where phone_normalized is not null;
create index leads_assignee_idx on public.leads (assignee_id) where assignee_id is not null;

alter table public.leads enable row level security;

create policy "Staff read leads"
  on public.leads for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role in ('admin', 'editor')
    )
  );

create policy "Staff update leads"
  on public.leads for update
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role in ('admin', 'editor')
    )
  );

-- Žádný insert/update pro anon — API používá service_role.

create table public.lead_status_history (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads (id) on delete cascade,
  old_status text,
  new_status text not null,
  changed_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now()
);

create index lead_status_history_lead_idx on public.lead_status_history (lead_id, created_at desc);

alter table public.lead_status_history enable row level security;

create policy "Staff read lead status history"
  on public.lead_status_history for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role in ('admin', 'editor')
    )
  );

create policy "Staff insert lead status history"
  on public.lead_status_history for insert
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role in ('admin', 'editor')
    )
  );

create trigger leads_updated_at
  before update on public.leads
  for each row execute function public.set_updated_at();
