# Changelog — security & privacy hardening (2026-04-10)

## Co bylo zabezpečeno

- **Redirecty:** `safeInternalPath` v `middleware.ts`, `app/auth/callback/route.ts` a `LoginForm` (klient) — snížení rizika open redirectu včetně `window.location` po přihlášení.
- **Veřejná API:** sdílený rate limiter (`lib/security/rateLimitInMemory.ts`), `Retry-After` u 429, produkční odpovědi bez Zod `issues`, limity velikosti JSON těla, `Cache-Control: no-store` u odpovědí s osobními údaji.
- **Leady:** přísnější kontrola příloh (`sanitizeUploadFilename`, `isAllowedPublicAttachment`), max 25 klíčů v `metadata`.
- **Odběratele:** nižší limit požadavků než leady (orientační), menší max JSON.
- **GET `/api/calculators/rates`:** rate limit proti lehkému abuse.
- **Admin CSV export:** v produkci obecná chyba místo `error.message` z Supabase; `Cache-Control: no-store` na exportu.
- **Přihlášení:** obecné uživatelské hlášky místo interních chyb Supabase.
- **HTTP:** HSTS v produkci, `X-Robots-Tag` + `private, no-store` pro admin a login, `noindex` metadata v `app/admin/layout.tsx`.

## Jaká rizika se snížila

- Open redirect z query parametrů.
- Informační únik přes validační odpovědi a chybové hlášky přihlášení / exportu.
- Spam a brute-force „na jednoduchém HTTP“ (částečně, viz níže).
- Nebezpečné názvy a typy souborů u příloh.

## Known limitations

- Rate limiting je v paměti jedné instance — ne globální.
- CSP není implementováno.
- Právní nárok na retention a mazání vyžaduje proces mimo tento kód.

## Doporučené další kroky

1. Sdílený rate limit (Redis / Upstash) pro produkci.
2. CSP s nonces.
3. Automatizovaná retention / anonymizace podle schválené politiky.
4. Audit Supabase RLS politik (průběžně s vývojem).

Související dokumentace: [security-baseline.md](./security-baseline.md), [data-retention-notes.md](./data-retention-notes.md), [security-privacy-audit.md](./security-privacy-audit.md).
