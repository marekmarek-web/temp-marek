"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function SiteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
      void import("@sentry/nextjs").then((Sentry) => Sentry.captureException(error));
    } else {
      console.error(error);
    }
  }, [error]);

  return (
    <main className="main-with-header min-h-[50vh] px-4 py-20 text-center sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-wider text-brand-cyan">Chyba</p>
      <h1 className="mt-2 text-2xl font-bold text-brand-text sm:text-3xl">Obsah se nepodařilo načíst</h1>
      <p className="mx-auto mt-4 max-w-md text-brand-muted text-sm">
        Zkuste prosím znovu načíst stránku. Pokud problém přetrvává, vraťte se na úvod.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-brand-navy px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-brand-navy/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/60 focus-visible:ring-offset-2"
        >
          Zkusit znovu
        </button>
        <Link
          href="/"
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl border-2 border-brand-navy px-6 py-3 text-sm font-semibold text-brand-navy transition hover:bg-brand-navy/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/60 focus-visible:ring-offset-2"
        >
          Úvodní stránka
        </Link>
      </div>
    </main>
  );
}
