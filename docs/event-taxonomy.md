# Event taxonomy (Plausible custom events)

Všechny eventy jsou volány jen při **souhlasu s analytikou**. Neposílejte PII (e-mail, telefon, celé jméno).

## Konvence

- Název eventu: **snake_case**.
- Props: krátké řetězce (max ~120 znaků po ořezu v `track()`), klíče jako `cta_id`, `calculator`, `slug`, `source`, `error`.

## Přehled

| Event | Kdy | Props (příklad) |
|-------|-----|-------------------|
| `pageview` | Plausible / navigace | `path` (z `trackPageview`) |
| `cta_click` | Klik na CTA (header, mobile, home téma, …) | `cta_id`, `topic?` |
| `lead_modal_open` | Otevření lead modalu nebo krok 2 home konzultace | `calculator?`, `funnel?` |
| `lead_submit_success` | Úspěšné POST leadu | `source`, `calc` |
| `lead_submit_error` | Neúspěšné POST leadu | `source`, `error` |
| `subscribe_submit_success` | Úspěšný odběr | `source`, `segment` |
| `subscribe_submit_error` | Chyba odběru | `source`, `error` |
| `calculator_started` | Mount kalkulačky | `calculator` |
| `calculator_completed` | První interakce uvnitř `[data-calculator-root]` | `calculator` |
| `calculator_cta_click` | CTA „chci plán / konzultaci“ u výsledku | `calculator`, `bank?`, `intent?` |
| `blog_listing_view` | Beacon na `/blog` | — |
| `article_view` | Beacon na článku | `slug` |
| `article_cta_click` | Klik na CTA pod článkem | `cta_id`, `slug` |
| `admin_login_success` | Přihlášení heslem | `method` |
| `admin_login_error` | Neúspěšné přihlášení | `method` |

## Co neposílat

- E-mail, telefon, jméno, celé URL s query (path bez tokenů je OK v `pageview`).
- Interní stack trace, UUID leadu do Plausible (zůstává v CRM).
