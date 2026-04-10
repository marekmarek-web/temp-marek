# Repo structure guide

## Domény

| Oblast | Kde | Poznámka |
|--------|-----|----------|
| **Marketing / homepage** | `app/(site)/page.tsx`, `components/home/*` | Hero, sekce, klientské části; `HomePageClient` orchestruje loader. |
| **Kalkulačky** | `app/(site)/*kalkulacka/`, `components/calculators/portal/*` | UI; výpočty v `packages/calculators-core` (alias `@/lib/calculators/*`). |
| **Blog / článek** | `app/(site)/blog/*`, `components/blog/*` | Markdown render, CTA, subscribe bloky. |
| **Formuláře / lead capture** | `components/forms/*`, `lib/forms/*`, `POST` `app/api/leads` | Jednotný model + `lib/validation/calculatorLeadSchema.ts`. |
| **Subscribers** | `components/forms/SubscribeInlineForm.tsx`, `lib/subscribers/*`, `POST` `app/api/subscribers` | Odděleně od leadů. |
| **Admin** | `app/admin/*`, `components/admin/*` | Články, leady, subscribery, nastavení. |
| **Auth** | `app/(site)/login`, `app/auth/callback`, `middleware.ts`, `lib/supabase/*` | Session + RLS. |
| **Media** | `public/` | Statické assety; `lib/media/*` a11y helpery. |
| **Sdílené UI** | `components/ui/*` | `AppModal`, `CustomDropdown`, `GoogleMark`, … |
| **Lib / domain** | `lib/**` | Bez JSX; validace, e-mail, SEO, analytics. |
| **DB** | `supabase/migrations/`, `supabase/README.md` | Jediný zdroj SQL migrací. |
| **Dokumentace** | `docs/**` | Playbooky, audit, changelogy. |
| **Legacy migrace** | `docs/migration-legacy/` | Inventura starého HTML; není v buildu. |
| **Obsah seed** | `content/blog-seed/` | Import skriptem `scripts/import-blog-seed.mjs`. |

## Kam přidat nové komponenty

- **Veřejná stránka** → `app/(site)/.../page.tsx` + komponenty podle domény pod `components/`.
- **Formulář** → `components/forms/` + případně rozšířit Zod v `lib/validation/`.
- **Admin** → `components/admin/` nebo přímo v `app/admin/...` pokud jednorázové.

## Kam patří business logika

- **Doménová pravidla** → `lib/leads/`, `lib/subscribers/`, `lib/content/`.
- **Transport (HTTP)**: `app/api/**/route.ts` — tenké; těžká logika v `lib/`.

## Typy — source of truth

- Re-exporty pro přehled: `@/lib/types/public`.
- Jednotlivé moduly zůstávají autoritativní (`lib/posts.ts` → `BlogPost`, …).

## Alias

- `@/*` → kořen projektu; `@/lib/calculators/*` → `packages/calculators-core/src/*`.
