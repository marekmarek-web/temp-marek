# Deep performance audit (2026-04)

## Největší výkonové problémy

1. **Blog listing + homepage blog sekce** — `fetchPublishedPosts` dříve tahalo i `body` (Markdown) pro každý řádek. U desítek článků zbytečně velký přenos z DB a serializace do RSC.
2. **Chart.js / domovský graf** — kalkulačky (investice, hypotéka amortizace, život) a sekce „Projekce majetku“ na úvodě tahaly těžké knihovny do hlavního chunku kalkulačky / initial path.
3. **Admin editor** — `PostEditor` + `react-markdown` v jednom klientském balíku pro každého, kdo otevře seznam článků; náhled Markdownu nepotřebuje být v initial bundle.
4. **Admin listy** — `select("*")` u leadů a subscriberů nafukovalo payload a práci pro Supabase driver.

## Kde se zbytečně hydratovalo / táhlo hodně JS

- Úvod: **WealthProjectionChart** (GSAP + ScrollTrigger) v sekci pod fold — nemusí být v SSR ani v prvním synchronním chunku stránky.
- **PostEditor** na route `/admin/posts/new` a `/admin/posts/[id]/edit` — validní jako client, ale měl být lazy (`dynamic(..., { ssr: false })`) kvůli oddělení od layoutu adminu.
- Kalkulačky zůstávají client-heavy (výpočty + formuláře); optimalizace je **code-split** grafů, ne převod na RSC.

## Bundle bloat (zdroje)

- **chart.js** + **react-chartjs-2** — několik registrací a komponent; řešení: lazy načítání komponent s grafy.
- **react-markdown** — jen admin náhled; lazy uvnitř `PostEditor`.
- **lucide-react** — barrel importy; `optimizePackageImports` v `next.config`.
- **apexcharts** — už dříve lazy v `InvestmentBacktestChart`; beze změny.

## Slabé query / fetch patterny

- Veřejný blog: široký `select` na výpis — opraveno užším výběrem sloupců.
- Admin: `*` na listech — zúženo na sloupce potřebné pro UI.

## Co se v tomto běhu opravuje

- Užší DB select pro blog listing, typ `BlogPostListItem`.
- `optimizePackageImports` pro `lucide-react`.
- `dynamic()` pro: WealthProjectionChart, chart sekce v investiční / hypotéční / životní kalkulačce, MarkdownPreview v PostEditoru, PostEditor na admin post routes.
- Admin lead/subscriber list — explicitní select.
- `page-url` bez `use client` (čistší hranice; soubor používají jen klientské formuláře).
- Font: explicitní `display: swap`, `adjustFontFallback`.

## Co dál stojí za profiling

- Bundle analyzer (`@next/bundle-analyzer`) na kalkulačky + home.
- **Pension** kalkulačka — zkontrolovat, zda nepřibyly těžké závislosti.
- Admin: stránkování leadů při růstu dat.
- Service worker / prefetch — zatím out of scope.

## Poznámka k Next.js 15

`next/dynamic` s `ssr: false` **nesmí** být v Server Components (včetně `page.tsx`). Lazy `PostEditor` a `WealthProjectionChart` z RSC proto používají `dynamic()` bez `ssr: false`; `MarkdownPreview` s `ssr: false` zůstává uvnitř **`PostEditor`** (client boundary).
