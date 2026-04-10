# Průvodce administrací (denní práce)

Stručný návod pro editora / asistentku — co kde najít a jak postupovat bez zbytečného klikání.

## Přihlášení a role

- Přístup je přes běžné přihlášení na web; admin je jen pro účty s rolí **editor** nebo **admin**.
- **Admin** vidí navíc sekci **Nastavení** (web). Editor pracuje s články, leady a odběrateli.

## Přehled (dashboard)

Na **Přehledu** začněte den:

1. **Priorita** — kolik je **nových leadů** (stav „Nový“), odkaz do inboxu, **fronta akce** (follow-up), odběratelé za 7 dní, články **čekající na distribuci**.
2. **Rychlé akce** — nový článek, všechny leady, odběratelé.
3. Pod tím jsou **doplňkové statistiky** a **obchodní přehled** (rozbalí se) — pro orientaci v číslech, ne pro každodenní klikání.
4. **Naposledy upravené články** — rychlý návrat k rozpracované práci.

**Kde je „co je nové“:** nové leady = filtr `Nový` nebo dlaždice na přehledu; noví odběratelé = přehled / sekce Odběratelé; články k oznámení = stav distribuce u publikovaného článku + seznam v prioritní sekci.

## Leady

1. Otevřete **Leady** v horní navigaci (skupina Kontakty).
2. **Filtry:** **Vše**, **Fronta akce** (lead označený k dalšímu kroku), pak jednotlivé **stavy** (Nový, Kontaktováno, …). Fronta akce lze kombinovat s výběrem stavu.
3. Na kartě: štítek **Nový** = stav nový; **čeká na akci** = fronta follow-up.
4. **Detail** — změňte stav, interní poznámky, přiřazení, zaškrtnutí fronty. **Uložit změny** ukáže krátké potvrzení.
5. **Export CSV** — pro tabulku / mailing mimo systém.

**Tip:** Po vyřízení leadu nastavte stav a podle potřeby odškrtněte frontu follow-up.

## Články

1. **Články** → **Nový článek** nebo úprava ze seznamu.
2. **Uložit** — respektuje přepínač „Publikovat“. Po uložení zůstanete v editoru a uvidíte zelené potvrzení.
3. **Uložit koncept** — vždy nepublikované.
4. **Publikovat** — zveřejní a doplní datum publikace, pokud chybí.
5. Cover: URL nebo **Nahrát do úložiště**. SEO pole jsou pod obsahem.
6. **Distribuce / newsletter** — provozní štítky (neautomatické rozesílání); sloučí se s přehledem „čeká na distribuci“.
7. **Smazat** u článku v seznamu vyžádá **potvrzení** v dialogu.

Při opuštění stránky s neuloženými změnami v textu vás prohlížeč může upozornit (Markdown / perex se sleduje jako změna).

## Odběratelé

1. **Odběratelé** — filtry **Stav** (česky: Aktivní, Odhlášen, …) a **Téma** (segment).
2. U řádku lze měnit stav rozbalovačkou (např. odhlášení).
3. **Export CSV** pro práci v Excelu / jiném nástroji.

## Limity současného adminu

- Žádné hromadné akce nad leady v UI (jednotlivě v detailu).
- Newsletter se **neodesílá** automaticky z adminu — distribuce je informační / přípravná.
- Články jsou v **Markdownu**, ne v vizuálním editoru bloků.
- Práva jsou hrubá: editor vs admin (ne jemná práva po uživatelích).

Pro hlubší provozní postupy používejte také `docs/operations-playbook.md` a případně `docs/business-reporting-playbook.md`.
