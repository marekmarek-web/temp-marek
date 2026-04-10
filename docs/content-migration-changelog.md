# Changelog — content & IA migrace (tento běh)

## Migrovaný / doplněný obsah

- **GDPR a Cookies:** přepsány do použitelné podoby bez placeholderu „doplňte“; odkazy na partnera BEplan a interní `/cookies` / `/gdpr`.
- **Kontakt:** rozšířeno o pobočky, sociální sítě a srozumitelný úvod; jeden zdroj dat z `config/site.ts`.
- **Kalkulačky — úvod:** doplněn orientační disclaimer + odkaz na kontakt.
- **Blog:** tři připravené články (Markdown) v `content/blog-seed/` odpovídající legacy obrázkům `blog-1` až `blog-3` (v legacy nebyl text článků).
- **Detail článku:** blok s CTA na konzultaci (`/kontakt`).
- **Listing blogu (prázdný):** odkaz na kontakt.

## Routy a redirecty

- V `next.config.ts` přidány redirecty z `*/index.html` a koncového `/` na kanonické cesty bez `index.html` a bez trailing slash (kromě root).

## Kontakty a právo

- Nový soubor `config/legal.ts` — regulatorní texty a odkazy; footer a formuláře odkazují konzistentně na `/gdpr` a partnera.

## Interní prolinkování

- Homepage blog sekce → tlačítko „Přejít na blog“.
- Blog empty state → kontakt.
- Článek → kontakt.

## Import utility

- `scripts/import-blog-seed.mjs` + npm script `pnpm import-blog-seed`.
- Data: `content/blog-seed/manifest.json` + `posts/*.md`.

## Ruční kontrola (doporučeno)

- Obsah článků po importu (faktická správnost, tón).
- Právní soulad GDPR stránky s interními procesy.
- `NEXT_PUBLIC_SITE_URL` v produkci pro správné canonical URL.
- Service role key nikdy do frontendu ani do gitu.

## Co zůstává k doplnění

- Publikace článků v Supabase (spustit import nebo zkopírovat z seed do adminu).
- Případné další články mimo seed — dle reálné content strategie.
- Kariéra: stránka je v targetu nová; obsah dle reálných náborových potřeb.
