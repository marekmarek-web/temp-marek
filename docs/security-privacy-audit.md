# Security & privacy audit — premium-brokers

Datum: 2026-04-10

## Hlavní rizika (před / po zásahu)

| Oblast | Riziko | Mitigace v tomto běhu |
|--------|--------|------------------------|
| Open redirect (`?next=`, auth callback) | Přesměrování na externí doménu | `safeInternalPath` v middleware, callbacku a `LoginForm` |
| Veřejné API (`/api/leads`, `/api/subscribers`) | Spam, scraping, enumerace chyb | Rate limit (in-memory), produkční odpovědi bez Zod detailů, limity velikosti těla |
| Přihlášení | Únik informací z chyb Supabase | Obecné české hlášky místo `error.message` |
| Admin export CSV | Únik interních chyb DB | V produkci generická 500 zpráva |
| Přílohy leadů | Špatný MIME, nebezpečné názvy | `sanitizeUploadFilename`, `isAllowedPublicAttachment` |
| Veřejný GET `/api/calculators/rates` | Abuse / scrape | Rate limit (~90 req / min / IP na instanci) |
| Metadata u leadů | Přehnaný objekt | Max 25 klíčů ve schématu |

## Veřejné vstupní body

- `POST /api/leads` (JSON, multipart s přílohou)
- `POST /api/subscribers`
- `GET /api/calculators/rates`
- `GET /auth/callback` (OAuth / magic link)
- Stránka `/login` (klient → Supabase Auth)

## Kde se pracuje s osobními údaji

- Leady: jméno, e-mail, telefon, poznámka, shrnutí kalkulačky, metadata, příloha.
- Odběratelé: e-mail, jméno (volitelně), souhlas, zdroj, segment.
- Admin: profily uživatelů, CSV exporty leadů a odběratelů.

## Co chybělo / slabé body

- Jednotný rate limiter (duplicitní Map v kódu) → sjednoceno v `lib/security/rateLimitInMemory.ts`.
- Globální limit na serverless není garantovaný (více instancí) — známé omezení.
- CSP (Content-Security-Policy) striktně nezavedeno — riziko rozbití UI/Plausible; viz [security-baseline.md](./security-baseline.md).

## Co tento běh implementuje

- Bezpečné redirecty, přísnější veřejná API, validace uploadů, hlavičky pro admin/login/auth, HSTS v produkci, metadata admin layoutu `noindex`.
- Dokumentace: retention, security baseline, tento audit.

## Future enhancement

- Redis / edge rate limiting pro skutečně globální limity.
- CSP s nonces a audit scriptů třetích stran.
- WAF / Bot Management u CDN.
- Automatizované mazání podle retention (cron + právní sign-off).
- DPIA / právní review pro zpracování údajů.
