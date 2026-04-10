"use client";

import { useState } from "react";
import {
  buildContactPagePayload,
  pageUrl,
  submitToFormSubmit,
} from "@/lib/forms/leadSubmit";

export function ContactPageForm() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const payload = buildContactPagePayload({
        name,
        contact,
        message,
        consent,
        pageHref: pageUrl(),
      });
      await submitToFormSubmit(payload);
      setDone(true);
    } catch {
      setError("Nepodařilo se odeslat. Zkuste to prosím znovu.");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div id="lead-success" className="text-center py-8">
        <div className="w-16 h-16 rounded-full bg-brand-cyan/20 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-brand-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-brand-text mb-2">Zpráva odeslána</h3>
        <p className="text-brand-muted">Ozveme se vám co nejdříve.</p>
      </div>
    );
  }

  return (
    <form id="lead-form-el" className="space-y-5" onSubmit={onSubmit}>
      <div>
        <label htmlFor="lead-name" className="block text-sm font-semibold text-brand-text mb-1.5">
          Jméno
        </label>
        <input
          id="lead-name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Jan Novák"
          className="w-full px-4 py-3 rounded-xl border border-brand-border focus:ring-2 focus:ring-brand-cyan focus:border-transparent"
        />
      </div>
      <div>
        <label htmlFor="lead-contact" className="block text-sm font-semibold text-brand-text mb-1.5">
          Telefon nebo e-mail
        </label>
        <input
          id="lead-contact"
          required
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="jan@email.cz nebo +420 123 456 789"
          className="w-full px-4 py-3 rounded-xl border border-brand-border focus:ring-2 focus:ring-brand-cyan focus:border-transparent"
        />
      </div>
      <div>
        <label htmlFor="lead-message" className="block text-sm font-semibold text-brand-text mb-1.5">
          Zpráva
        </label>
        <textarea
          id="lead-message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Stručně popište, s čím vám můžeme pomoci..."
          className="w-full px-4 py-3 rounded-xl border border-brand-border focus:ring-2 focus:ring-brand-cyan focus:border-transparent resize-none"
        />
      </div>
      <div className="flex items-start gap-3">
        <input
          id="lead-consent"
          type="checkbox"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 w-4 h-4 rounded border-brand-border text-brand-navy focus:ring-brand-cyan"
        />
        <label htmlFor="lead-consent" className="text-sm text-brand-muted">
          Souhlasím se zpracováním osobních údajů.{" "}
          <a
            href="https://www.beplan.cz/ochrana-osobnich-udaju/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-navy hover:underline"
          >
            Více o ochraně údajů
          </a>
          .
        </label>
      </div>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={busy}
        className="w-full py-4 px-6 rounded-2xl bg-brand-navy text-white font-bold hover:bg-brand-navy/90 disabled:opacity-75"
      >
        {busy ? "Odesílám…" : "Odeslat"}
      </button>
    </form>
  );
}
