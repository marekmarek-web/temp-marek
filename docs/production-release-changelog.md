# Production release — changelog (deployment & ops běh)

## Co bylo zpevněno

- **Env contract:** `lib/env/public.ts`, `lib/env/server.ts`, validace při startu (`instrumentation.ts` + `lib/env/validate.ts`), rozšířený `.env.example`.
- **Observability:** `@sentry/nextjs` + `@sentry/core`, `sentry.client|server|edge.config.ts`, `lib/observability.ts` pro API chyby, `app/global-error.tsx` a `app/(site)/error.tsx` s dynamickým Sentry importem.
- **Analytics:** `lib/analytics/track.ts`, `AnalyticsEvents`, `BlogViewBeacon`, integrace v headeru, lead modalu, formulářích, loginu, blogu.
- **Consent:** `ConsentProvider`, `CookieConsentBanner`, Plausible načítán až po souhlasu, reset na stránce Cookies.
- **Security:** Security headers v `next.config.ts` (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`).
- **Dokumentace:** `docs/deployment-readiness-audit.md`, `docs/deploy-playbook.md`, `docs/post-deploy-smoke-tests.md`, `docs/operations-troubleshooting.md`, aktualizovaný `README.md`.

## Nutné env pro produkci (minimum)

- `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `RESEND_API_KEY`, `LEAD_EMAIL_TO`, `RESEND_FROM` (ověřená doména)
- `SUPABASE_SERVICE_ROLE_KEY` (server)

**Doporučené:** `NEXT_PUBLIC_SENTRY_DSN`, `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`

## Known risks / follow-up

- Rate limit leadů je per-instance (serverless).
- Sentry přináší webpack varování z transitive závislostí (build projde).
- Plausible + SPA: pageviews po navigaci závisí na načteném skriptu a souhlasu.

## Testy

- `tests/env.public.test.ts` — základní parsování public env.
