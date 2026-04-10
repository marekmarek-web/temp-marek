# Final last-mile changelog

## Co bylo doladěno

- **`components/ui/CustomDropdown.tsx`** — barvy a stavy sjednoceny s brandem (navy, cyan, brand-border) místo generické indigo palety; dropdown panel a vybraná položka vizuálně konzistentní se zbytkem webu.
- **`components/auth/LoginForm.tsx`** — při chybě konfigurace přihlášení obecná hláška bez technického názvu služby.
- **`components/forms/SubscribeInlineForm.tsx`** — úspěšný stav: jasný titulek „Děkujeme“, text bez odkazu na nedodělaný nástroj; stále připomíná odhlášení v e-mailu.
- **`components/admin/PostEditor.tsx`** — placeholder slugu `napr. muj-clanek`.
- **`app/admin/settings/page.tsx`** — srozumitelnější nápovědy u polí; tlačítko „Uložit nastavení“ + focus ring.
- **`components/calculators/portal/pension/PensionInputPanel.tsx`** — placeholder dropdownu „Vyberte scénář“.
- **`app/(site)/error.tsx`** — tlačítko přejmenováno na „Zkusit znovu“, doplněny `focus-visible` ringy pro konzistenci s ostatními CTA.

## Odstraněné nepříjemné detaily

- Působení „rozpracované migrace“ u úspěšného odběru newsletteru.
- Technický tón u login chyby pro běžného uživatele.
- Vizuální cizí prvek (indigo dropdown) v penzijní a souvisejících UI.

## Minor backlog

- Prolítání všech kalkulačkových souborů kvůli jednotným `brand-*` třídám místo hex.
- Volitelné skrytí interní verze souhlasu do méně výrazné vrstvy (právní posouzení).

## Production-ready?

**Ano**, při splnění env, DB a DNS popsaných v `docs/final-production-summary.md` a `docs/launch-readiness-audit.md`. Aplikace a dokumentace cutoveru odpovídají očekávání hotového produktu; zbývající body jsou spíš **evoluční vylepšení** než blokátory kvality.
