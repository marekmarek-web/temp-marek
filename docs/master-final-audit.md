# Master final audit

Jedna stránka: skutečný stav target repa vůči cíli „moderní náhrada legacy + produkce“. Priorita: **P0** kritické, **P1** vysoké, **P2** backlog.

---

## 1. Parita vůči legacy

| Oblast | Stav | Poznámka |
|--------|------|------------|
| Routy / navigace | **OK** | `next.config` redirecty, sitemap, hlavní sekce úvodu odpovídají legacy flow. |
| Kalkulačky | **OK+** | Interaktivní výpočty, lead modaly, API; legacy byl statický HTML. |
| Blog | **OK** | CMS v Supabase; migrace obsahu pokryta v `content-migration-*`. |
| Kontakt / formuláře | **OK** | Server API, Resend, DB; více kanálů než čisté FormSubmit. |
| Právní stránky | **OK** | Cookies/GDPR použitelné texty. |

**Mezery:** individuální staré URL článků (`.html`) — řešit redirecty až podle exportu z legacy (`redirect-verification.md`).

---

## 2. UX / UI

| Issue | Priorita | Stav |
|-------|----------|------|
| Brand vs. lokální hex v kalkulačkách | P2 | Funkční; vizuálně téměř sjednoceno, plný pass nákladný. |
| CustomDropdown / tlačítka | **Vyřešeno** | Last-mile pass (brand). |
| Admin copy | **OK** | Usage guide + mikrocopy pass. |

---

## 3. Technické

| Oblast | Hodnocení |
|--------|-----------|
| Architektura App Router | Čistá, RSC kde dává smysl. |
| API `/api/leads`, `/api/subscribers` | Validace, rate limit, multipart — viz `security-baseline.md`. |
| Middleware | Auth + bezpečný `next` redirect. |
| Duplicitní dead code | Repo cleanup již proběhl; další hledání nízká priorita. |

---

## 4. Content / copy

| Oblast | Stav |
|--------|------|
| CTA / konverze | `config/cta`, ArticleEndCta, kalkulačky — sjednoceno v předchozích passích. |
| Subscribe success | Bez „rozpracovaného“ nástroje (last-mile). |
| Trust | Hero badges, reference sekce, patička. |

---

## 5. Admin / lead / blog

| Požadavek | Stav |
|-----------|------|
| Lead pipeline + admin inbox | **OK** při migracích 003+. |
| Blog editace | **OK** PostEditor, role. |
| Dashboard | Základní přehled — dostačující pro start. |

**Blokátor nasazení:** chybějící migrace **003–005** = neúplná data vrstva pro leady/subscribers/distribuci.

---

## 6. Performance / SEO / A11y / security / test / deploy

| Dokument | Účel |
|----------|------|
| `performance-architecture.md`, `deep-performance-audit.md` | Výkon |
| `metadata`, `sitemap`, `robots` | SEO základ |
| Skip link, focus, modaly | A11y částečně v playbooku |
| `security-baseline.md`, `security-hardening-changelog.md` | Bezpečnost |
| `testing-playbook.md`, E2E smoke | Testy |
| `deploy-playbook.md`, `cutover-plan.md` | Deploy |

---

## 7. Co tento běh opravil / doplnil

- **Dokumentace:** tento audit, aktualizace `admin-setup.md` (migrace 003–005), `release-readiness-checklist.md`, `final-production-summary.md`, `master-final-changelog.md`.
- **Kód:** `BlogMarkdown` obalen sémanticky jako `<article>` (SEO/a11y čitelnost těla článku).

---

## 8. Vědomý backlog (P2 / nice-to-have)

- Globální design tokeny místo hex v kalkulačkách.
- Rozšířené legacy redirecty pro jednotlivé články.
- Širší E2E než smoke.
- Newsletter jako produkt mimo jednoduchý zápis do DB.

---

## 9. Závěr

Projekt je **architektonicky a funkcionalitně** připraven jako náhrada legacy. **Produkční go** vyžaduje splnění env + **všech migrací 001–005** + DNS/cutover podle existujících playbooků — ne chybějící „velká feature“.
