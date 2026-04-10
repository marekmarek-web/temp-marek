# Changelog — obsahový a konverzní polish (tento běh)

## Upravené sekce a texty

### Homepage

- **Hero**: nový podnadpis — segment (rodiny/firmy), přístup (srozumitelně, bez tlaku), výsledek (sjednocení cílů a rizik).  
- **Můj postup**: upřesněný popis kroků; CTA přes `config/cta`.  
- **Investiční blok**: nadpis bez „clickbait“ tónu; propojení s norským fondem jako inspirace, ne jako „bohatí“.  
- **Pro koho / služby / reference / moje cesta**: silnější trust věty (Google recenze, kontext týmu, ne anonymní lead).  
- **Sekce kontakt na HP**: nadpis + odstavec o osobní odpovědi a absenci tlaku na podpis hned.

### Navigace a CTA slovník

- **config/cta.ts** — sdílené texty pro header, formuláře, blog, kalkulačky.  
- **config/site.ts**: navigace — `Spolupráce` → `#spoluprace`, přidán **Kontakt** → `#kontakt` (logický tok: proces → kontakt).  
- **SiteHeader**: primární CTA „Domluvit konzultaci“.

### Data / služby / persony

- **home-data.ts**: sjednocené CTA u služeb (nástroj vs. konzultace); persony — konkrétnější CTA věty.

### Formuláře a modaly

- **LeadConsultationForm**: témata bez emoji, jasnější kroky, success + telefon pro spěchající, tlačítko „Odeslat a domluvit krátký hovor“.  
- **CalculatorLeadModal**: tlačítko a success copy s očekáváním odezvy a připomínkou orientačního výpočtu.  
- **ContactPageForm**, **FooterLeadForm**, **SiteFooter**: lidské labely a patičkový blok.  
- **Kalkulačkové modaly** (investice, hypotéka, život, penze): titulky a podtitulky blíž konzultaci než „poptávka“.

### Blog

- **ArticleEndCta**: nový komponent — primary + secondary CTA po článku.  
- **Blog listing**: metadata + spodní CTA; úvodní text z `site_settings` má nový výchozí fallback v `lib/site-settings.ts`.  
- **HomeBlogSection**: „Všechny články“ + sekundární odkaz na kontakt.

### Stránky

- **Kalkulačky**, **Kontakt**: silnější obchodní návaznost a očekávání odezvy.

## Co vylepšit obchodně

- Jasnější **value proposition** v hero a meta popisu.  
- **Méně generických CTA** a konzistentní hierarchie (konzultace / nástroje / čtení).  
- **Více důvěry** — proces, osobní odpověď, Google reference, vysvětlení orientačních výpočtů.

## Ruční doladění později

- Timeline „Moje cesta“ — další kolo „proč klient“ u starších milníků.  
- A/B test délky hero podnadpisu.  
- Obsahové SEO pro blog — samostatný plán.

## Doporučený další copy pass

- Dedikovaný review **FAQ** (už dobré, ale sjednotit osobu „já“ vs „my“ podle značky).  
- Krátké **case study** (anonymizované) místo jen hvězdiček — pokud budou podklady.
