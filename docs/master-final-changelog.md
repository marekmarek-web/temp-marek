# Master final changelog

Finishing pass: audit + dokumentace + minimální kódové úpravy s vysokým poměrem přínos/riziko.

## Dokumenty

| Soubor | Změna |
|--------|--------|
| **`docs/master-final-audit.md`** | Nový: parity, technické a UX shrnutí, priority P0/P1/P2, závěr production-ready. |
| **`docs/final-production-summary.md`** | Přepsaný jako jednotný vstupní bod; odkazy na checklist, admin-setup, migrace. |
| **`docs/release-readiness-checklist.md`** | Doplněno: migrace 001–005, odkaz na master audit a `admin-setup`. |
| **`docs/admin-setup.md`** | Sekce migrace: **003–005** popsány (leady, profily, subscribers/operativa); varování bez nich. |

## Kód

| Soubor | Změna |
|--------|--------|
| **`components/blog/BlogMarkdown.tsx`** | Obal Markdown výstupu do `<article>` místo `<div>` — sémantika článku, lepší čitelnost pro SEO/a11y. |

## Co zůstává backlog

- Sjednocení hex barev v kalkulačkách pod jednu paletu.
- Legacy redirecty pro jednotlivé články podle exportu starého webu.
- Rozšíření E2E mimo smoke.

## Production-ready?

**Ano** při splnění env, **všech migrací 001–005**, DNS a smoke testu — viz `final-production-summary.md`.

**Hlavní neblokující** technický dluh z pohledu kódu: vizuální tokenizace kalkulaček.  
**Hlavní blokátor provozu:** nasazení bez migrací 003–005 při používání leadů a odběratelů v produkci.
