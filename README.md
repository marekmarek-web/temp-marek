# Marek Příbramský – Premium Brokers

Osobní web finančního poradce. **Hlavní vývoj probíhá v Next.js (App Router, TypeScript).** Původní statické HTML v repozitáři zůstává jako reference během migrace.

## Next.js (doporučeno)

```bash
npm install
cp .env.example .env.local   # doplňte NEXT_PUBLIC_SITE_URL pro produkci
npm run dev                  # http://localhost:3000
npm run build && npm start
npm run test                 # Vitest – golden testy kalkulaček
```

- Aplikace: `app/`, sdílené komponenty: `components/`, konfigurace navigace: `config/site.ts`, výpočty: `lib/calculators/`, obrázky: `public/img/`.
- Formuláře používají stejný FormSubmit endpoint jako legacy (`lib/forms/leadSubmit.ts`).

## Legacy statický web (HTML)

- `index.html`, podsložky `blog/`, `kontakt/`, kalkulačky atd., `assets/`
- CSS pro legacy: `npm run build:legacy-css` (config `tailwind.legacy.config.js`)

## Struktura (legacy)

- `assets/js/` – main.js, anim.js, …
- `assets/img/` – kopie také v `public/img/` pro Next

## Git a nasazení

- Pro Next doporučeno **Vercel** nebo jiný Node hosting; pro čistý statický export lze později zvolit `output: 'export'`.
- GitHub Pages dříve servírovaly root HTML – po přechodu na Next změňte zdroj nasazení.
