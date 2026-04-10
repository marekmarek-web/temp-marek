# Security baseline — premium-brokers

Stručný popis rozhodnutí a ochrany pro provozní nasazení.

## 1. Autentizace a administrace

- **Middleware** chrání `/admin/*` a `/login` flow; bez Supabase env je `/admin` přesměrován na `/login?error=config`.
- **Role** (`admin` / `editor`) se načítají z `profiles`; `requireEditor` / `requireAdmin` řídí serverové stránky a akce.
- **Open redirect** je blokován funkcí `safeInternalPath` (odmítá `//`, zpětná lomítka, `\`).
- **Přihlášení** nevrací surové chyby Supabase uživateli — obecné hlášky kvůli snížení informačního úniku.

## 2. Veřejná API

- **Server-side validace** přes Zod (`calculatorLeadBodySchema`, `subscriberBodySchema`).
- **Rate limiting** v paměti procesu (IP z `X-Forwarded-For` / `X-Real-Ip`): limity pro leady, odběratele a sazby kalkulačky. Na serverless více instancí = limit není globální — stále omezuje burst z jedné IP.
- **Produkční chyby validace** vrací jen `{ ok: false, error: "validation" }` bez detailů polí.
- **Honeypot** (`companyWebsite`) u leadů a odběratelů — tichý úspěch bez zpracování.
- **Časové okno** (`too_fast`) brání okamžitému spamu po otevření formuláře.
- **Velikost těla:** JSON leadů max ~512 KiB, odběratelé max ~64 KiB (ochrana proti DoS).

## 3. Uploady (kalkulačka životního pojištění)

- Max velikost souboru (stávající limit v route).
- Povolené MIME typy a kontrola přípony po sanitizaci názvu souboru.
- Název bez path traversal a řídicích znaků.

## 4. HTTP hlavičky (`next.config.ts`)

- Globálně: `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`.
- **Produkce:** `Strict-Transport-Security` (HSTS).
- **`/admin/*`, `/login`:** `X-Robots-Tag: noindex`, `Cache-Control: private, no-store` (kde nastaveno).
- **`/auth/*`:** `noindex`.

## 5. Privacy / data

- **Plausible** měření jen po souhlasu (`lib/consent/storage`, `lib/analytics/track`).
- **Metadata** leadů omezena na max 25 klíčů.
- **E-mailové notifikace** obsahují obchodně nutný kontext; neukládat více, než schéma umožňuje.

## 6. Basic level / co je záměrně neřešeno

- **CSP** není striktně nastaveno — vyžaduje audit inline scriptů a třetích stran.
- **Globální rate limit** vyžaduje sdílený store (Redis, KV).
- **Právní závazek** retention — viz [data-retention-notes.md](./data-retention-notes.md), ne právní poradenství.

## 7. Co hlídat při další práci

- Nové veřejné `route.ts` musí mít validaci, rate limit nebo důvod proč ne.
- Přidání nových polí do formulářů = aktualizovat Zod + minimální sběr dat.
- Při změně auth redirectů vždy `safeInternalPath`.
- Při nasazení za novým proxy ověřit správné předávání `X-Forwarded-For` pro rate limit.

## Known limitations

- In-memory rate limit se resetuje při deployi a není sdílen mezi instancemi.
- Bezpečnostní hlavičky na statických assetech sdílí globální pravidla; specifické výjimky řešte cílenými `source` v `headers()`.
