# Content migration playbook

Stručný návod pro další migraci obsahu a pro práci asistentky / editora v adminu.

## 1. Nový text na stránce (mimo blog)

- **Úvod:** sekce v `components/home/**` a `app/(site)/page.tsx`.
- **Samostatné stránky:** `app/(site)/<route>/page.tsx` (např. kontakt, spolupráce).
- **Globální texty v patičce:** Supabase `site_settings` (klíče `footer_tagline`, `home_blog_intro`) — viz `lib/site-settings.ts`.
- **Kontakt, pobočky, navigace:** `config/site.ts` — jeden zdroj pravdy.

## 2. Blog: založení článku v adminu

1. Přihlášení → `/admin` → **Nový článek**.
2. **Slug:** jen malá písmena, čísla, pomlčky (`muj-prispevek`). Po publikování měňte jen s opatrností (staré URL přestanou platit).
3. **Nadpis, perex (excerpt), tělo** — Markdown v poli těla (preview v editoru).
4. **Cover:** nahrát soubor (Supabase Storage `blog-covers`) nebo vložit absolutní URL / cestu `/img/...` pro obrázky z `public/`.
5. **SEO:** `seo_title`, `seo_description` — pokud prázdné, použijí se title/excerpt.
6. **Publikace:** tlačítko Publikovat nastaví `published_at` (pokud chybí).
7. **Koncept:** uložit jako koncept — článek neuvidí veřejnost na `/blog`.

## 3. Hromadný import seed článků

1. Upravit nebo doplnit soubory v `content/blog-seed/posts/*.md` a záznamy v `content/blog-seed/manifest.json`.
2. Nastavit prostředí: `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (pouze bezpečné prostředí).
3. Spustit: `pnpm import-blog-seed`
4. Skript **přeskočí** slug, který už v tabulce `posts` existuje.

## 4. Obrázky

- Veřejné statické: `public/img/...` → v článku odkaz `/img/...`.
- Nahrané v adminu: veřejná URL z Supabase Storage.
- Legacy blog placeholdery `blog-1.jpg` … `blog-3.jpg` jsou v `public/img/blog/`.

## 5. Slug normalizace

- Formát: `^[a-z0-9]+(?:-[a-z0-9]+)*$` (validace v `savePostAction`).
- Doporučení: ASCII, bez diakritiky, krátké a stabilní.

## 6. Draft / publish flow

- **Koncept:** `published = false` — článek se neobjeví na `/blog` ani na homepage.
- **Publikovat:** v editoru akce publish — doplní se datum publikování.

## 7. Co je automatické vs. manuální

| Automaticky (skript / kód) | Manuálně |
|----------------------------|----------|
| Redirecty z `*/index.html` | Právní review s právníkem |
| Import seed přes `import-blog-seed` | Úprava copy po importu |
| Reading time při importu (odhad) | Finální autorství, datumy „do života“ |
| SEO fallback z title/excerpt | Kanonické URL u syndikovaného obsahu |

## 8. Související soubory

- `config/site.ts`, `config/legal.ts`
- `app/admin/posts/**`, `components/admin/PostEditor.tsx`
- `lib/posts.ts`, `scripts/import-blog-seed.mjs`
