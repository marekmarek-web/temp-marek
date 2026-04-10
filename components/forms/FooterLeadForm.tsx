"use client";

import { useState } from "react";
import {
  buildFooterLeadPayload,
  pageUrl,
  submitToFormSubmit,
} from "@/lib/forms/leadSubmit";

export function FooterLeadForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setMsg(null);
    if (!name.trim()) {
      setErr("Vyplňte jméno.");
      return;
    }
    if (!email.trim()) {
      setErr("Vyplňte e-mail.");
      return;
    }
    setBusy(true);
    try {
      const payload = buildFooterLeadPayload({
        name,
        email,
        phone,
        interest,
        pageHref: pageUrl(),
      });
      await submitToFormSubmit(payload);
      setName("");
      setEmail("");
      setPhone("");
      setInterest("");
      setMsg("Děkujeme, brzy se ozveme.");
    } catch {
      const mailto = `mailto:pribramsky@premiumbrokers.cz?subject=${encodeURIComponent("Nezávazná konzultace")}&body=${encodeURIComponent(`Jméno: ${name}\nE-mail: ${email}\nTelefon: ${phone || "-"}\nZájem: ${interest || "-"}`)}`;
      window.location.href = mailto;
      setMsg("Otevřete svůj e-mailový klient pro dokončení.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form id="footer-quick-lead" className="space-y-3 text-sm" onSubmit={onSubmit}>
      <div>
        <label htmlFor="footer-name" className="block text-slate-300 mb-1">
          Jméno
        </label>
        <input
          id="footer-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:ring-2 focus:ring-brand-cyan"
          placeholder="Jan Novák"
        />
      </div>
      <div>
        <label htmlFor="footer-email" className="block text-slate-300 mb-1">
          E-mail
        </label>
        <input
          id="footer-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:ring-2 focus:ring-brand-cyan"
          placeholder="jan@email.cz"
        />
      </div>
      <div>
        <label htmlFor="footer-phone" className="block text-slate-300 mb-1">
          Telefon (volitelně)
        </label>
        <input
          id="footer-phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:ring-2 focus:ring-brand-cyan"
        />
      </div>
      <div>
        <label htmlFor="footer-interest" className="block text-slate-300 mb-1">
          Zájem
        </label>
        <select
          id="footer-interest"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:ring-2 focus:ring-brand-cyan"
        >
          <option value="">— vyberte —</option>
          <option value="investice">Investice</option>
          <option value="hypoteka">Hypotéka</option>
          <option value="pojisteni">Pojištění</option>
          <option value="duchod">Důchod / penze</option>
          <option value="jine">Jiné</option>
        </select>
      </div>
      {err && <p className="text-red-300 text-xs">{err}</p>}
      {msg && <p className="text-brand-cyan text-xs">{msg}</p>}
      <button
        type="submit"
        disabled={busy}
        className="w-full py-2.5 rounded-lg bg-brand-cyan text-brand-navy font-semibold hover:opacity-95 disabled:opacity-70"
      >
        {busy ? "Odesílám…" : "Odeslat"}
      </button>
    </form>
  );
}
