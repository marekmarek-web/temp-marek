# Changelog — test backbone (2026-04-10)

## Přidané testy

### Vitest (integration / unit)

- `lib/auth/roles.test.ts` — `canManageBlog`, `isAdminRole`, `isCmsStaffRole`.
- `lib/validation/calculatorLeadSchema.test.ts` — platné lead payloady, odmítnutí bez e-mailu i telefonu, honeypot pole.
- `lib/validation/subscriberSchema.test.ts` — platný odběr, zamítnutí bez souhlasu / s neplatným e-mailem.
- `lib/leads/mapPayload.test.ts` — `mapSourcePayloadToTypes`, `inferLeadCategory`, základní tvar `payloadToLeadRow`.

### Playwright (E2E)

- Smoke: načtení homepage (`#home-main`), odkaz Blog → `/blog`.
- Admin: `/admin` → redirect na `/login` s očekávanými query parametry.
- Login: stránka `/login` zobrazí nadpis Přihlášení.
- Kalkulačka: `/penzijnikalkulacka`, CTA, otevření modalu, odeslání formuláře s mockem `POST /api/leads`.
- Blog: listing; detail článku jen pokud slug vrátí 200.
- Subscribe: mock `POST /api/subscribers`, vyplnění e-mailu + souhlas, kontrola success stavu.

### Fixtury

- `tests/fixtures/leads.ts`, `tests/fixtures/subscribers.ts` — minimální validní JSON pro testy a dokumentaci tvaru.

## Pokryté flow

- Veřejná homepage a základní navigace na blog.
- Penzijní kalkulačka → CTA → lead modal → odeslání (s mockem API).
- Ochrana admin sekce redirectem na login.
- Blog listing; article detail pokud existuje publikovaný příspěvek.
- Odběr novinek na `/blog` (formulář + mock API).

## Nepokryté / záměrně odložené

- Reálný login/logout přes Supabase (credentials).
- Jemné rozlišení editor vs. admin v UI.
- Resend / skutečná DB při leadu v E2E.

## Doporučené další priority

1. E2E login s izolovaným test účtem + krátký test „přihlášený uživatel smí na `/admin`“.
2. Jedna E2E kontakt stránky (`/kontakt`) vedoucí na `/api/leads` s mockem.
3. CI job: `pnpm test && pnpm exec playwright install chromium && pnpm test:e2e:smoke` na pull requesty.
