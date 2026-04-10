# Operations & troubleshooting

## Chybí env nebo Supabase

- **Projev:** `/admin` přesměruje na `/login?error=config`; blog nebo DB volání vrací prázdná data.
- **Řešení:** Doplňte `NEXT_PUBLIC_SUPABASE_URL` a `NEXT_PUBLIC_SUPABASE_ANON_KEY` ve Vercel → Redeploy.

## Resend nefunguje / leady nechodí

- **Projev:** API odpoví `503` with `email_not_configured` nebo UI zobrazí hlášku o e-mailu.
- **Řešení:** Nastavte `RESEND_API_KEY` a ověřeného odesílatele `RESEND_FROM`. Ověřte `LEAD_EMAIL_TO`.

## Supabase upload (blog cover) selže

- **Projev:** Chyba v admin editoru při nahrávání obrázku.
- **Řešení:** `SUPABASE_SERVICE_ROLE_KEY` na serveru; bucket `blog-covers` a policy v Supabase; kontrola velikosti (max 5 MB v kódu).

## Sentry nezobrazuje chyby

- **Projev:** Chyby jen v konzoli prohlížeče / serveru.
- **Řešení:** Nastavte `NEXT_PUBLIC_SENTRY_DSN`. Bez DSN je záměrně tichý režim (jen `console`).

## Analytics (Plausible) nic nepočítá

- **Projev:** Žádné návštěvy v Plausible.
- **Řešení:** `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` musí odpovídat doméně v Plausible; uživatel musí dát souhlas v banneru; první stránka bez souhlasu neposílá skript.

## Rate limit / 429 na lead API

- **Projev:** Příliš mnoho odeslání z jedné IP v krátkém čase.
- **Řešení:** Očekávané; počkat nebo upravit limity v `app/api/leads/route.ts` (vývoj vs. produkce).

## Timeout nebo pomalý API

- **Projev:** Resend nebo síťové chyby.
- **Řešení:** Zkontrolovat status Resend; opakovat odeslání; Sentry zachytí `send_failed` na serveru.

## Obnovení souhlasu s cookies

- Uživatel: stránka **Cookies** → „Znovu zobrazit banner cookies“.
- Vývojář: smazat `pb_consent_v1` v localStorage.
