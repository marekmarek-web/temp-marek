# Post-deploy smoke tests

Praktický checklist po nasazení (preview i production). Zaškrtávejte po ověření.

## Kritické

- [ ] Úvodní stránka se načte bez 500, bez nekonečného loaderu.
- [ ] Hlavní navigace, scroll na kotvy (`#sluzby`, `#kontakt`).
- [ ] Cookie banner se zobrazí (první návštěva / po smazání `localStorage` klíče `pb_consent_v1`).
- [ ] Po „Souhlasím s měřením“ se načte Plausible (síťový request na `plausible.io/js/script.js` — pokud je `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`).

## Kalkulačky a leady

- [ ] Jedna kalkulačka (např. Hypotéka) — výpočet, otevření lead modalu, odeslání (nebo očekávaná chyba při chybějícím Resend).
- [ ] Při nastaveném Resend dorazí e-mail na `LEAD_EMAIL_TO`.
- [ ] Footer „Rychlá zpráva“ odeslání (stejný API endpoint).

## Auth a admin

- [ ] `/login` — přihlášení (heslo nebo magic link).
- [ ] `/admin` — přístup po roli, přehled článků.
- [ ] `/admin/posts/new` — uložení konceptu (Supabase).

## Blog

- [ ] `/blog` listing.
- [ ] Detail článku `/blog/[slug]` — markdown, OG pokud je `NEXT_PUBLIC_SITE_URL`.

## Redirecty a SEO

- [ ] Stará cesta `/blog/index.html` → `/blog` (308).
- [ ] `/robots.txt`, `/sitemap.xml` obsahují produkční URL.

## Právní / cookies

- [ ] `/cookies`, `/gdpr` dostupné.
- [ ] Tlačítko „Znovu zobrazit banner cookies“ na `/cookies` obnoví banner.

## Mobil

- [ ] Rychlá kontrola šířky ~390px: header, banner, kalkulačka.

## Metadata

- [ ] View source nebo DevTools: `<title>`, `og:title` na homepage a článku rozumné.

## Volitelné

- [ ] Sentry: vyvolat testovací chybu na preview a ověřit event v Sentry dashboardu.

---

**Automatizace:** `pnpm test` obsahuje základní test env parsování; E2E lze doplnit později (Playwright).
