# Rollback playbook

Lehký plán návratu ke stabilnímu stavu, pokud go-live selže kriticky.

## Kdy rollback zvážit

- Hromadná nedostupnost webu (5xx), rozbité přihlášení, úplná ztráta odesílání poptávek.
- Závažná chyba v zobrazení cen/kalkulaček vedoucí k právnímu riziku.
- **Ne** pro drobný vizuální bug nebo jeden nefunkční odkaz — to řešit hotfixem.

## Signály kritické selhání

| Signál | Akce |
|--------|------|
| Error rate v monitoringu (Sentry) skok | Zjistit rozsah |
| Lead API končí 5xx | Ověřit env + Supabase |
| DNS neukazuje na správný target | DNS vs deployment |
| Celý web 404 | Nesoulad projektu a domény na Vercelu |

## Návrat ke starému webu (typický scénář)

1. **DNS** — vrátit A/CNAME záznamy na předchozí hosting (nebo vypnout proxy na nový).
2. **Ověřit** — že starý web stále běží (záložní nasazení).
3. **Komunikovat** — interně / stakeholderům, že provoz je na legacy.
4. **Nový web** — nechat na Vercelu v „paused“ nebo opravit chybu na preview / jiné doméně.

> Poznámka: Pokud starý web byl čistě statické soubory, stačí znovu nasadit balíček z archivu na původní server.

## Co logovat při incidentu

- Čas začátku, kdo přepnul DNS, odkud na odkud.
- Request ID / Sentry issue URL.
- Verze deploye (Git commit hash na Vercelu).

## Malý fix vs rollback

| Situace | Postup |
|---------|--------|
| Překlep v textu, jedna stránka | Deploy fix z mainu, bez DNS |
| Špatný env jen na Production | Opravit env, redeploy |
| Fundamentální chyba v routingu celého webu | Rollback DNS nebo předchozí deployment na Vercelu |

## Vercel — předchozí deployment

V Dashboard → Deployments → u předchoších buildů **Promote to Production** (pokud DNS stále míří na Vercel a problém je v novém buildu, ne v DNS).

## Po rollbacku

- Root cause analysis.
- Oprava na větvi, retest na Preview.
- Plánovaný druhý pokus o cutover.
