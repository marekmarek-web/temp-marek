-- Interní role potřebují vidět profily kolegů (přiřazení leadů, zobrazení editora).

create policy "Staff read all profiles"
  on public.profiles for select
  using (
    exists (
      select 1 from public.profiles self
      where self.id = auth.uid() and self.role in ('admin', 'editor')
    )
  );
