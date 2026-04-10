# Operations playbook — Marek & asistentka

## Lead vs subscriber

- **Lead** = konkrétní poptávka (hovor, konzultace, kalkulačka). Řeší se v **Leady** (`/admin/leads`).
- **Subscriber** = souhlas s **marketingovým** zasíláním novinek. Řeší se v **Odběratelé** (`/admin/subscribers`). Neslučujte oba účely v jednom právním významu.

## Odkud leady chodí

Kalkulačky, patička, homepage konzultace, kontakt — viz `docs/lead-workflow.md`.

## Odkud subscribery chodí

Blog (výpis + článek), patička. Odkaz z úspěšného odeslání kalkulačky vede na **patičku** → přihlášení k novinkám (odděleně od leadu).

## Lead — stavy a fronta

- Pipeline stavů: `new` → … → uzavřeno (viz `lead-workflow.md`).
- **Fronta follow-up**: checkbox „Fronta follow-up“ u leadu + filtr ve výpisu + odkaz z dashboardu.

## Články — distribuce

V editoru článku (sekce pod obsahem):

- **Stav distribuce**: `none` (nesledováno), `awaiting_distribution`, `distributed`, `needs_followup`.
- **Datum propagace** — kdy byl článek nasdílen (LinkedIn, newsletter, …).
- **Newsletter ready** — obsahově připraveno do budoucího newsletteru.

Dashboard ukazuje počet **čekajících na distribuci** a odkazy na úpravu.

## Co čeká na akci — rychlé odkazy

- `/admin` — přehled (leady 7 dní, subscribery 7 dní, distribuce).
- `/admin/leads?queue=1` — fronta follow-up.
- `/admin/posts` — články + štítky distribuce.

## Jak připravit budoucí newsletter / nástroj

1. Segmentovat podle `interest_segment` a `status = active`.
2. Export CSV z adminu.
3. Napojit poskytovatele (Brevo, Mailchimp, …) přes import nebo API — data nejsou v dead-end formátu.
4. `lib/email/distribution.ts` — místo pro budoucí rozšíření.

## Co je implementované vs. „ready vrstva“

| Implementováno | Ready / příští krok |
|----------------|---------------------|
| DB + admin + export | Automatické rozesílky |
| Souhlas + verze textu | Double opt-in (`pending`) |
| Distribuční stavy u článků | Napojení na sociální / newsletter API |
| Follow-up flag u leadů | Připomínky / úkoly (lehký task systém) |

---

Podrobněji o subscriberech: `docs/subscriber-workflow.md`. O leadech: `docs/lead-workflow.md`.
