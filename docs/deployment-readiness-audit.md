# Deployment readiness audit

## Co je připravené

- **Build:** `pnpm build` projde; statické generování, middleware, API routes.
- **Vercel:** Next.js 15 App Router, standardní Node runtime; `next.config` obsahuje redirecty, security headers, `images.remotePatterns` pro Supabase.
- **Env:** `lib/env/public.ts`, `lib/env/server.ts` + `instrumentation.ts` (validace při startu, bez pádu buildu).
- **Observability:** Sentry (`sentry.*.config.ts`, `instrumentation.ts`, `lib/observability.ts`), error boundaries (`app/global-error.tsx`, `app/(site)/error.tsx`).
- **Analytics:** Plausible po souhlasu (`lib/analytics/track.ts`, `ConsentProvider`), centrální názvy událostí.
- **Consent:** Cookie banner, odkaz na reset na `/cookies`.
- **Bezpečnost:** Základní security headers, rate limit na `POST /api/leads`, zod validace, honeypot v lead flow, admin chráněn middleware + Supabase.

## Povinné / doporučené env (produkce)

| Proměnná | Kde | Poznámka |
|----------|-----|----------|
| `NEXT_PUBLIC_SITE_URL` | Vercel | Produkční URL s `https://` |
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Vercel | Blog + přihlášení |
| `SUPABASE_SERVICE_ROLE_KEY` | Vercel (server only) | Nábor, uploady |
| `RESEND_API_KEY`, `LEAD_EMAIL_TO`, `RESEND_FROM` | Vercel | Leady |
| `NEXT_PUBLIC_SENTRY_DSN` | Vercel | Volitelné; chyby bez DSN → console |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Vercel | Volitelné; měření jen po souhlasu |

## Rizika

- **Rate limit** `POST /api/leads` je in-memory v instanci — na serverless více instancí = limit „na instanci“, ne globálně.
- **Resend bez klíče:** API vrací `503` / `email_not_configured` — očekávané chování.
- **Supabase bez env:** admin/blog se vypnout bezpečně; middleware přesměruje `/admin` na login s `error=config`.
- **Sentry:** webpack varování z transitive OpenTelemetry (známé Sentry SDK); build OK.

## Tento běh (provedeno)

- Konsolidace env, `.env.example`, dokumentace deploy/smoke/troubleshooting.
- Sentry + observability wrapper, error boundaries.
- Analytics + consent + security headers.
- README aktualizace.

## Future enhancement

- Globální rate limit (Redis / Vercel KV) pro lead API.
- `instrumentation-client.ts` (Next 16+) místo `sentry.client.config.ts` při upgrade.
- E2E (Playwright) místo ručního smoke checklistu.
- CSP hlavičky po otestování všech skriptů.
