# Finální produkční shrnutí (single source of truth)

Poslední aktualizace: master finishing pass. Detailní audit: **`docs/master-final-audit.md`**.

## Co je hotové

- Veřejný web: úvod, služby, kalkulačky, blog (Supabase), kontakt, kariéra, spolupráce, právní stránky.
- **Lead flow:** API, validace, rate limiting, ukládání, e-mail (Resend), admin inbox při migracích 003+.
- **Subscribers:** API, souhlas, admin při migraci 005.
- **Auth:** heslo + magic link, middleware, role admin/editor.
- **Admin:** přehled, články, leady, odběratelé, nastavení textů.
- **SEO:** metadata, sitemap, robots, canonical u článků.
- **Bezpečnost:** RLS, server guardy, viz `security-baseline.md`.
- **Performance:** viz `performance-architecture.md`.

## Co je produkčně připravené

- Nasazení podle **`docs/deploy-playbook.md`** a **`docs/cutover-plan.md`**.
- Env z **`.env.example`**.
- **Migrace Supabase `001`–`005`** — povinné pro plnou funkci leadů a operativy (**`docs/admin-setup.md`**).

## Release checklist

→ **`docs/release-readiness-checklist.md`**

## Future improvement (neblokuje launch jako kód)

- Legacy redirecty pro konkrétní staré články.
- Design token pass v kalkulačkách (hex → brand).
- Rozšířené E2E.

## Known non-blockers

- Verze textu souhlasu u newsletteru (`CONSENT_TEXT_VERSION`) — transparentnost vůči GDPR.
- Jednoduchý newsletter záznam bez full ESP — vědomé.

## Production-ready?

**Ano**, pokud:

1. Běží **všechny migrace** a produkční **env**.
2. Prošel **release readiness** checklist.
3. Proběhl **DNS cutover** a smoke test na produkční doméně.

Bez migrací 003–005 **nejsou** leady/operativa v plné shodě s kódem — **to je hlavní provozní blokátor**, ne chybějící feature.

## Kde hledat další dokumenty

| Téma | Soubor |
|------|--------|
| Admin | `admin-setup.md`, `admin-usage-guide.md` |
| Testy | `testing-playbook.md` |
| Bezpečnost | `security-baseline.md` |
| Deploy | `deploy-playbook.md` |
| Obsah | `content-style-guide.md`, `media-guidelines.md` |
| Leady | `lead-workflow.md`, `operations-playbook.md` |
| Rollback | `rollback-playbook.md` |

Nepřidávejte duplicitní „summary“ dokumenty — aktualizujte tento soubor nebo `master-final-audit.md`.
