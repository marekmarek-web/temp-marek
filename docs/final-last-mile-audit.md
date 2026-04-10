# Final last-mile audit

Krátký průchod repozitářem před produkčním vnímáním „hotový produkt“.

## Nalezené zbylé problémy

| Oblast | Popis | Závažnost |
|--------|--------|-----------|
| **CustomDropdown** | Barvy `indigo-*` neseděly ke zbytku brandu (navy/cyan). | Kosmetika / konzistence |
| **LoginForm** | Chybová hláška při chybě konfigurace zmiňovala „Supabase“ — příliš technicky pro ne-technika. | UX copy |
| **SubscribeInlineForm** | Úspěšná zpráva odkazovala na budoucí „nástroj pro rozesílku“ — působilo nedodělaně. | Obsah / důvěra |
| **PostEditor** | Placeholder slugu `napr-clanek` bez diakritiky a s překlepem. | Detail |
| **Nastavení adminu** | Mikrocopy „z kódu“ místo srozumitelnější formulace. | Admin polish |
| **Penzijní dropdown** | Placeholder „Scénář“ málo výstižný. | Malý detail |
| **Site error boundary** | Tlačítko „Opakovat“ bez focus ringů oproti ostatním CTA; label „Zkusit znovu“ srozumitelnější. | A11y / konzistence |

## Kritické vs kosmetické

- **Žádné kritické bezpečnostní nebo rozbité flow** nebyly v tomto passu nalezeny (spoléhá na předchozí kroky).
- Vše výše je **kosmetika, copy a vizuální sjednocení**.

## Co tento běh opravil

- Sjednocení **CustomDropdown** na brand paletu.
- **Uživatelsky čitelnější** login hláška při výpadku konfigurace.
- **Úspěšný stav newsletteru** bez rozpracované věty o nástroji.
- **Placeholdery a admin** mikrocopy, penzijní dropdown, **error.tsx** tlačítko + focus ring, admin settings submit label.

## Vědomě minor backlog (neřešeno teď)

- Jednotné přepsání všech kalkulaček na čistě `brand-*` bez lokálních hex (velký refactor).
- Globální design tokens místo rozptýlených `slate-*` v jednotlivých kalkulačkách.
- Odstranění `CONSENT_TEXT_VERSION` z viditelného textu (volitelně jen pro právní audit interně) — zatím ponecháno pro transparentnost.

## Dokumentace

- `docs/final-production-summary.md` — celkový stav.
- `docs/final-last-mile-changelog.md` — seznam změn v tomto běhu.
