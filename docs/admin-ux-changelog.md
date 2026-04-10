# Changelog — admin UX (duben 2026)

## Co se UXově zlepšilo

- **Navigace** — seskupení do „Obsah“, „Kontakty“, „Web“ (nastavení), viditelný **aktivní odkaz** (`aria-current`), širší layout (`max-w-6xl`).
- **Přístupnost** — odkaz **Přeskočit na obsah**, focus styly u klíčových akcí, **drobečková navigace** u detailu leadu.
- **Přehled** — horní blok **Priorita** (nové leady, fronta, odběratelé 7 dní, distribuce) a rychlé akce; obchodní reporting v **rozbalovací sekci**, méně vizuálního šumu.
- **Leady** — výraznější **Nový** na kartě, srozumitelnější štítky a filtry s `aria-current`, lepší prázdné a chybové stavy, řazení filtru stavu (Nový první).
- **Lead detail** — potvrzení **Uloženo** po úspěšném uložení.
- **Články** — po uložení **zůstatek v editoru** s hláškou (`?saved=1` / `?created=1`); po smazání potvrzení na seznamu (`?deleted=1`); mazání přes **dialog** místo okamžitého submitu.
- **Odběratelé** — **české názvy stavů** ve filtrech, štítek stavu u řádku, vylepšené prázdné a chybové stavy.
- **Loading** — `loading.tsx` u přehledu, leadů, článků a odběratelů (skeleton + `aria-busy`).

## Kde se snížilo tření

- Méně nejistoty po uložení článku (hláška + zůstat v editoru).
- Méně omylů při mazání článku (potvrzovací dialog).
- Rychlejší orientace: aktivní menu, breadcrumbs, dashboard priorita nahoře.
- Méně technického žargonu u chyb (stručný kontext + technická řádka pro správce).

## Co zůstává na pozdější hlubší admin pass

- Úkoly / přiřazení s notifikacemi, SLA, týmový inbox.
- Hromadné operace (leady, články, odběratelé).
- Integrace newsletteru / plánování příspěvků z adminu.
- Jemnější oprávnění a audit log.
- Bohatší editor obsahu (bloky, preview mimo Markdown).
