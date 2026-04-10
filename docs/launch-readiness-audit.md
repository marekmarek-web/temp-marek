# Launch readiness audit

Krátký stav před go-live (Next.js app v tomto repu jako kandidát na produkci).

## Co je připravené

- **Routing** — veřejné stránky pod `app/(site)/`, admin pod `/admin`, přihlášení `/login`, callback `/auth/callback`.
- **Legacy URL** — v `next.config.ts` jsou permanent redirecty z `*.html` a koncových `/` na kanonické cesty bez přípony (včetně doplněného `/kariera`).
- **SEO základ** — `metadataBase` přes `NEXT_PUBLIC_SITE_URL`, `robots.ts`, dynamický `sitemap.ts` (+ články z DB), canonical u článků a `pageOg` u statických stránek.
- **Bezpečnost** — security hlavičky, `noindex` na admin/login/auth, middleware pro ochranu `/admin` a session Supabase.
- **Obsah** — blog z Supabase, kalkulačky, formuláře (lead/subscribe), cookie consent + Plausible podle domény.

## Co může blokovat go-live (ověřit před DNS)

- **Env na produkci** — `NEXT_PUBLIC_SITE_URL` musí být **přesná** produkční URL (https, bez lomítka), jinak canonical/OG/sitemap budou špatně.
- **Supabase** — URL + anon key; pro server-only operace `SUPABASE_SERVICE_ROLE_KEY` kde je potřeba (viz `.env.example`).
- **Resend / e-maily** — `RESEND_API_KEY`, `LEAD_EMAIL_TO` pro doručení leadů (jinak API může vracet chybu při odeslání).
- **Migrace DB** — všechny tabulky pro blog, leady, profily, subscribers podle projektových migrací.
- **Obsahová parita** — články a služby oproti legacy: ruční kontrola seznamu URL (starý web mohl mít jiné cesty k článkům).

## Kritická rizika

| Riziko | Důsledek |
|--------|----------|
| Špatná nebo chybějící `NEXT_PUBLIC_SITE_URL` | Špatné canonical, sdílení, sitemap |
| Supabase / auth vypnuté | Admin a blog nedostupné |
| E-mail leadů nenakonfigurovaný | Ztráta poptávek při spoléhání na mail |
| DNS řeší ještě starý hosting | Uživatelé nevidí nový web |

## Co tento běh finalizuje

- Dokumentace: cutover, redirecty, rollback, prvních 24 h, QA changelog.
- Doplněné redirecty pro `/kariera` (index.html a trailing slash) pro konzistenci s ostatními legacy cestami.

## Nice-to-have po launchi

- Rozšířené redirecty pro jednotlivé články, pokud měly legacy tvar `/blog/… .html` (ověřit exportem z původního webu).
- A/B testy, další analytika, dashboardy — mimo scope go-live.
