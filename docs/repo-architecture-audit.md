# Repo architecture audit (cleanup běh)

## Chaos ve struktuře

- **Duplicitní zobrazení cest** (Windows `components\` vs `components/`) — jeden soubor, dvojí zápis v nástrojích; v Gitu jedna cesta.
- **`lib/forms/leadSubmit.ts`** — názov sliboval FormSubmit, ve skutečnosti jen `pageUrl`; zbytek byl mrtvý kód po přechodu na `/api/leads`.
- **Kořen `migration/`** — inventura HTML portu vedle živé aplikace; matoucí oproti `supabase/migrations`.

## Duplicity komponent

- Žádné dvě různé kopie stejné komponenty; pouze opakující se **Tailwind** vzory (karty) — sjednocení přes dokumentaci + případně jeden helper později.

## Nekonzistentní názvy

- **`calculatorLeadSchema`** — pojmenování historické; schema je jednotné pro všechny leadové formuláře (nejen kalkulačky). Přejmenování souboru by rozbilo importy — zdokumentováno v naming conventions.
- **`postLeadApi` / `postSubscriberApi`** — sdílená logika odpovědi nyní v `lib/forms/public-json.ts`.

## Migrační zbytky

- **Kořenové HTML složky** (`zivotnikalkulacka/index.html`, …) — archiv referencí; Next je neimportuje. Kandidát na archivaci mimo repo / zip, **ne** smazáno v tomto běhu.
- **`migration/`** — přesunuto do `docs/migration-legacy/`.

## Dead code

- Odstraněno: `submitToFormSubmit`, `buildMainLeadPayload`, `buildContactPagePayload`, `FORMSUBMIT_AJAX` z bývalého `leadSubmit.ts` (nepoužívané).

## Co tento běh čistí

- Přejmenování odpovědnosti: `lib/forms/page-url.ts`, sdílené JSON helpery.
- Konsolidace migrace do `docs/migration-legacy/`.
- Typové re-exporty `lib/types/public.ts`.
- Dokumentace struktury a naming.

## Mimo scope (vědomě)

- Přejmenování `calculatorLeadSchema.ts` → rozšířené refaktory importů.
- Mazání celých legacy HTML stromů.
- Velký design systém (Button/Card komponenty).
