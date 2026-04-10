# Changelog — interní lead backbone

## Co je implementováno

- **Jednotný model** leadu: typy v `lib/leads/domain.ts`, validace `lib/validation/calculatorLeadSchema.ts`, mapování payload → DB `lib/leads/mapPayload.ts`, normalizace `lib/leads/normalize.ts`, insert + deduplikace `lib/leads/insertLead.ts`.
- **API** `POST /api/leads`: validace, persist přes service role, e-mail Resend, odpověď `{ ok, leadId }`.
- **Kontaktní stránka** `ContactPageForm` používá `/api/leads` místo FormSubmit.
- **Admin**: `/admin/leads` (seznam + filtry), `/admin/leads/[id]` (detail, stav, interní poznámky, přiřazení, historie stavu), odkaz v hlavním admin layoutu.
- **Server actions** `app/admin/leads/actions.ts` — úprava leadu + zápis do `lead_status_history` při změně stavu.
- **CSV export** `GET /api/admin/leads/export` (jen přihlášený editor/admin).
- **E-mail**: přehlednější text (kategorie odhad z `inferLeadCategory`), subject pro článek (`article_cta`), odkaz do adminu.
- **Dokumentace**: `docs/lead-orchestration-audit.md`, `docs/lead-workflow.md`.

## Tabulky / migrace

- `003_leads.sql` — `public.leads`, `public.lead_status_history`, RLS pro staff.
- `004_staff_read_profiles.sql` — policy „Staff read all profiles“ pro výběr přiřazení.

## Základ vs. budoucí rozšíření

- **Základ**: jeden inbox, stavy, poznámky, lehká historie stavu, deduplikace 24 h, CSV.
- **Enhancement**: kanban, notifikace do Slacku, vlastní scoring, plná synchronizace s externím CRM, případně `article_cta` formulář v šabloně článku.

## Setup

1. Spustit migrace v Supabase (SQL Editor nebo `supabase db push`).
2. Nastavit `SUPABASE_SERVICE_ROLE_KEY` v prostředí nasazení (bez exponování klientu).
3. Ověřit `NEXT_PUBLIC_SITE_URL` pro produkční odkaz v e-mailu.
4. Pro interní uživatele mít řádek v `public.profiles` s rolí `admin` nebo `editor` (viz `supabase/README.md`).
