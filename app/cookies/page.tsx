import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cookies",
  robots: { index: false },
};

export default function CookiesPage() {
  return (
    <main className="main-with-header pt-24 pb-20 lg:pb-28">
      <div className="max-w-content mx-auto px-4 sm:px-6">
        <div className="max-w-3xl">
          <h1 className="section-title font-bold text-brand-text mb-8">Cookies</h1>
          <p className="text-brand-muted leading-relaxed mb-6">
            Tento web může používat cookies pro zajištění základní funkčnosti a analýzu návštěvnosti. Cookies jsou malé
            textové soubory ukládané ve vašem prohlížeči.
          </p>
          <p className="text-brand-muted leading-relaxed">
            Podrobné informace o používání cookies doplňte dle vašich potřeb.
          </p>
          <Link
            href="/gdpr"
            className="inline-block mt-8 px-6 py-3 rounded-xl bg-brand-navy text-white font-semibold hover:bg-brand-navy/90"
          >
            Ochrana osobních údajů
          </Link>
        </div>
      </div>
    </main>
  );
}
