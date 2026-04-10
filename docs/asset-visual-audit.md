# Asset & visual audit (stručně)

## Typy assetů na webu

- **Hero (HP)**: `hero3.jpg` — portrét / kancelář; existuje i `heromobile.jpg` (zatím nevyužitý v Next).
- **Timeline „Moje cesta“**: roční portréty / akce (`2013.jpg` … `2026.jpg`) — různé poměry, oříznutí řešeno přes `object-position`.
- **Pobočky (bento)**: městské fotky (`rce.jpg`, `praha.jpg`, …).
- **Blog**: cover z Supabase storage + lokální seed v `public/img/blog/*`.
- **Kalkulačky**: vodoznak logo v `CalculatorMarketingHero`; penze má fullscreen `penzijni.jpg`.
- **Loga**: `pb-logo-no-bg.png` (header), grey variant (footer), bankovní PNG v `public/img/*` (legacy / reference).
- **CSS pozadí** (`styles.css`): `hero3.jpg`, `schuzka.jpg`, `graph.jpg`, `sitting.png` — duplicita s Next `Image` u lead sekce.

## Problémy (crop / kvalita / konzistence)

- **Hero**: jeden globální `object-position` řetěz — na úzkém displeji může být jiná kompozice než na širokém; bez centralizovaného configu se špatně ladí.
- **Timeline**: stejný aspect box `16/10` pro všechny roky — některé fotky jsou spíš portrét, jiné skupina; vyžaduje per-foto `object-position` (už částečně je).
- **Blog cover**: prázdný `alt` u článku; při chybějícím coveru jen šedý box — málo „brand“.
- **Pension hero**: `object-cover` bez focal pointu; `alt=""` bez role — dekorativní OK, ale crop šlo zpřesnit.
- **Google badge v kalkulačkách**: externí `img` z Wikimedia — další zdroj, jiný styl než inline SVG u recenzí na HP.
- **Next/Image**: někde chybí `sizes` (bento), někde by šlo sladit `quality`.

## Co tento běh řeší

- Centralizace **hero** a **blog cover** pravidel (`lib/media/*`).
- **Jemnější crop** hero, timeline, penzijní hero; **sjednocený** Google mark (SVG).
- **Blog**: placeholder při chybějícím coveru; **alt u detailu článku** = titulek.
- **Performance**: `sizes`, `quality`, konzistentní lazy vs priority.

## Co necháváme na profesionální foto / brand refresh

- Jednotná **fotografická styl** (světlo, pozadí) napříč timeline.
- **Nový hero set** (mobile/desktop art direction) od fotografa.
- **Bankovní loga**: sjednotit výšku / monochrome sada, pokud se mají znovu použít.
