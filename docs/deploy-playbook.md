# Deploy playbook (Vercel)

## 1. Před nasazením

1. Ověřit `pnpm build` lokálně s produkčními env (nebo alespoň s `NEXT_PUBLIC_*`).
2. V projektu na [Vercel](https://vercel.com) připojit Git repozitář `temp-marek` / odpovídající fork.
3. **Environment Variables** (Settings → Environment Variables) zkopírovat vše z `.env.example` a doplnit hodnoty.

### Production vs Preview

- **Production:** nastavit `NEXT_PUBLIC_SITE_URL` na produkční doménu (např. `https://www.marekpribramsky.cz`).
- **Preview:** `NEXT_PUBLIC_SITE_URL` může zůstat výchozí Vercel URL nebo `VERCEL_URL` (Next často používá `metadataBase` z `NEXT_PUBLIC_SITE_URL` — pro preview nastavte explicitně preview URL pokud je potřeba správné OG).

## 2. Build

- Framework: **Next.js** (auto-detect).
- Install: `pnpm install` (Vercel zvolí pnpm podle `packageManager` v lockfile).
- Build command: `pnpm build` (default).
- Output: default.

## 3. Po deployi (preview)

1. Otevřít přidělenou Vercel URL.
2. Projít [post-deploy-smoke-tests.md](./post-deploy-smoke-tests.md) (krátká verze).

## 4. Po deployi (production)

1. Přiřadit doménu (DNS).
2. Znovu zkontrolovat `NEXT_PUBLIC_SITE_URL` = `https://…` bez koncového `/`.
3. **Resend:** ověřená doména odesílatele (`RESEND_FROM`).
4. **Supabase:** URL redirect pro auth obsahuje produkční doménu (`/auth/callback`).
5. Plausible: přidat produkční doménu v Plausible dashboardu.
6. Sentry: ověřit přijímání chyb (test exception v preview).

## 5. Rollback

- Vercel → Deployments → předchozí deployment → **Promote to Production**.

## 6. Troubleshooting

Viz [operations-troubleshooting.md](./operations-troubleshooting.md).
