# Prvních 24 hodin po launchi — checklist

Rychlá kontrolní tabulka pro provoz a vývoj.

## První 0–2 hodiny

- [ ] Hlavní stránka 200, bez konzole chyb v prohlížeči (základní prohlídka).
- [ ] `/blog` — výpis článků, alespoň jeden detail s coverem.
- [ ] Jeden lead z kontaktu nebo patičky — záznam DB + e-mail (dle nastavení).
- [ ] Subscribe z blogu — záznam / očekávané chování.
- [ ] `/login` → přihlášení test účtem → `/admin` → odhlášení.
- [ ] Redirect: `/kontakt/` → kanonická URL jedním skokem (`curl -I` nebo DevTools).
- [ ] `robots.txt` a `sitemap.xml` na produkční doméně, správná base URL.

## Formuláře a API

- [ ] POST `/api/leads` (skrze UI) — ne 4xx/5xx.
- [ ] POST `/api/subscribers` — dle scénáře (double opt-in může vyžadovat klik v mailu).
- [ ] Kalkulačky — odeslání leadu z modálu (aspoň jedna kalkulačka).

## Auth a admin

- [ ] Role editor/admin odpovídá očekávání (přístup k článkům, admin-only sekce).
- [ ] Žádné úniky `/admin` bez přihlášení.

## Blog a SEO

- [ ] Sdílení článku — OG obrázek a titulek (Facebook Debugger / rich preview v Slacku volitelně).
- [ ] Canonical v HTML odpovídá produkční doméně.

## Performance

- [ ] LCP rozumné na úvodní stránce (mobil i desktop vzorkově).
- [ ] Žádné masivní chyby v Sentry po návštěvách.

## Redirecty a chyby

- [ ] Náhodná stará URL z tabulky v `redirect-verification.md` — očekávaný výsledek.
- [ ] Vlastní 404 stránka Next (pokud je) na neexistující cestu.
- [ ] `/global-error` se nespouští při běžném procházení.

## Analytics a consent

- [ ] Plausible (nebo jiná) — traffic po souhlasu s cookies (realtime).
- [ ] Cookie banner se zobrazuje a ukládá volbu.

## Komunikace

- [ ] Interní kanál: „Launch proběhl, sledujeme první hodiny.“
