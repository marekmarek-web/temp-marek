# Lead workflow — interní backbone

## Zdroje

Leady vznikají na webu z formulářů, které posílají tělo ve tvaru `CalculatorLeadBody` na `POST /api/leads`. Pole `source` (`calculator`, `footer_quick`, `homepage_consultation`, `contact_page`, `article_cta`) se mapuje na CRM `source_type` (`homepage`, `footer`, `contact`, `calculator`, `article`, `service_page`) v `lib/leads/mapPayload.ts`.

## Validace

- Server: `calculatorLeadBodySchema` (Zod).
- Pravidlo kontaktu: platný **e-mail** nebo telefon s **≥ 9 číslicemi** (po normalizaci kontroluje superRefine).

## Ukládání

- Tabulka **`public.leads`** — hlavní záznam (jméno, kontakt, kategorie, zdroj, stav, kontext, `metadata` JSONB, příznaky duplicity, přiřazení).
- **`public.lead_status_history`** — změny stavu (append při změně ve adminu).
- Zápis z API přes **Supabase service role** (`SUPABASE_SERVICE_ROLE_KEY`); RLS nepovoluje anonymní insert.

## Stav / pipeline

- Hodnoty: `new`, `contacted`, `qualified`, `waiting`, `closed_won`, `closed_lost`, `archived` (viz `lib/leads/domain.ts`).
- Filtrování v `/admin/leads?status=…`.
- Změna stavu v detailu leadu + záznam do historie.

## Admin inbox

- **Seznam** `/admin/leads` — karty, filtry podle stavu, export CSV.
- **Detail** `/admin/leads/[id]` — kontakt, zdroj, kontext, uživatelská poznámka, interní poznámky, přiřazení, historie stavu.
- Přístup: role `admin` / `editor` (stejně jako blog).

## Duplicity a hygiena

- Při insertu: pokud ve **24 h** existuje stejný **e-mail** nebo **normalizovaný telefon**, nový řádek dostane `duplicate_of_id` a `possible_duplicate = true`.
- Admin zobrazí upozornění a odkaz na starší lead.

## Notifikace

- Resend (`RESEND_API_KEY`, `LEAD_EMAIL_TO`, volitelně `RESEND_FROM`).
- Text obsahuje zdroj, odhad kategorie, kontext, odkaz do adminu (`NEXT_PUBLIC_SITE_URL` + `/admin/leads/{id}`).

## CRM / export

- Sloupce v CSV odpovídají hlavním polím tabulky + vhodné pro import do tabulky / budoucího CRM.
- Typy v kódu: `lib/leads/domain.ts`, `CalculatorLeadBody`, `LeadInsertRow`.

## Env

- `SUPABASE_SERVICE_ROLE_KEY` — nutné pro zápis leadů z API.
- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` — klient a middleware.
- `NEXT_PUBLIC_SITE_URL` — správné odkazy v e-mailech.
- Resend proměnné výše.

## Migrace

- `supabase/migrations/003_leads.sql` — tabulky + RLS.
- `supabase/migrations/004_staff_read_profiles.sql` — staff vidí všechny profily (přiřazení leadů).
