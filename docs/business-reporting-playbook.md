# Business reporting — jak číst data (light)

## Co se měří kde

| Otázka | Kde |
|--------|-----|
| Odkud leady? | Admin **Top zdroje (raw_source)** + pole `metadata` (UTM) u nových leadů |
| Které kalkulačky? | **Kalkulačky (lead s typem)** + Plausible `calculator_*` |
| Které články táhnou (konverze)? | **Blog — slug z cesty** (lead se `source_path` obsahujícím `/blog/`) |
| Návštěvnost článků | Plausible / `article_view` (ne přímo v DB) |

## Funnel (zjednodušeně)

1. **Homepage konzultace:** `cta_click` (téma) → `lead_modal_open` (krok 2) → `lead_submit_success`. Pokud padá mezi 1→2, lidé nevyberou téma nebo opustí stránku (Plausible exit).
2. **Kalkulačka:** `calculator_started` → `calculator_completed` (první klik/klávesa v oblasti kalkulačky) → `calculator_cta_click` → `lead_submit_success`. Velký propad mezi completed a CTA = nevidí výsledek nebo nechtějí kontakt.
3. **Blog:** `article_view` → `article_cta_click` / odběr → `lead_submit_success` / `subscribe_submit_success`.

## Interpretace „top CTA“

- V **adminu** je „top CTA“ odvozený od **`raw_source`** (např. `homepage_consultation`, `calculator`, `article_cta`) — odpovídá obchodnímu kanálu, ne jednotlivému tlačítku v HTML.
- Detailní **cta_id** je v Plausible u eventu `cta_click`.

## Limity dat

- Agregace leadů je **max. 8000 řádků** za období v jednom dotazu — při extrémním provozu zkrátit okno nebo přidat SQL agregaci.
- **UTM** se bere z prvního načtení stránky v session (`sessionStorage`) — změna UTM uprostřed session se nepřepíše.
- **Odběratelé** — počet „nových“ = řádky v tabulce za období (re-subscribe může aktualizovat existující záznam — chování dle `upsertSubscriberFromBody`).

## Co rozšířit později

- Sloupec `entry_cta_id` u leadu pro shodu s Plausible.
- Týdenní e-mail report z metrik.
- Napojení na Search Console / Ads zvlášť (mimo tento projekt).
