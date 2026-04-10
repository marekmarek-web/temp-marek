# Data retention — základní práce

Tento dokument není právní závazek; popisuje technický základ pro pozdější úklid a GDPR workflow.

## Principy

1. **Účel** — uchovávat jen data potřebná pro vyřízení poptávky, newsletter nebo správu obsahu.
2. **Minimální expozice** — interní poznámky v adminu pouze tam, kde přidávají hodnotu (CRM).
3. **Oddělení** — marketingový odběr je odlišný od leadu (jiná tabulka, jiný souhlas).

## Stav v modelu (Supabase)

| Entita | Relevantní pole | Poznámka |
|--------|-----------------|----------|
| `leads` | `status`, `created_at`, … | Stav workflow; „archiv“ řeší provozní praxe |
| `subscribers` | `status`, `consent_marketing_at`, `unsubscribed_at` | Připraveno na odhlášení a neaktivní stavy |
| `posts` | `published`, … | Obsah CMS |

## Doporučená pravidla (orientační)

- **Leady (kontaktní poptávky):** uchovávat po dobu obchodního zájmu, typicky 24–36 měsíců od poslední aktivity, pokud jinak nestanoví zákon nebo smlouva. Po uplynutí: anonymizace nebo smazání (rozhodnutí vlastníka).
- **Newsletter:** dokud je status `active` a platný souhlas; po odhlášení ponechat záznam s `unsubscribed` + časem pro důkaz souhlasu.
- **Logy / e-mail:** doručení přes Resend — řešit podle účtu u Resend a interní politiky.

## Admin-ready přístup

- Export CSV je dostupný editorům/adminům; používejte šifrovaný přenos a lokální úschovu.
- Pro mazání / export údajů subjektu údajů: připravte manuální postup přes Supabase (nebo budoucí admin akci) — plná automatizace není v tomto běhu.

## Co ještě doplnit později

- Cron job nebo Supabase Edge Function pro anonymizaci starých leadů.
- Formulář žádosti o výmaz / přístup (kontaktní e-mail + interní checklist).
- Propojení s právním textem v `/gdpr`.
