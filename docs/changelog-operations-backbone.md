# Changelog — automation & operations backbone

## Přidáno

### Databáze (`005_subscribers_operations.sql`)

- **`public.subscribers`**: e-mail, jméno, zdroj, segment, souhlas + čas, verze textu, status, `metadata`, `related_lead_id`, RLS pro staff.
- **`posts`**: `distribution_status`, `promoted_at`, `newsletter_ready`.
- **`leads`**: `needs_follow_up` (výchozí `true` u nových).

### API

- `POST /api/subscribers` — validace, honeypot, rate limit, upsert přes service role.
- `GET /api/admin/subscribers/export` — CSV.

### Web

- `SubscribeInlineForm` — blog, článek, patička (`#newsletter-footer`, `#novinky`).
- Kalkulačka: odkaz na přihlášení k novinkám v patičce (odděleně od leadu).

### Admin

- `/admin/subscribers` — seznam, filtry, změna stavu, export.
- Dashboard — leady/subscribery (7 dní), články čekající na distribuci, quick links.
- Editor článku — sekce distribuce / newsletter.
- Seznam článků — štítky distribuce a „newsletter“.
- Leady — fronta follow-up (checkbox + filtr + badge).

### Knihovny

- `lib/subscribers/*`, `lib/validation/subscriberSchema.ts`, `lib/content/distribution.ts`, `lib/forms/postSubscriberApi.ts`, `lib/email/distribution.ts` (stub).

### Dokumentace

- `docs/automation-operations-audit.md`, `docs/operations-playbook.md`, `docs/subscriber-workflow.md`.

## Lead vs subscriber

- Lead = obchodní kontakt; subscriber = marketingový souhlas + jiná tabulka + jiné API.

## Env / migrace

- Stejné jako leady: `SUPABASE_SERVICE_ROLE_KEY` pro zápis subscriberů.
- Spustit migraci **`005_subscribers_operations.sql`** v Supabase.

## Další doporučený krok

- Public **unsubscribe** stránka (`/unsubscribe?token=…`) nebo přes budoucí nástroj.
- Double opt-in pro subscribery (`pending`).
