# Subscriber workflow

## Rozdíl oproti leadu

| | Lead | Subscriber |
|---|------|------------|
| Účel | konzultace, poptávka, kontakt | marketingový souhlas, novinky |
| Souhlas | často GDPR ke zpracování poptávky | explicitní **consent marketing** + verze textu |
| Tabulka | `public.leads` | `public.subscribers` |
| API | `POST /api/leads` | `POST /api/subscribers` |

## Odkud přicházejí odběratelé

- `blog_listing` — výpis blogu (`#novinky`).
- `blog_article` — pod článkem.
- `footer` — patička (`#newsletter-footer`).
- Další zdroje v enumu: `lead_success`, `homepage`, `general` (rezerva).

## Segmentace (`interest_segment`)

- `blog_audience`, `calculators`, `general_updates`, `content_interest` — pro budoucí segmentovaný export / kampaně.

## Statusy

- `active`, `unsubscribed`, `bounced`, `pending` (pro budoucí double opt-in).
- Admin může měnit stav; u `unsubscribed` se doplní `unsubscribed_at`.

## Technické

- Zápis přes **service role** (stejně jako leady); RLS jen pro staff.
- Verze souhlasu: `CONSENT_TEXT_VERSION` v `lib/subscribers/domain.ts`.
- Export: `GET /api/admin/subscribers/export` (přihlášený editor/admin).
