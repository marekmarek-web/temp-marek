"use client";

import gsap from "gsap";
import Image from "next/image";
import { useEffect } from "react";

export function HeroHomeSection({ booted }: { booted: boolean }) {
  useEffect(() => {
    if (!booted) return;
    const revealLines = document.querySelectorAll(".text-reveal-line");
    if (revealLines.length && typeof gsap !== "undefined") {
      gsap.to(revealLines, {
        y: "0%",
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
        delay: 0.2,
      });
      const heroSub = document.querySelector(".hero-subtitle");
      if (heroSub) {
        gsap.to(heroSub, { opacity: 1, duration: 1, delay: 1, ease: "power2.out" });
      }
    }
  }, [booted]);

  return (
    <section id="hero" className="hero-aurora hero-entry relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-brand-navy">
      <div className="hero-image-wrapper absolute inset-3 sm:inset-4 md:inset-6 z-0 overflow-hidden rounded-[1rem] sm:rounded-[1.25rem] md:rounded-[1.5rem] shadow-2xl">
        <div className="absolute inset-0 bg-brand-navy" aria-hidden />
        <div className="relative z-[1] h-[min(85vh,900px)] w-full">
          <Image
            src="/img/hero3.jpg"
            alt="Marek Příbramský"
            fill
            priority
            className="hero-img-full object-cover object-[center_top] max-sm:object-[right_center]"
            sizes="100vw"
          />
        </div>
        <div className="hero-overlay absolute inset-0 bg-black/50 pointer-events-none z-[2]" aria-hidden />
      </div>
      <div className="hero-content relative z-10 text-center max-w-5xl mx-auto px-4 pt-20 max-sm:pt-14 max-sm:px-4">
        <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] text-white hero-text-shadow max-sm:text-[clamp(2rem,8vw,3rem)] max-sm:leading-snug">
          <div className="text-reveal-mask">
            <span className="text-reveal-line">Jsem</span>
          </div>
          <div className="text-reveal-mask">
            <span className="text-reveal-line text-gradient-shimmer-blue">Marek Příbramský.</span>
          </div>
        </h1>
        <p className="hero-subtitle mt-8 text-lg sm:text-xl text-white/90 opacity-0 hero-text-shadow max-sm:text-base max-sm:mt-3">
          Pomůžu Vám splnit Vaše cíle.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3 hero-badges-center max-sm:gap-2 max-sm:mt-3">
          <div
            className="trust-badge trust-badge-float inline-flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-full"
            style={{ animationDelay: "0s" }}
          >
            <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-brand-cyan/20 flex items-center justify-center text-brand-navy">
              <svg className="w-3.5 h-3.5 md:w-4 md:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-xs md:text-sm font-semibold text-brand-navy">13 let zkušeností</span>
          </div>
          <div
            className="trust-badge trust-badge-float inline-flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-full"
            style={{ animationDelay: "1.5s" }}
          >
            <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
              <svg className="w-3.5 h-3.5 md:w-4 md:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v18h18M18 17l-5-5-4 4-3-3" />
              </svg>
            </div>
            <span className="text-xs md:text-sm font-semibold text-brand-navy">Aktivní správa portfolií</span>
          </div>
          <div
            className="trust-badge trust-badge-float inline-flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 rounded-full"
            style={{ animationDelay: "3s" }}
          >
            <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold">
              <svg className="w-3.5 h-3.5 md:w-4 md:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <span className="text-xs md:text-sm font-semibold text-brand-navy">200+ mil. Kč v mandátu</span>
          </div>
        </div>
      </div>
      <a
        href="#muj-postup"
        className="hero-scroll-link absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/80 hover:text-white transition-colors hero-text-shadow max-sm:bottom-4"
        aria-label="Posunout dolů"
      >
        <svg className="w-8 h-8 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </a>
    </section>
  );
}
