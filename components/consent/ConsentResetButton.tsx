"use client";

import { CONSENT_STORAGE_KEY } from "@/lib/consent/storage";

export function ConsentResetButton() {
  return (
    <button
      type="button"
      className="mt-6 min-h-[44px] rounded-xl border-2 border-brand-border px-4 py-2 text-sm font-semibold text-brand-navy hover:bg-brand-background"
      onClick={() => {
        try {
          localStorage.removeItem(CONSENT_STORAGE_KEY);
        } catch {
          /* ignore */
        }
        window.location.reload();
      }}
    >
      Znovu zobrazit banner cookies
    </button>
  );
}
