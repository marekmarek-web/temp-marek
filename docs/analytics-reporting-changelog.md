# Changelog — analytics & business reporting (2026-04-10)

## Co se nově měří

- Sjednocené názvy eventů (`cta_click`, `article_view`, `lead_submit_error`, `subscribe_submit_error`, `calculator_*`, `admin_login_error`).
- **Kalkulačky:** `calculator_started`, `calculator_completed` (interakce v `[data-calculator-root]`), `calculator_cta_click` u všech čtyř typů.
- **Homepage lead:** `lead_modal_open` při vstupu do kroku 2 konzultace; `cta_click` s `cta_id: home_consultation_topic`.
- **Blog:** `article_view` (beacon), `article_cta_click` na odkazech pod článkem.
- **Přihlášení:** `admin_login_error` při chybě hesla.
- **Attribution:** UTM + `landing_path` v sessionStorage → sloučení do `metadata` u POST leadů a odběratelů (rozšířené `subscriberBodySchema.metadata`).

## Technické

- `track()` deduplikace (~1,8 s) proti dvojímu odeslání (Strict Mode).
- `trackPageview` zůstává u Plausible jako vestavěný `pageview`.
- `data-calculator-root` na `CalculatorPageShell`.

## Admin dashboard

- Nový blok **„Obchodní přehled (30 dní)“:** leady celkem, odběratelé, koncepty/publikováno, top `raw_source`, top `calculator_type`, top blog slugy z `source_path`.

## Co je jen základ

- Funnel „drop“ se z DB přímo nepočítá — porovnávají se součty eventů v Plausible nebo odhady z poměrů.
- Top „CTA“ v adminu = kanál (`raw_source`), ne jednotlivé HTML CTA.

## Doporučení na příště

- Ukládat volitelně `cta_id` do DB u leadu.
- Plausible Goals pro klíčové eventy (jedním klikem v UI Plausible).
- Pravidelný export leadů + propojení s newsletter nástrojem.
