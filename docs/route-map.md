# Route map — legacy URL → Next.js

| Legacy (relativní k doméně) | Target | Stav | Poznámka |
|-----------------------------|--------|------|----------|
| `/` | `/` | migrated | Kanonická úvodní stránka |
| `/index.html` | `/` | redirected | 308 → `/` |
| `/#sluzby` | `/#sluzby` | migrated | Stejná kotva |
| `/#proc-ja` | `/#proc-ja` | migrated | |
| `/#muj-postup` | `/#muj-postup` | merged | Kotva uvnitř sekce `#spoluprace` (stejný obsah „Můj postup“) |
| `/#spoluprace` | `/#spoluprace` | migrated | |
| `/#lead-form` | `/#lead-form` | merged | Stejná sekce jako `#kontakt` (lead formulář) |
| `/#kontakt` | `/#kontakt` | migrated | |
| `/#pobocky` | `/#pobocky` | migrated | |
| `/blog` | `/blog` | migrated | |
| `/blog/` | `/blog` | redirected | |
| `/blog/index.html` | `/blog` | redirected | |
| `/kontakt` | `/kontakt` | migrated | |
| `/kontakt/` … | `/kontakt` | redirected | |
| `/spoluprace` | `/spoluprace` | migrated | |
| `/kalkulacky` | `/kalkulacky` | migrated | |
| `/hypotecnikalkulacka` | `/hypotecnikalkulacka` | migrated | |
| `/investicnikalkulacka` | `/investicnikalkulacka` | migrated | |
| `/zivotnikalkulacka` | `/zivotnikalkulacka` | migrated | |
| `/penzijnikalkulacka` | `/penzijnikalkulacka` | migrated | |
| `/cookies` | `/cookies` | migrated | |
| `/gdpr` | `/gdpr` | migrated | Legacy často odkazoval na externí BEplan; na webu zůstává `/gdpr` + odkaz partnera |
| `/kariera` | `/kariera` | new | V původním statickém stromu legacy **nebylo** |

## Blog články

- Legacy **neměl** jednotlivé články ve statickém exportu — žádné pevné `/blog/clanek.html`.
- Nové články: `/blog/[slug]` — kanonické URL generuje metadata z `NEXT_PUBLIC_SITE_URL` + `canonical_url` v DB (volitelně).

## Redirect implementace

Soubor `next.config.ts` — funkce `redirects()` (permanent: true = 308). Neřeší hash (`#…`) — ty zůstávají na klientovi po načtení `/`.

## Canonical

- Globální metadata v `app/layout.tsx` + `lib/seo/page-meta.ts`.
- Články: `generateMetadata` v `app/(site)/blog/[slug]/page.tsx` nastaví `alternates.canonical` z `canonical_url` nebo z base URL.
