"use client";

import Link from "next/link";
import { useConsent } from "@/components/consent/ConsentContext";

/**
 * Nenápadný spodní panel — neblokuje čtení, jen informuje a nabízí volbu.
 */
export function CookieConsentBanner() {
  const { ready, decided, setEssentialOnly, setAnalyticsAccepted } = useConsent();

  if (!ready || decided) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[100] border-t border-slate-200/80 bg-white/95 px-4 py-4 shadow-[0_-8px_30px_rgba(15,23,42,0.08)] backdrop-blur-md md:px-8"
      role="dialog"
      aria-label="Nastavení cookies"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-6">
        <p className="text-sm text-slate-700">
          Používáme nezbytné cookies pro chod webu. Volitelné měření návštěvnosti (Plausible) spouštíme jen s vaším
          souhlasem.{" "}
          <Link href="/cookies" className="font-semibold text-brand-navy underline-offset-2 hover:underline">
            Cookies
          </Link>
          ,{" "}
          <Link href="/gdpr" className="font-semibold text-brand-navy underline-offset-2 hover:underline">
            osobní údaje
          </Link>
          .
        </p>
        <div className="flex flex-shrink-0 flex-wrap gap-2">
          <button
            type="button"
            className="min-h-[44px] rounded-xl border-2 border-slate-200 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
            onClick={setEssentialOnly}
          >
            Jen nezbytné
          </button>
          <button
            type="button"
            className="min-h-[44px] rounded-xl bg-brand-navy px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-navy/90"
            onClick={setAnalyticsAccepted}
          >
            Souhlasím s měřením
          </button>
        </div>
      </div>
    </div>
  );
}
