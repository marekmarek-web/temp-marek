# Changelog — deep performance pass (duben 2026)

## Co bylo optimalizováno

- **Blog / homepage blog sekce** — výpis článků bez pole `body` (`BlogPostListItem`, užší `select` v Supabase).
- **next.config** — `experimental.optimizePackageImports: ["lucide-react"]` pro menší klientské bundly z ikon.
- **Úvodní stránka** — `WealthProjectionChart` načtený lazy (`dynamic`, `ssr: false`) s placeholderem.
- **Kalkulačky** — lazy načtení `InvestmentGrowthChart`, `InvestmentAllocationChart`, `MortgageAmortSection`, `LifeRiskChart` (oddělený chunk od hlavní logiky stránky).
- **Admin** — lazy `PostEditor` na `/admin/posts/new` a `/admin/posts/[id]/edit` (`next/dynamic` z serverové stránky; bez `ssr: false` — v Next 15 to není v RSC povolené). Lazy `MarkdownPreview` uvnitř editoru zůstává s `ssr: false` (uvnitř client komponenty).
- **Admin listy** — explicitní `select` u leadů a subscriberů místo `*`.
- **Font** — `display: "swap"`, `adjustFontFallback: true` u Inter.
- **lib/forms/page-url.ts** — odstraněn zbytečný `"use client"` (funkce jen pro klientské volání).

## Snížení klientské zátěže

- Méně JS na první paint u admin post routes (PostEditor v samostatném async chunku).
- Menší serializovaný payload RSC u blog výpisu (bez `body`).
- Grafy a GSAP sekce se stahují až když jsou potřeba (nebo po idle loadu u dynamic importu).

## Kompromisy

- **První otevření editoru** — krátký skeleton místo okamžitého formuláře (záměr).
- **Grafy v kalkulačkách** — krátký skeleton před vykreslením Chart.js (lepší než blokovat celou stránku).
- **WealthProjectionChart** — bez SSR; obsah sekce je pod foldem — SEO textu se netýká.

## Další profiling (doporučení)

- Spustit **@next/bundle-analyzer** a ověřit velikost chunků po kalkulačkách.
- Při >500 leadech zvážit **stránkování** nebo infinite scroll s `range`.
- Zvážit **prefetch** jen pro `/blog` a hlavní CTA, ne pro celý web.
