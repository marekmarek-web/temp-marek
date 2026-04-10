# Admin — audit použitelnosti (2026-04)

Krátký přehled stavu před UX během a co se v něm řeší.

## Kde byl admin nejasný nebo těžkopádný

- **Horizontální navigace** bez zřetelného aktivního místa a bez seskupení — všechny položky působily stejně důležitě.
- **Šířka layoutu (`max-w-4xl`)** — seznamy článků a leadů působily stísněně oproti reálné práci s tabulkami/kartami.
- **Leady** — filtry byly funkční, ale chyběly jasné signály „nový“ vs „čeká na akci“ na kartě; prázdný stav byl strohý.
- **Články** — po uložení proběhl redirect bez zpětné vazby; mazání bez potvrzení; úspěch nebyl nikde explicitně řečen.
- **Odběratelé** — filtry stavu zobrazovaly interní anglické klíče místo srozumitelných štítků.
- **Přehled** — obchodní reporting a KPI byly nahoře — pro denní rutinu užitečnější je nejdřív fronta (nové leady, distribuce, rychlé akce).

## Kde chyběla navigační logika

- Jednotný **aktivní stav** odkazů podle URL.
- Na podstránkách **drobečková navigace** (ekvivalent breadcrumbs) pro návrat kontextem „Přehled → sekce → detail“.
- **Skip link** pro klávesnicové uživatele (přeskočit na obsah).

## Kde chyběly rychlé akce

- Na přehledu byly tlačítka rozptýlená — **prioritní blok** (nové leady, fronta, distribuce) teď předchází dlouhým statistikám.

## Slabé empty / error / loading stavy

- Chyběly **route-level loading** stavy pro hlavní admin sekce.
- Chybové hlášky u databáze byly často jen syrový `error.message` — kde to dává smysl, doplněn klidnější kontext (migrace, oprávnění).

## Co se v tomto běhu zlepšuje

- Navigace, šířka layoutu, breadcrumbs, skip link.
- Lead list — štítky „Nový“ / follow-up, čitelnější filtry (`aria-current`).
- Lead detail — krátká **potvrzení po uložení**.
- Články — **potvrzení mazání** (modal), **query parametry** po uložení/ vytvoření, přesměrování po uložení zpět do editoru s hláškou.
- Odběratelé — **lidské názvy stavů**, lepší prázdné stavy.
- Dashboard — **denní priorita** nahoře, reporting níž bez přeplnění úvodní obrazovky.

## Co zůstává na pozdější hlubší pass

- Notifikace v reálném čase, přiřazování úkolů mezi lidmi, SLA.
- Hromadné akce na leadech / článcích.
- Plnohodnotný WYSIWYG / blokový editor (zůstává Markdown).
- Jemnější permission matrix (admin vs editor) nad rámec současných rolí.
