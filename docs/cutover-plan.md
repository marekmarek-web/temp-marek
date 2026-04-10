# Cutover plán (DNS / Vercel / doména)

Stručný postup bezpečného přepnutí provozu na nový web.

## Před přepnutím (pre-flight)

1. **Staging / Preview** — nasazení z main, smoke test (viz QA checklist v `docs/launch-qa-changelog.md` nebo interní seznam).
2. **Env (Production)** — zkontrolovat všechny proměnné z `.env.example` relevantní pro produkci (zejména `NEXT_PUBLIC_SITE_URL`, Supabase, Resend, Plausible).
3. **Supabase** — produkční projekt, RLS, že anonymní veřejné čtení blogu a API pro leady/subscribers odpovídá očekávání.
4. **Obsah** — publikované články, cover obrázky z úložiště, test jednoho leadu a jednoho subscribe na preview URL (pokud je doména jiná, upozornit v analytice).
5. **Záloha starého webu** — statický export nebo přístup k FTP/hostingu pro rychlý rollback viz `docs/rollback-playbook.md`.

## Pořadí kroků při přepnutí

1. **Nasadit** finální build na Vercel Production (nebo zvolený host).
2. **Nastavit env** na Production environment (žádné „localhost“).
3. **Ověřit** health na výroční URL Vercelu (`*.vercel.app`) — hlavní stránky, `/blog`, jeden článek, jedna kalkulačka, `/kontakt`.
4. **DNS** — přepnout A/CNAME záznamy domény na Vercel (nebo proxy) podle návodu Vercel pro danou doménu.
5. **TLS** — počkat na platný certifikát (Vercel obvykle automaticky).
6. **Finální ověření** na **produkční doméně** (ne jen preview): redirecty, formuláře, login admina.

## Vercel / hosting

- Připojit **apex + www** dle dokumentace (redirect www → apex nebo naopak — jedna kanonická varianta; sjednotit s `NEXT_PUBLIC_SITE_URL`).
- V projektu nastavit **Production Branch** a **Environment Variables** pro Production.

## Ověření redirectů

- Ručně nebo skriptem: staré URL z `next.config` → očekávaná nová cesta, **jeden skok** (308/301), ne řetězec.
- Prohlížeč + „Copy link address“ nebo `curl -sI https://domena.cz/stara-cesta`.

## Ověření toků

| Oblast | Kontrola |
|--------|----------|
| Formuláře | Odeslání leadu, subscribe; záznam v DB / e-mail |
| Auth | `/login` → `/admin` po roli editor/admin; odhlášení |
| Admin | Přehled, články, leady (testovací záznam) |
| Blog | Listing, detail, OG náhled (sdílení) |
| Legal | `/cookies`, `/gdpr` dostupné |

## Odpovědnosti (šablona)

| Role | Typicky |
|------|---------|
| Vlastník domény / DNS | přepnutí záznamů, ověření TTL |
| Dev / deploy | build, env, Vercel |
| Obsah | články, kontrola CTA |
| Provoz | monitoring prvních hodin (`docs/first-24h-checklist.md`) |

## Hned po spuštění

- Odeslat **jeden testovací lead** a ověřit doručení.
- Zkontrolovat **Plausible** (zobrazení realtime) po souhlasu s cookies.
- Projít **first-24h checklist**.
