-- Optional: initial public settings and sample posts (adjust dates as needed)

insert into public.site_settings (key, value, public_readable) values
  ('footer_tagline', '', true),
  ('home_blog_intro', '', true)
on conflict (key) do nothing;

insert into public.posts (slug, title, excerpt, body, category, published, published_at, cover_image_url)
values
  (
    'jak-zacit-investovat',
    'Jak začít investovat v roce 2025',
    'Krátký úvod k článku.',
    'Plný text článku můžete upravit v administraci.',
    'Investice',
    true,
    '2025-01-12T12:00:00Z',
    '/img/blog/blog-1.jpg'
  ),
  (
    'hypoteka-tipy',
    'Hypotéka: na co si dát pozor',
    'Praktické tipy před podpisem.',
    'Plný text článku můžete upravit v administraci.',
    'Hypotéky',
    true,
    '2025-01-05T12:00:00Z',
    '/img/blog/blog-2.jpg'
  ),
  (
    'firemni-benefity',
    'Firemní benefity, které dávají smysl',
    'Přehled pro firmy.',
    'Plný text článku můžete upravit v administraci.',
    'Firmy',
    true,
    '2024-12-28T12:00:00Z',
    '/img/blog/blog-3.jpg'
  )
on conflict (slug) do nothing;
