# Supabase setup

1. Create a project at [supabase.com](https://supabase.com).
2. In **Project Settings → API**, copy `URL` and `anon` / `service_role` keys.
3. Add them to `.env.local` (see root `.env.example`).
4. Open **SQL Editor**, paste and run `migrations/001_initial.sql`.
5. Optionally run `seed.sql` for default `site_settings` rows and three sample blog posts.
6. **Authentication → Providers**: enable Email (password or magic link as you prefer).
7. Create the assistant user: **Authentication → Users → Add user** (email + password).
8. Copy the new user’s UUID from the users table and run:

```sql
insert into public.profiles (id, role) values ('PASTE-USER-UUID-HERE', 'editor');
```

Without this row, the user cannot manage posts, storage uploads, or site settings (RLS).

9. **Authentication → URL configuration**: set **Site URL** to your production domain (and add `http://localhost:3000` for local dev).
