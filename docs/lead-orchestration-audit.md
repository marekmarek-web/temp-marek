# Lead orchestration — audit (akční)

## Odkud dnes přicházejí leady

| Vstup | Komponenta | `source` (payload) | Poznámka |
|-------|------------|-------------------|----------|
| Kalkulačky (4×) | `CalculatorLeadModal` + modaly | `calculator` | FormData nebo JSON + `calculatorType` |
| Patička | `FooterLeadForm` | `footer_quick` | JSON |
| Homepage CTA | `LeadConsultationForm` | `homepage_consultation` | JSON |
| Kontakt `/kontakt` | `ContactPageForm` | `contact_page` | JSON přes `/api/leads` (dříve FormSubmit) |
| Článek (budoucí CTA) | — | `article_cta` | Připraveno ve schématu + mapování na `source_type` **article** |

## Formuláře a CTA

- Sdílená validace: `lib/validation/calculatorLeadSchema.ts` (`calculatorLeadBodySchema`).
- Odeslání: `lib/forms/postLeadApi.ts` → `POST /api/leads`.
- Anti-spam: honeypot `companyWebsite`, `formOpenedAt` (min. čas), rate limit na API.

## Payload (jednotný model)

Pole: `source`, `name`, `email` / `phone` (alespoň jedno), volitelně `note`, `sourcePath`, `resultSummary`, `calculatorType`, `lifeIntent`, `metadata`, `topic`, `interest`, `consent`, `companyWebsite`, `formOpenedAt`.

## Nekonzistence (řešeno / výjimky)

- **Kontakt** dříve mimo jednotný tok → sjednoceno na `/api/leads`.
- **Články**: zatím bez vlastního formuláře; enum `article_cta` je připraven pro budoucí CTA pod článkem.

## Co se děje po submitu

1. Validace na serveru (`calculatorLeadBodySchema`).
2. **Insert** do `public.leads` (service role), včetně deduplikace (24 h, e-mail / normalizovaný telefon).
3. **E-mail** (Resend) s odkazem do adminu `/admin/leads/{id}`.
4. Odpověď `{ ok: true, leadId }` pro UI.

## Co tento běh sjednotil

- Jednotný **domain model** + mapování `lib/leads/*`.
- **DB + RLS** (staff čte/upravuje; veřejnost nečte leady).
- **Admin inbox** (`/admin/leads`), stav, interní poznámky, přiřazení, lehká historie stavu.
- **CSV export** (`/api/admin/leads/export`).

## Mimo scope (záměrně)

- Plnohodnotné CRM, workflow třetích stran, scoring, SMS sekvence, HubSpot/Salesforce.
