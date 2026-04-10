# Analytics audit — premium-brokers

Datum: 2026-04-10

## Co se dnes měří (po úpravách)

- **Plausible** po souhlasu (`ConsentContext`, `PlausibleAnalytics`, `track` / `trackPageview`).
- **Custom eventy** sjednocené v `lib/analytics/events.ts` (snake_case názvy pro Plausible).
- **Funnel kalkulaček:** `calculator_started` → `calculator_completed` (první interakce v `[data-calculator-root]`) → `calculator_cta_click` → `lead_submit_*`.
- **Homepage konzultace:** `cta_click` (téma) → `lead_modal_open` (krok 2) → `lead_submit_*`.
- **Blog:** `blog_listing_view`, `article_view`, `article_cta_click`, odběr přes `subscribe_submit_*`.
- **Attribution:** session `landing_path` + UTM v `sessionStorage`, sloučení do `metadata` leadu/odběratele.
- **Admin:** přehled v DB za 30 dní (zdroje, kalkulačky, blog slugy z cesty).

## Co se neměří / limity

- **„Kde odpadávají“** přesně jako v BI — Plausible dává souhrny; jemný funnel drop je odvozen z poměru eventů v čase (viz playbook).
- **CTA po jednotlivých ID** v adminu — v DB je `raw_source`, ne `cta_id` z Plausible; top CTA v dashboardu je proxy přes zdroj leadu.
- **100 % přesnost** při vícero instancích serveru u rate limitu — nesouvisí s analytics, ale s API.

## Event chaos (řešeno)

- Dříve mix `cta_header_contact` vs `cta_click` — sjednoceno na `cta_click` + `cta_id`.
- Duplicitní article beacon při Strict Mode — dedupe v `track()` + jednorázový ref v `BlogViewBeacon`.
- `blog_article_view` vs `article_view` — jeden název `article_view`.

## Co tento běh implementuje

- Taxonomie, attribution vrstva, instrumentace kalkulaček a článků, rozšíření admin přehledu, dokumentace.

## Future enhancement

- Export metrik CSV / napojení na BigQuery.
- Uložení `cta_id` do DB u leadu (volitelný sloupec) pro 1:1 shodu s Plausible.
- Vlastní dashboard nad Plausible API (náklady / scope).
