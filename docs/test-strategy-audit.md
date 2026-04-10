# Test strategy audit — premium-brokers

Datum: 2026-04-10

## Co bylo pokryté před tímto během

- **Vitest** (`vitest.config.ts`): `lib/**/*.test.ts`, `tests/**/*.test.ts`, `packages/calculators-core/**/*.test.ts`.
- Existující příklady: veřejné env (`tests/env.public.test.ts`), kalkulačková logika (`lib/calculators/calculators.test.ts`, balíček `calculators-core`).
- **Žádný E2E runner** (Playwright apod.) ani dokumentace k testům.

## Co nebylo pokryté

- Kritické **user flow** (homepage → nástroje → lead modal, blog, přihlášení, ochrana `/admin`).
- **Business vrstva** kolem leadů a odběratelů (Zod validace, mapování do DB řádků, role).
- **Regresní síť** pro API kontrakty (`POST /api/leads`, `/api/subscribers`) mimo manuální klikání.

## Nejrizikovější flow

1. Odeslání leadu z kalkulaček (validace, honeypot, `too_fast`, e-mail / DB).
2. Odběr novinek (souhlas, validace e-mailu, rate limity).
3. **Middleware**: nepřihlášený přístup na `/admin`, redirect na `/login`; chybějící Supabase env → `error=config`.
4. Blog: listing a detail závislé na Supabase — v CI bez DB může být prázdné / 404.

## Zvolená strategie

- **Pyramida**: málo unit/integration testů na čistou logiku (Zod, mapování, role); **Playwright** jen na pár stabilních scénářů s **mockem API** tam, kde jinak závisíme na Resend/DB/timing (`too_fast`).
- **Žádné** honění coverage čísla — testy jen tam, kde reálně hrozí regrese v logice nebo v rozbití hlavní cesty.
- **Smoke** = podmnožina E2E označená `@smoke` pro rychlou kontrolu po deployi / v CI.

## Co implementuje tento běh

- Dokumentace: tento soubor, `docs/testing-playbook.md`, `docs/testing-changelog.md`.
- Vitest: `lib/auth/roles`, `calculatorLeadBodySchema`, `subscriberBodySchema`, `lib/leads/mapPayload`.
- Playwright: konfigurace, E2E pro homepage, navigaci, kalkulačku + lead modal (mock), blog (listing + detail podmíněně), subscribe (mock), admin redirect, login stránka.
- Fixtury: `tests/fixtures/` pro sdílené payloady.

## Co zůstává později

- E2E **skutečného přihlášení** a logout (potřeba bezpečných `E2E_*` credentials a stabilní test účet).
- E2E **rolí editor vs admin** (závisí na seed uživatele v Supabase).
- Kontrakt testy přímo proti HTTP serveru mimo UI (volitelně `supertest` / fetch na běžící instanci).
- Vizuální / snapshot testy — záměrně ne součástí tohoto běhu.

## Stav po implementaci (tento běh)

- `pnpm test` (Vitest) a `pnpm test:e2e` / `pnpm test:e2e:smoke` (Playwright) jsou připravené k lokálnímu i CI použití; postup v [testing-playbook.md](./testing-playbook.md).
