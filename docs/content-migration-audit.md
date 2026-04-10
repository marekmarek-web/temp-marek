# Content migration audit (legacy → Next.js)

**Legacy:** `marekmarek-web/marek-pribramsky` (HTML, `origin/master`)  
**Target:** tento repozitář (Next.js 15, App Router)

## Legacy: hlavní stránky a bloky

| Oblast | Legacy cesta / kotva | Obsah |
|--------|----------------------|--------|
| Úvod | `/` `index.html` | Hero, postup (bento), projekce, proč já, služby, moje cesta, pobočky, reference, blog náhled, FAQ, lead formulář (`#kontakt` / `#lead-form`) |
| Blog listing | `/blog/index.html` | Pouze nadpis + text „Připravujeme“ — **žádné plné články v HTML** |
| Kontakt | `/kontakt/index.html` | Formulář, telefon, e-mail (widget kalkulaček v legacy) |
| Spolupráce | `/spoluprace/index.html` | 4 kroky + sidebar „Co si připravit“ (shodné s target) |
| Kalkulačky | `/kalkulacky/`, jednotlivé `/…kalkulacka/` | Přehled + 4 nástroje |
| Cookies / GDPR | `/cookies/`, `/gdpr/` | Stručné stránky |
| Kariéra | — | **V legacy statickém stromu není** (nová stránka v targetu) |

**Assets:** `assets/img/**` včetně `blog/blog-{1,2,3}.jpg`, loga partnerů, hero, pobočky, timeline fotky — v targetu část v `public/img/`.

## Co už bylo v targetu přeneseno (před tímto během)

- Homepage sekce a kotvy (`#proc-ja`, `#sluzby`, `#spoluprace`, `#moje-cesta`, `#pobocky`, `#reference`, `#blog`, `#faq`, `#kontakt`).
- Kalkulačky na stejných cestách jako legacy (bez `/index.html`).
- `config/site.ts`: kontakt, pobočky, navigace, nástroje.
- Blog: Supabase `posts`, admin editor, veřejné listing/detail.

## Co chybělo nebo bylo slabé

| Položka | Stav |
|---------|------|
| Plné blog články v HTML | V legacy **nebyly** — jen placeholder listing |
| Jednotná právní/regulatorní vrstva | GDPR/cookies byly stručné; footer text duplicitně v kódu |
| Legacy hash `#lead-form` | Na novém webu hlavní kotva `#kontakt` — staré odkazy mohly vést „do prázdna“ |
| Legacy sekce `#muj-postup` | Nově sjednoceno pod `#spoluprace` + kotva zpětné kompatibility |
| Kontaktní stránka | Minimální — bez poboček a sociálních sítí v jednom přehledu |
| Interní prolinkování blog → kontakt | Slabší |

## Co je vědomě odloženo

- Nový CMS mimo Supabase, newsletter, marketing automation, multijazyčnost.
- Úplná právní dokumentace „na míru“ místo odkazu na BEplan — zachován odkaz jako primární zdroj partnera.

## Tento běh (provedeno)

- Centralizovaný `config/legal.ts`, úprava GDPR/cookies, sjednocení souhlasů ve formulářích.
- Redirecty ze starých cest `*/index.html` a trailing slash.
- Kotvy `#lead-form`, `#muj-postup` pro zpětnou kompatibilitu.
- Seed článků `content/blog-seed/` + skript `pnpm import-blog-seed`.
- Dokumentace: route map, playbook, changelog.
- Rozšíření kontaktu, kalkulaček (disclaimer), blog CTA a propojení článku → kontakt.

**Priorita pro ruční kontrolu:** právní texty s právníkem, datumy článků, případné doplnění vlastních fotek u článků.
