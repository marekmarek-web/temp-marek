# Naming conventions

## Komponenty (`components/`)

- **PascalCase** soubory: `SiteHeader.tsx`, `CalculatorLeadModal.tsx`.
- **Doménové složky**: `components/home/`, `components/blog/`, `components/forms/`, `components/calculators/portal/`, `components/admin/`, `components/layout/`, `components/ui/`, `components/auth/`, `components/consent/`.
- **Přípony**: žádné `temp`, `New`, `final`, `v2` v názvech souborů.
- **Modaly**: `*Modal.tsx` (např. `CalculatorLeadModal`, `LifeContactModal`).

## Data & config (`config/`, `lib/`)

- `config/*.ts` — veřejná konfigurace webu (site, cta, legal).
- `lib/**/*.ts` — čistá logika (bez JSX). Validace: `lib/validation/*.ts`.
- **Domain**: `lib/leads/`, `lib/subscribers/`, `lib/content/` — business pravidla a mapování.
- **Jednotný lead payload** — typ `CalculatorLeadBody` / schema `calculatorLeadBodySchema` (historický název souboru `calculatorLeadSchema.ts`; nový kód může importovat z `@/lib/types/public`).

## Server utilities

- `lib/supabase/*` — klienti (server, admin).
- `lib/admin/*` — guardy pro CMS (`require-editor`, `get-editor-session`).
- `lib/seo/*`, `lib/observability/*` — podle účelu.

## Admin vs marketing

- **Routes**: `app/admin/*` — interní CMS; `app/(site)/*` — veřejný web (route group `(site)`).
- **Actions**: `app/admin/**/actions.ts` + specializované (`app/admin/leads/actions.ts`, …).

## Formuláře a API

- `lib/forms/postLeadApi.ts`, `postSubscriberApi.ts` — `post*Json` / `post*FormData` pro klienta.
- `lib/forms/page-url.ts` — klientovská `pageUrl` pro kontext odeslání.
- `lib/forms/public-json.ts` — parsování odpovědí veřejných API.

## Casing

- Soubory: **PascalCase** pro komponenty, **camelCase** / **kebab-case** pro utility podle konvence složky (preferuj **camelCase** pro `.ts` funkce).
- DB: **snake_case** v Supabase (sloupce).

## Co nedělat

- Nemíchat FormSubmit/legacy názvy s produkčním `/api/leads` tokem.
- Nepřidávat obecné názvy (`utils.ts`, `helpers.ts`) bez kontextu; raději `lib/forms/public-json.ts`.
