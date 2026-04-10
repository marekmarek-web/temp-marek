-- Run in Supabase SQL Editor (or supabase db push). Creates tables, RLS, storage policies.

-- Editors (one row per auth user who may manage content; create row manually for assistant — see supabase/README.md)
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role text not null default 'editor' check (role = 'editor'),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users read own profile"
  on public.profiles for select
  using (auth.uid() = id);

-- Job applications: RLS on, no policies — anon/auth cannot access; Next.js uses service_role to insert.
create table public.job_applications (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  contact text not null,
  message text,
  position text,
  cv_url text,
  consent boolean not null default false,
  page_url text,
  created_at timestamptz not null default now()
);

alter table public.job_applications enable row level security;

-- Blog posts
create table public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text,
  body text not null default '',
  category text not null default '',
  published boolean not null default false,
  published_at timestamptz,
  cover_image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index posts_published_published_at_idx on public.posts (published, published_at desc nulls last);

alter table public.posts enable row level security;

create policy "Anyone reads published posts"
  on public.posts for select
  using (published = true);

create policy "Editors read all posts"
  on public.posts for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'editor'
    )
  );

create policy "Editors insert posts"
  on public.posts for insert
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'editor'
    )
  );

create policy "Editors update posts"
  on public.posts for update
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'editor'
    )
  );

create policy "Editors delete posts"
  on public.posts for delete
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'editor'
    )
  );

-- Editable site copy (public only where public_readable = true)
create table public.site_settings (
  key text primary key,
  value text not null default '',
  public_readable boolean not null default false,
  updated_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;

create policy "Public reads public site settings"
  on public.site_settings for select
  using (public_readable = true);

create policy "Editors read all site settings"
  on public.site_settings for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'editor'
    )
  );

create policy "Editors insert site settings"
  on public.site_settings for insert
  with check (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'editor'
    )
  );

create policy "Editors update site settings"
  on public.site_settings for update
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'editor'
    )
  );

create policy "Editors delete site settings"
  on public.site_settings for delete
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'editor'
    )
  );

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger posts_updated_at
  before update on public.posts
  for each row execute function public.set_updated_at();

create trigger site_settings_updated_at
  before update on public.site_settings
  for each row execute function public.set_updated_at();

-- Storage: public bucket for blog cover images
insert into storage.buckets (id, name, public)
values ('blog-covers', 'blog-covers', true)
on conflict (id) do nothing;

create policy "Public read blog covers"
  on storage.objects for select
  using (bucket_id = 'blog-covers');

create policy "Editors upload blog covers"
  on storage.objects for insert
  with check (
    bucket_id = 'blog-covers'
    and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'editor')
  );

create policy "Editors update blog covers"
  on storage.objects for update
  using (
    bucket_id = 'blog-covers'
    and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'editor')
  );

create policy "Editors delete blog covers"
  on storage.objects for delete
  using (
    bucket_id = 'blog-covers'
    and exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'editor')
  );
