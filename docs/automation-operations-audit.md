# Automation & operations — audit (akční)

## Co web a admin dnes umí

- **Leady**: jednotný `POST /api/leads`, DB + e-mail, admin inbox, stavy, interní poznámky, CSV export, **fronta follow-up** (`needs_follow_up` + filtr „Fronta akce“).
- **Obsah**: články v Supabase, publikace, SEO, featured, nově **distribuce** (`distribution_status`, `promoted_at`, `newsletter_ready`).
- **Audience**: `POST /api/subscribers`, tabulka `subscribers`, admin přehled, segmentace základ, CSV export.
- **Subscribe vstupy**: blog (výpis + článek), patička — bez agresivního popupu; odkaz z úspěchu kalkulačkového modalu na patičku.

## Kde dával smysl subscriber / newsletter-ready flow

- Blog a patička — hotovo.
- Články — `newsletter_ready` + stav distribuce v editoru.
- Budoucí: double opt-in (`pending`), transakční follow-up e-maily (abstrakce v `lib/email/distribution.ts`).

## Kde chyběla follow-up návaznost

- Lead: doplněno **needs_follow_up** + filtr ve výpisu.
- Článek: doplněno **distribution_status** a přehled na dashboardu.

## Kde chyběl interní operativní přehled

- Dashboard: bloky leady/subscribery 7 dní, články čekající na distribuci, quick links.

## Co tento běh implementuje

- Model `subscribers`, API, UI, export, consent oddělený od leadu.
- Distribuční pole u `posts`, úprava editoru a admin seznamu.
- Follow-up u leadů, operativní dashboard, dokumentace.

## Budoucí rozšíření (mimo scope)

- Plný newsletter builder, journey automation, Mailchimp/Brevo sync, SMS, double opt-in workflow.
