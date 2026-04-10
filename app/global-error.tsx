"use client";

import { useEffect } from "react";

export default function GlobalError({
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
    <html lang="cs">
      <body className="min-h-screen bg-slate-50 px-6 py-16 text-center font-sans text-slate-800">
        <h1 className="text-2xl font-bold text-slate-900">Něco se pokazilo</h1>
        <p className="mt-4 max-w-md mx-auto text-slate-600 text-sm">
          Omlouváme se za potíže. Zkuste obnovit stránku nebo se vrátit na úvod.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-8 inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[#1D2354] px-6 py-3 text-sm font-semibold text-white"
        >
          Zkusit znovu
        </button>
      </body>
    </html>
  );
}
