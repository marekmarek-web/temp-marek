import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { LeadConsultationForm } from "@/components/forms/LeadConsultationForm";
import { HomeBlogSection, HomeBlogSectionFallback } from "@/components/home/HomeBlogSection";
import { ReviewsMarquee } from "@/components/home/ReviewsMarquee";

/** Sekce #proc-ja až #kontakt z kořenového `index.html`. */
export function HomeTailSections() {
  return (
    <>
      <section id="proc-ja" className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 relative overflow-hidden persona-section">
        <div className="persona-section-bg" aria-hidden />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-10 lg:mb-14">
            <h2 className="section-title font-bold text-brand-text mb-4">Pro koho</h2>
            <p className="text-brand-muted section-desc mx-auto text-lg leading-relaxed">
              Vyberte, kdo jste – obsah pod záložkami je napsaný přímo pro vás.
            </p>
          </div>
          <div className="persona-glass-card rounded-3xl p-6 sm:p-8 lg:p-10 relative overflow-hidden">
            <div className="persona-glass-card-inner">
              <div className="persona-tabs flex flex-wrap gap-3 sm:gap-4 mb-8 justify-center" role="tablist" aria-label="Typ klienta">
                <button
                  type="button"
                  className="persona-btn active px-4 sm:px-5 py-2.5 rounded-full text-slate-600 font-semibold text-sm sm:text-base transition-all"
                  role="tab"
                  aria-selected
                  aria-controls="persona-rodina"
                  id="tab-rodina"
                  data-persona="rodina"
                  tabIndex={0}
                >
                  Pro rodiny a jednotlivce
                </button>
                <button
                  type="button"
                  className="persona-btn px-4 sm:px-5 py-2.5 rounded-full text-slate-600 font-semibold text-sm sm:text-base transition-all"
                  role="tab"
                  aria-selected={false}
                  aria-controls="persona-podnikatel"
                  id="tab-podnikatel"
                  data-persona="podnikatel"
                  tabIndex={-1}
                >
                  Pro podnikatele
                </button>
                <button
                  type="button"
                  className="persona-btn px-4 sm:px-5 py-2.5 rounded-full text-slate-600 font-semibold text-sm sm:text-base transition-all"
                  role="tab"
                  aria-selected={false}
                  aria-controls="persona-firma"
                  id="tab-firma"
                  data-persona="firma"
                  tabIndex={-1}
                >
                  Pro firmy
                </button>
              </div>
              <div id="persona-rodina" className="persona-content active text-center max-w-2xl mx-auto py-6" role="tabpanel" aria-labelledby="tab-rodina">
                <div className="w-16 h-16 bg-brand-cyan/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-brand-navy">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-brand-text mb-4">Zajistím klid pro vaši rodinu</h3>
                <p className="text-brand-muted leading-relaxed mb-6">
                  Plán rezerv, spoření dětem, hypotéka na nové bydlení a ochrana příjmu, když se něco pokazí. Vše v jednom
                  srozumitelném plánu.
                </p>
                <Link href="/#kontakt" className="lead-cta-btn inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold no-underline">
                  Chci rodinný plán
                </Link>
              </div>
              <div id="persona-podnikatel" className="persona-content text-center max-w-2xl mx-auto py-6 hidden" role="tabpanel" aria-labelledby="tab-podnikatel">
                <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-amber-700">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-brand-text mb-4">Oddělte firemní a osobní peníze</h3>
                <p className="text-brand-muted leading-relaxed mb-6">
                  Znáte to – peníze se točí, ale osobní rezerva neroste. Nastavíme systém, jak bezpečně vyvádět peníze z
                  s.r.o. a budovat soukromé rentiérské portfolio.
                </p>
                <Link href="/#kontakt" className="lead-cta-btn inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold no-underline">
                  Chci řešení pro OSVČ / s.r.o.
                </Link>
              </div>
              <div id="persona-firma" className="persona-content text-center max-w-2xl mx-auto py-6 hidden" role="tabpanel" aria-labelledby="tab-firma">
                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-slate-700">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24" aria-hidden>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-brand-text mb-4">Optimalizace a benefity</h3>
                <p className="text-brand-muted leading-relaxed mb-6">
                  Od daňově uznatelných benefitů pro klíčové zaměstnance (DIP, penzijko) po pojištění odpovědnosti
                  managementu a firemního majetku.
                </p>
                <Link href="/#kontakt" className="lead-cta-btn inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold no-underline">
                  Poptat firemní audit
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SluzbySection />

      <MojeCestaSection />

      <PobockySection />

      <ReferenceSection />

      <Suspense fallback={<HomeBlogSectionFallback />}>
        <HomeBlogSection />
      </Suspense>

      <FaqSection />

      <KontaktSection />
    </>
  );
}

function SluzbySection() {
  return (
    <section id="sluzby" className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 relative overflow-visible sluzby-section-bg">
      <div className="absolute inset-0 bg-black/80 z-[1]" aria-hidden />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-10 lg:mb-12 animate-fade-in-up">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/50 backdrop-blur-md border border-white/70 text-white font-bold text-xs tracking-widest uppercase mb-4 shadow-sm">
            PORTFOLIO
          </span>
          <h2 className="section-title font-bold text-white mb-4 drop-shadow-md">Moje služby</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <SluzbyCard
            title="Investiční plánování"
            subtitle="Ochrana a zhodnocení kapitálu"
            iconD="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
            body="Vytvořím pro vás portfolio na míru, které odolá inflaci a zajistí vám rentu. Využívám nízkonákladové ETF fondy."
            ctaHref="/investicnikalkulacka"
            ctaLabel="Spočítejte si investice"
          />
          <SluzbyCard
            title="Hypoteční úvěr"
            subtitle="Financování bydlení chytře"
            iconD="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            body="Pomohu vám nastavit hypotéku tak, aby vás nezatížila, a poradím, jak na refinancování nebo čerpání úvěru pro vaše bydlení."
            ctaHref="/hypotecnikalkulacka"
            ctaLabel="Hypoteční kalkulačka"
          />
          <SluzbyCard
            title="Zabezpečení rizik"
            subtitle="Životní i majetkové pojištění"
            iconD="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            body="Provedu audit vašich smluv, odstraním duplicity a nastavím krytí tak, aby vás skutečně chránilo v kritických situacích."
            ctaHref="/#kontakt"
            ctaLabel="Nastavení pojištění"
          />
          <SluzbyCard
            title="Úvěry a konsolidace"
            subtitle="Optimalizace dluhů"
            iconD="M2.25 18.75v-1.5m0 1.5v-1.5m0 0h3.75m-3.75 0h3.75m-3.75 0h-3.75m0 0h-3.75m0 0V15m0 0v1.5m0-1.5V15m0 3h3.75m-3.75 0h3.75m-3.75 0H18M9 10.5h.008v.008H9V10.5zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            body="Máte více půjček? Pomohu vám je sloučit do jedné, snížit měsíční splátku a celkově ušetřit na nákladech."
            ctaHref="/#kontakt"
            ctaLabel="Spočítat úsporu"
          />
          <SluzbyCard
            title="Doplňkové penzijní spoření"
            subtitle="Státní příspěvky"
            iconD="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
            body="Získejte ze státu maximum. Pomohu vám nastavit penzijní spoření tak, abyste využili všechny státní příspěvky a daňové úlevy naplno."
            ctaHref="/penzijnikalkulacka"
            ctaLabel="Optimální nastavení penze"
          />
          <SluzbyCard
            title="Realitní služby"
            subtitle="Prodej, nákup a pronájem"
            iconD="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
            body="Komplexní servis při prodeji či nákupu nemovitostí. Zajistím tržní odhad, profesionální prezentaci, právní servis a bezpečný převod."
            ctaHref="/#kontakt"
            ctaLabel="Konzultace realit"
          />
        </div>
      </div>
    </section>
  );
}

function SluzbyCard({
  title,
  subtitle,
  iconD,
  body,
  ctaHref,
  ctaLabel,
}: {
  title: string;
  subtitle: string;
  iconD: string;
  body: string;
  ctaHref: string;
  ctaLabel: string;
}) {
  return (
    <div className="sluzby-accordion-card rounded-2xl bg-white/[0.97] backdrop-blur-xl border border-white/80 shadow-lg overflow-hidden">
      <button type="button" className="sluzby-acc-trigger w-full p-5 sm:p-6 flex flex-col items-center text-center cursor-pointer" aria-expanded={false}>
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-brand-cyan/10 flex items-center justify-center shrink-0 mb-3">
          <svg className="w-6 h-6 sm:w-7 sm:h-7 text-brand-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={iconD} />
          </svg>
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-brand-navy">{title}</h3>
        <p className="text-slate-600 text-sm mt-1">{subtitle}</p>
        <svg className="w-5 h-5 text-brand-navy/40 mt-3 sluzby-acc-chevron transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className="sluzby-acc-panel">
        <div className="px-5 sm:px-6 pb-4 sm:pb-5 text-center">
          <p className="text-slate-700 text-sm mb-4">{body}</p>
          <Link href={ctaHref} className="sluzby-acc-cta inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl text-white font-semibold no-underline transition-all">
            <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            {ctaLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}

function MojeCestaSection() {
  const items: {
    year: string;
    img: string;
    title: string;
    text: string;
    photoClass?: string;
    yearClass?: string;
  }[] = [
    { year: "2013", img: "/img/2013.jpg", title: "První kroky v OVB", text: "Během studia 5. ročníku na ekonomické VŠ jsem začal pracovat v OVB Allfinanz a.s." },
    { year: "2015", img: "/img/2015.png", title: "Přestup do FINGO", text: "Pochopení, že existují lepší možnosti – přestup do F&P Consulting s.r.o. (dnešní FINGO).", photoClass: "timeline-photo-2015" },
    { year: "2016", img: "/img/2016.jpg", title: "Fulltime v Broker Trust", text: "Ukončení zaměstnání a plný přechod do světa financí. Získávání nezávislosti." },
    { year: "2019", img: "/img/2019.jpg", title: "Založení Premium Brokers", text: "Vlastní firma s vizí prémiového a férového přístupu ke klientům." },
    { year: "2021", img: "/img/2021.jpg", title: "Nové pobočky", text: "Otevření nových poboček v Litoměřicích, Štětí a Praze k současné Roudnické." },
    { year: "2024", img: "/img/2024.jpg", title: "Premium Brokers Reality", text: "Založení realitní kanceláře Premium Brokers Reality s.r.o." },
    { year: "2026", img: "/img/2026.jpg", title: "Lovosice a tým", text: "Lovosice, silný tým a komplexní péče pod jednou střechou.", yearClass: "text-brand-cyan" },
  ];
  return (
    <section
      id="moje-cesta"
      className="moje-cesta-section py-12 sm:py-16 md:py-20 lg:py-24 bg-[#EAF3FF] text-brand-navy relative overflow-hidden"
      style={{ contain: "layout" }}
      aria-label="Moje cesta"
    >
      <div className="moje-cesta-bg-deco" aria-hidden />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
            Moje cesta &<br />
            <span className="italic text-brand-cyan font-bold">Klíčové milníky</span>
          </h2>
        </div>
        <div
          className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-6 lg:p-8 h-[600px] overflow-y-auto moje-cesta-box"
          style={{ scrollbarWidth: "thin", isolation: "isolate" }}
        >
          {items.map((it, idx) => (
            <div key={it.year} className={`timeline-section flex flex-col md:flex-row gap-8 ${idx < items.length - 1 ? "mb-20" : ""}`}>
              <div className="md:w-1/3">
                <div className={`timeline-year text-6xl font-black ${it.yearClass ?? "text-slate-200"}`}>{it.year}</div>
              </div>
              <div className="md:w-2/3 timeline-content">
                <Image src={it.img} alt={it.year} width={800} height={500} className={`timeline-photo rounded-2xl mb-4 ${it.photoClass ?? ""}`} loading="lazy" />
                <h3 className="text-2xl font-bold text-brand-navy">{it.title}</h3>
                <p className="text-slate-500 mt-2">{it.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PobockySection() {
  return (
    <section id="pobocky" className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 bg-white">
      <div className="max-w-content mx-auto px-4 sm:px-6">
        <div className="text-center mb-14 lg:mb-16 animate-fade-in-up">
          <h2 className="section-title font-bold text-brand-text mb-4">Kde nás najdete</h2>
          <p className="text-brand-muted section-desc mx-auto text-lg leading-relaxed">Naše pobočky v Roudnici, Praze a okolí.</p>
        </div>
        <div className="bento-grid">
          <a
            href="https://www.google.com/maps?q=N%C3%A1m.+Jana+z+Dra%C5%BEic+99,+413+01+Roudnice+nad+Labem"
            target="_blank"
            rel="noopener noreferrer"
            className="bento-card bento-card--large"
          >
            <div className="bento-card-img">
              <Image src="/img/rce.jpg" alt="Roudnice nad Labem – náměstí" width={800} height={600} loading="lazy" />
              <div className="bento-card-overlay" />
            </div>
            <div className="bento-card-content">
              <span className="bento-badge">Sídlo společnosti</span>
              <h3 className="bento-city">Roudnice nad Labem</h3>
              <address className="bento-address">
                Nám. Jana z Dražic 99
                <br />
                413 01 Roudnice nad Labem
              </address>
            </div>
          </a>
          <a href="https://www.google.com/maps?q=%C5%BDateck%C3%A1+55%2F14,+110+00+Praha" target="_blank" rel="noopener noreferrer" className="bento-card">
            <div className="bento-card-img">
              <Image src="/img/praha.jpg" alt="Praha – panorama od Petřína" width={600} height={400} />
              <div className="bento-card-overlay" />
            </div>
            <div className="bento-card-content">
              <h3 className="bento-city">Praha</h3>
              <address className="bento-address">
                Žatecká 55/14
                <br />
                110 00 Praha
              </address>
            </div>
          </a>
          <a href="https://www.google.com/maps?q=5.+kv%C4%9Btna+10,+412+01+Litom%C4%9B%C5%99ice" target="_blank" rel="noopener noreferrer" className="bento-card">
            <div className="bento-card-img">
              <Image src="/img/lito.png" alt="Litoměřice – Mírové náměstí" width={600} height={400} loading="lazy" />
              <div className="bento-card-overlay" />
            </div>
            <div className="bento-card-content">
              <h3 className="bento-city">Litoměřice</h3>
              <address className="bento-address">
                5. května 10
                <br />
                412 01 Litoměřice
              </address>
            </div>
          </a>
          <a href="https://www.google.com/maps?q=U+Tr%C5%BEnice+701,+411+08+%C5%A0t%C4%9Bt%C3%AD" target="_blank" rel="noopener noreferrer" className="bento-card">
            <div className="bento-card-img">
              <Image src="/img/steti.jpg" alt="Štětí – region Litoměřicko" width={600} height={400} loading="lazy" />
              <div className="bento-card-overlay" />
            </div>
            <div className="bento-card-content">
              <h3 className="bento-city">Štětí</h3>
              <address className="bento-address">
                U Tržnice 701
                <br />
                411 08 Štětí
              </address>
            </div>
          </a>
          <div className="bento-card bento-card-coming">
            <div className="bento-card-img">
              <Image src="/img/lovo.jpg" alt="Lovosice – Lovoš a okolí" width={600} height={400} loading="lazy" />
              <div className="bento-card-overlay" />
            </div>
            <div className="bento-card-content">
              <h3 className="bento-city">Lovosice</h3>
              <p className="bento-coming">Brzy otevíráme</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ReferenceSection() {
  return (
    <section id="reference" className="py-16 lg:py-24 reference-section relative overflow-hidden">
      <div className="reference-container relative z-10">
        <div className="text-center mb-10 lg:mb-12 animate-fade-in-up">
          <span className="inline-block px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold mb-3">Google Recenze</span>
          <h2 className="section-title font-bold text-white mb-3">Reference</h2>
          <p className="text-white/80 text-base lg:text-lg max-w-xl mx-auto">Co říkají klienti o spolupráci se mnou.</p>
        </div>
        <div className="reference-marquee reference-marquee-white rounded-3xl border border-slate-200/80 bg-white py-10 px-2 md:px-4 relative overflow-hidden shadow-sm">
          <div className="reference-marquee-fade reference-marquee-fade-left" />
          <div className="reference-marquee-fade reference-marquee-fade-right" />
          <ReviewsMarquee />
        </div>
        <div className="text-center mt-8">
          <a
            href="https://www.google.com/search?q=Premium+Brokers+s.r.o.+Recenze&hl=cs-CZ#lkt=LocalPoiReviews"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-brand-navy text-white font-semibold text-sm hover:bg-brand-navy/90 transition"
          >
            Zobrazit všechny recenze na Google
          </a>
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section id="faq" className="faq-section" aria-labelledby="faq-title">
      <div className="faq-head">
        <h2 id="faq-title" className="section-title font-bold text-brand-text">
          Časté dotazy o finančním plánování
        </h2>
        <p className="faq-sub">
          Odpovědi na nejčastější otázky před prvním setkáním – investice, hypotéka, životní pojištění i firemní finance.
        </p>
      </div>
      <div className="faq-switcher" data-tabs role="tablist" aria-label="Kategorie dotazů">
        <span className="faq-bubble" aria-hidden />
        <button type="button" className="faq-tab active" role="tab" data-tab="price">
          Kolik to stojí?
        </button>
        <button type="button" className="faq-tab" role="tab" data-tab="plan">
          První plán
        </button>
        <button type="button" className="faq-tab" role="tab" data-tab="sign">
          Podpisy
        </button>
        <button type="button" className="faq-tab" role="tab" data-tab="existing">
          Stávající smlouvy
        </button>
        <button type="button" className="faq-tab" role="tab" data-tab="review">
          Revize
        </button>
      </div>
      <div className="faq-panels">
        <div className="faq-panel active" data-panel="price">
          <div className="faq-grid">
            <div className="faq-questions" role="list">
              <button type="button" className="faq-q active" data-answer="price-a1">
                Kolik stojí úvodní konzultace?
              </button>
              <button type="button" className="faq-q" data-answer="price-a2">
                Platí se finanční plán jednorázově, nebo průběžně?
              </button>
              <button type="button" className="faq-q" data-answer="price-a3">
                Jak poznám, že se mi to „vyplatí“?
              </button>
            </div>
            <div className="faq-answer" aria-live="polite">
              <div className="faq-a active" id="price-a1">
                Úvodní konzultace je nezávazná a bez poplatku. Na konci si řekneme, zda dává spolupráce smysl a jaký bude další postup.
              </div>
              <div className="faq-a" id="price-a2">
                Záleží na rozsahu spolupráce. Někdy stačí jednorázová analýza + nastavení, jindy dává smysl dlouhodobý servis (pravidelná kontrola, úpravy, změny smluv).
              </div>
              <div className="faq-a" id="price-a3">
                V praxi nejčastěji ušetříme na zbytečných/poplatkově drahých produktech, nastavíme rizika (pojistky) a cíleně srovnáme investice a hypotéku. Výsledky ukazujeme na konkrétních číslech.
              </div>
            </div>
          </div>
        </div>
        <div className="faq-panel" data-panel="plan">
          <div className="faq-grid">
            <div className="faq-questions" role="list">
              <button type="button" className="faq-q active" data-answer="plan-a1">
                Co si mám připravit na první schůzku?
              </button>
              <button type="button" className="faq-q" data-answer="plan-a2">
                Za jak dlouho mám hotový finanční plán?
              </button>
              <button type="button" className="faq-q" data-answer="plan-a3">
                Jak probíhá tvorba plánu krok za krokem?
              </button>
            </div>
            <div className="faq-answer" aria-live="polite">
              <div className="faq-a active" id="plan-a1">
                Stačí stručně: příjmy/výdaje, cíle (např. bydlení, rezerva, důchod) a jaké máte smlouvy (investice, pojistky, hypotéka). Když něco nemáte, dořešíme to spolu.
              </div>
              <div className="faq-a" id="plan-a2">
                Typicky v řádu dnů až jednotek týdnů podle složitosti. Vždy nejdřív uděláme rychlou orientaci a priority, a teprve pak detail.
              </div>
              <div className="faq-a" id="plan-a3">
                Nejdřív rychlá orientace a priority, pak detailní návrh. Projdeme vaši situaci, cíle a možnosti, a teprve pak sestavíme konkrétní doporučení.
              </div>
            </div>
          </div>
        </div>
        <div className="faq-panel" data-panel="sign">
          <div className="faq-grid">
            <div className="faq-questions" role="list">
              <button type="button" className="faq-q active" data-answer="sign-a1">
                Musím něco podepisovat hned na první schůzce?
              </button>
              <button type="button" className="faq-q" data-answer="sign-a2">
                Jak funguje online podpis a ověření?
              </button>
            </div>
            <div className="faq-answer" aria-live="polite">
              <div className="faq-a active" id="sign-a1">
                Ne. První konzultace je nezávazná. Pokud se rozhodnete pokračovat, vysvětlíme si konkrétní kroky a co který podpis znamená.
              </div>
              <div className="faq-a" id="sign-a2">
                Většinu věcí lze řešit online. Vysvětlím postup, pošlu podklady a vy podepíšete bezpečně přes ověřený proces dané instituce.
              </div>
            </div>
          </div>
        </div>
        <div className="faq-panel" data-panel="existing">
          <div className="faq-grid">
            <div className="faq-questions" role="list">
              <button type="button" className="faq-q active" data-answer="existing-a1">
                Má smysl řešit finance, když už mám investice/pojistky/hypotéku?
              </button>
              <button type="button" className="faq-q" data-answer="existing-a2">
                Budete mi hned rušit stávající smlouvy?
              </button>
            </div>
            <div className="faq-answer" aria-live="polite">
              <div className="faq-a active" id="existing-a1">
                Ano — často se dá zlepšit nákladovost, krytí rizik a nastavení strategie. Někdy stačí drobné úpravy, jindy dává smysl změna struktury.
              </div>
              <div className="faq-a" id="existing-a2">
                Ne. Nejdřív audit, pak doporučení s důvody a dopady. Rozhodnutí je vždy na vás.
              </div>
            </div>
          </div>
        </div>
        <div className="faq-panel" data-panel="review">
          <div className="faq-grid">
            <div className="faq-questions" role="list">
              <button type="button" className="faq-q active" data-answer="review-a1">
                Jak často děláte revizi finančního plánu?
              </button>
              <button type="button" className="faq-q" data-answer="review-a2">
                Co přesně se při revizi kontroluje?
              </button>
            </div>
            <div className="faq-answer" aria-live="polite">
              <div className="faq-a active" id="review-a1">
                Standardně 1× ročně nebo při změně situace (dítě, bydlení, podnikání, vyšší příjem, změna hypotéky).
              </div>
              <div className="faq-a" id="review-a2">
                Rezerva, cashflow, pojistná rizika, investiční strategie, hypotéka a cíle. Cílem je, aby plán odpovídal realitě a byl dlouhodobě funkční.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function KontaktSection() {
  return (
    <section
      id="kontakt"
      className="lead-form-section py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 relative overflow-hidden min-h-[520px] sm:min-h-[560px] lg:min-h-[640px] flex items-center"
    >
      <div className="lead-form-bg" aria-hidden />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 relative z-10 w-full">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden smart-cta-container">
          <div className="p-5 sm:p-8 lg:p-12 flex flex-col justify-center">
            <LeadConsultationForm />
          </div>
        </div>
      </div>
    </section>
  );
}
