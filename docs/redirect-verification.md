# Redirect a route verification

Mapování legacy vzorců → nová aplikace a stav ověření.

## Konfigurované redirecty (`next.config.ts`)

Permanent (308) z běžných legacy cest:

| Zdroj | Cíl |
|-------|-----|
| `/index.html` | `/` |
| `/blog/index.html`, `/blog/` | `/blog` |
| `/kontakt/index.html`, `/kontakt/` | `/kontakt` |
| `/spoluprace/index.html`, `/spoluprace/` | `/spoluprace` |
| `/kalkulacky/index.html`, `/kalkulacky/` | `/kalkulacky` |
| `/cookies/index.html`, `/cookies/` | `/cookies` |
| `/gdpr/index.html`, `/gdpr/` | `/gdpr` |
| `/hypotecnikalkulacka/index.html`, `/hypotecnikalkulacka/` | `/hypotecnikalkulacka` |
| `/investicnikalkulacka/index.html`, `/investicnikalkulacka/` | `/investicnikalkulacka` |
| `/zivotnikalkulacka/index.html`, `/zivotnikalkulacka/` | `/zivotnikalkulacka` |
| `/penzijnikalkulacka/index.html`, `/penzijnikalkulacka/` | `/penzijnikalkulacka` |
| `/kariera/index.html`, `/kariera/` | `/kariera` |
| `/kariera/index.html`, `/kariera/` | `/kariera` |

## Veřejné routy v aplikaci (ekvivalent „má stránku“)

- `/`, `/blog`, `/blog/[slug]`, `/kontakt`, `/kalkulacky`, `/spoluprace`, `/kariera`
- Kalkulačky: `/hypotecnikalkulacka`, `/investicnikalkulacka`, `/zivotnikalkulacka`, `/penzijnikalkulacka`
- Právní: `/cookies`, `/gdpr`
- `/login`, `/auth/callback` (noindex)

## Canonical a SEO

- Statické stránky: canonical přes `pageOg` / `homeMetadata` když je nastaven `NEXT_PUBLIC_SITE_URL`.
- Články: `generateMetadata` — canonical z `canonical_url` v CMS nebo z `NEXT_PUBLIC_SITE_URL` + `/blog/slug`.
- **Riziko řetězce:** např. starý web → mezistupeň → nová app — řeší se na úrovni DNS/hostingu; v Next redirectech výše je vždy **jeden skok** na finální cestu.

## Co ručně ověřit oproti legacy repu

1. **Seznam URL** z původního statického webu (sitemap, ruční export) — každá důležitá cesta má v nové app **200** nebo **redirect 301/308** na správný cíl.
2. **Články** — pokud měly tvar `/blog/clanek.html` nebo jiný prefix, **doplnit redirect** do `next.config` nebo dokumentovat výjimky.
3. **Externí odkazy** — bookmarky na `/blog/...` bez `.html` by měly fungovat přímo.

## Postup ověření (doporučení)

```bash
# Příklad: kontrola hlavičky (nahraď doménu)
curl -sI "https://PROD_DOMAIN/kontakt/" | findstr /i "HTTP location"
curl -sI "https://PROD_DOMAIN/kontakt" | findstr /i "HTTP location"
```

Očekávání: jedna odpověď 200 na kanonickou URL nebo jeden 308 na kanonickou bez koncového lomítka (dle konfigurace).

## Shrnutí

- Trailing slash a `index.html` u hlavních sekcí **jsou pokryté** v repu.
- **Doplňkové** redirecty pro konkrétní staré článkové cesty — jen po porovnání s legacy (nice-to-have v `launch-readiness-audit.md`).
