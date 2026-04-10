# Changelog — repo cleanup & maintainability

## Přesunuto

- `migration/inventory.json` → `docs/migration-legacy/inventory.json`
- `migration/QA_CHECKLIST.txt` → `docs/migration-legacy/QA_CHECKLIST.txt`
- Logika `pageUrl` → `lib/forms/page-url.ts` (dříve v `leadSubmit.ts`)

## Odstraněno

- `lib/forms/leadSubmit.ts` (nahrazeno `page-url.ts` + mrtvé kódy FormSubmit helperů).
- Prázdný / zrušený kořenový `migration/` (obsah v `docs/migration-legacy/`).

## Sjednoceno

- `postLeadApi.ts` a `postSubscriberApi.ts` — společné parsování JSON přes `lib/forms/public-json.ts`.
- Dokumentace: `docs/repo-architecture-audit.md`, `docs/naming-conventions.md`, `docs/repo-structure-guide.md`.
- `content/README.md` — účel `blog-seed`.

## Typy

- `lib/types/public.ts` — re-exporty doménových typů (discoverability).

## Kandidáti na pozdější cleanup

- **Legacy HTML** v kořeni repo (`index.html`, `*.html` kalkulačky) — archivovat mimo repo nebo do `docs/legacy-html/` (nepřesunuto).
- **Přejmenování** `calculatorLeadSchema.ts` → např. `lead-capture-schema.ts` (vyžaduje masivní update importů).
- **Sdílené UI** — extrahovat opakující se třídy karet do jednoho `lib/ui` / `components/ui` konstantního souboru (až bude jasnější opakování).

## Ověření

- Po změně importů spustit `pnpm run build`.
