"use client";

import Link from "next/link";
import { useState } from "react";
import { submitRecruitmentApplication } from "@/app/actions/recruitment";
import { legalConfig } from "@/config/legal";
import { pageUrl } from "@/lib/forms/page-url";

export function RecruitmentPageForm() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [position, setPosition] = useState("");
  const [message, setMessage] = useState("");
  const [cvUrl, setCvUrl] = useState("");
  const [consent, setConsent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const result = await submitRecruitmentApplication({
        name,
        contact,
        message: message.trim() || undefined,
        position: position.trim() || undefined,
        cvUrl: cvUrl.trim() || undefined,
        consent: consent === true,
        pageHref: pageUrl(),
      });
      if (!result.ok) {
        setError(result.message);
        return;
      }
      setDone(true);
    } catch {
      setError("Nepodařilo se odeslat. Zkuste to prosím znovu.");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 rounded-full bg-brand-cyan/20 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-brand-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-brand-text mb-2">Přihláška odeslána</h3>
        <p className="text-brand-muted">Děkujeme, ozveme se vám, jakmile to bude možné.</p>
      </div>
    );
  }

  return (
    <form className="space-y-5" onSubmit={onSubmit}>
      <div>
        <label htmlFor="rec-name" className="block text-sm font-semibold text-brand-text mb-1.5">
          Jméno
        </label>
        <input
          id="rec-name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Jan Novák"
          className="w-full px-4 py-3 rounded-xl border border-brand-border focus:ring-2 focus:ring-brand-cyan focus:border-transparent"
        />
      </div>
      <div>
        <label htmlFor="rec-contact" className="block text-sm font-semibold text-brand-text mb-1.5">
          Telefon nebo e-mail
        </label>
        <input
          id="rec-contact"
          required
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="jan@email.cz nebo +420 123 456 789"
          className="w-full px-4 py-3 rounded-xl border border-brand-border focus:ring-2 focus:ring-brand-cyan focus:border-transparent"
        />
      </div>
      <div>
        <label htmlFor="rec-position" className="block text-sm font-semibold text-brand-text mb-1.5">
          Pozice / oblast zájmu
        </label>
        <input
          id="rec-position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          placeholder="Např. administrativa, back-office…"
          className="w-full px-4 py-3 rounded-xl border border-brand-border focus:ring-2 focus:ring-brand-cyan focus:border-transparent"
        />
      </div>
      <div>
        <label htmlFor="rec-message" className="block text-sm font-semibold text-brand-text mb-1.5">
          Zpráva
        </label>
        <textarea
          id="rec-message"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Stručně o sobě a motivaci…"
          className="w-full px-4 py-3 rounded-xl border border-brand-border focus:ring-2 focus:ring-brand-cyan focus:border-transparent resize-none"
        />
      </div>
      <div>
        <label htmlFor="rec-cv-url" className="block text-sm font-semibold text-brand-text mb-1.5">
          Odkaz na životopis (volitelné)
        </label>
        <input
          id="rec-cv-url"
          type="url"
          value={cvUrl}
          onChange={(e) => setCvUrl(e.target.value)}
          placeholder="https://…"
          className="w-full px-4 py-3 rounded-xl border border-brand-border focus:ring-2 focus:ring-brand-cyan focus:border-transparent"
        />
      </div>
      <div className="flex items-start gap-3">
        <input
          id="rec-consent"
          type="checkbox"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 w-4 h-4 rounded border-brand-border text-brand-navy focus:ring-brand-cyan"
        />
        <label htmlFor="rec-consent" className="text-sm text-brand-muted">
          Souhlasím se zpracováním osobních údajů v rámci náboru.{" "}
          <Link href="/gdpr" className="text-brand-navy hover:underline">
            Webové zásady
          </Link>
          , partner:{" "}
          <a
            href={legalConfig.partnerPrivacyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-navy hover:underline"
          >
            BEplan
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
        {busy ? "Odesílám…" : "Odeslat přihlášku"}
      </button>
    </form>
  );
}
