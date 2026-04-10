# Performance architektura (stručně)

## Render: server vs client

- **Veřejné stránky (App Router)** — defaultně React Server Components. Data z Supabase (`fetchPostBySlug`, `fetchPublishedPosts`, site settings) běží na serveru; HTML jde klientovi bez nutnosti hydratovat celou stránku.
- **Client komponenty** — pouze tam, kde je potřeba DOM, stav, animace, nebo prohlížečová API: kalkulačky, formuláře, header, cookie/consent, analytika, admin formuláře, GSAP na úvodní stránce.
- **Admin** — layout může zůstat serverový; `AdminNav` je client kvůli `usePathname`. **PostEditor** je načtený lazy přes `next/dynamic` ze server stránky (samostatný chunk; v RSC nelze `ssr: false`). Náhled Markdownu v editoru je lazy s `ssr: false` uvnitř client komponenty.

## Blog a cache

- **Listing** (`/blog`) a **statické části úvodu** používají `revalidate = 60` (ISR) — předvídatelná čerstvost bez chaosu; po publikaci z adminu se cesty revalidují i přes `revalidatePath` v server actions.
- **Detail článku** — `generateStaticParams` + stejné `revalidate`; plná data jen v `fetchPostBySlug` (včetně `body`).
- **Výpis článků** — `fetchPublishedPosts` vrací jen **summary sloupce** (bez `body`), aby se zbytečně nepřenášel Markdown.

## Admin data

- **Žádný veřejný CDN cache** na `/admin` — hlavičky `private, no-store` (viz `next.config`).
- Dotazy: **užší `select`** na listech (leady, odběratelé), ne `*`.
- Detail leadu a editor článku stále potřebují plné řádky — načítají se jen na příslušné route.

## Assety: obrázky a fonty

- **Obrázky** — `next/image` s `sizes` podle varianty (`BlogCoverImage` + konstanty v `lib/media/blog`).
- **Font** — `next/font` (Inter), `latin` + `latin-ext`, `display: swap`, `adjustFontFallback` pro menší CLS.

## Hlavní optimalizace (kód)

- `next.config.experimental.optimizePackageImports: ["lucide-react"]`.
- Lazy: **WealthProjectionChart**, grafy v investiční / hypotéční / životní kalkulačce, **MarkdownPreview**, **PostEditor** na post routes.

## Co hlídat při změnách

- Nepřidávat `select("*")` na velké tabulky bez důvodu.
- Nové těžké knihovny vždy přes `dynamic` nebo samostatný route segment.
- Po změně obsahu blogu v adminu spoléhat na existující `revalidatePath` / časový `revalidate` — ne míchat náhodné `cache: 'no-store'` na veřejném blogu bez dokumentace.
