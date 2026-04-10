import type { Metadata } from "next";
import Link from "next/link";
import { ContactPageForm } from "@/components/forms/ContactPageForm";
import { branches, siteConfig, socialLinks } from "@/config/site";
import { pageOg } from "@/lib/seo/page-meta";

const title = "Kontakt";
const description =
  "Telefon, e-mail, pobočky. Napište — domluvíme nezávazný hovor; obvykle odpovídám do jednoho pracovního dne.";

export const metadata: Metadata = {
  title,
  description,
  ...pageOg("/kontakt", title, description),
};

export default function KontaktPage() {
  return (
    <main className="main-with-header pt-24 pb-20 lg:pb-28">
      <div className="max-w-content mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="section-title font-bold text-brand-text mb-4">Kontakt</h1>
          <p className="text-brand-muted mb-8">
            Ozvěte se — domluvíme krátký hovor nebo schůzku. Odpovídám osobně, obvykle do jednoho pracovního dne (v
            pracovních dnech).
          </p>

          <div className="mb-10 rounded-2xl border border-brand-border bg-white p-6 shadow-sm">
            <h2 className="text-sm font-bold uppercase tracking-wider text-brand-muted mb-4">Přímý kontakt</h2>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
              <a
                href={`tel:${siteConfig.phoneTel}`}
                className="text-lg font-semibold text-brand-navy hover:text-brand-cyan"
              >
                {siteConfig.phoneDisplay}
              </a>
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="break-all text-lg font-semibold text-brand-navy hover:text-brand-cyan"
              >
                {siteConfig.contactEmail}
              </a>
            </div>
            <ul className="mt-5 flex flex-wrap gap-3">
              {socialLinks.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-brand-cyan hover:underline"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-12 rounded-2xl border border-brand-border bg-brand-background/80 p-6">
            <h2 className="text-sm font-bold uppercase tracking-wider text-brand-muted mb-4">Pobočky</h2>
            <ul className="space-y-4 text-sm text-brand-text">
              {branches.map((b) => (
                <li key={b.city}>
                  <span className="font-semibold text-brand-navy">{b.city}</span>
                  {b.muted ? (
                    <span className="mt-0.5 block text-brand-muted">{b.lines[0]}</span>
                  ) : (
                    b.lines.map((line) => (
                      <span key={line} className="mt-0.5 block text-brand-muted">
                        {line}
                      </span>
                    ))
                  )}
                </li>
              ))}
            </ul>
          </div>

          <h2 className="text-lg font-bold text-brand-text mb-3">Napište zprávu</h2>
          <p className="text-brand-muted mb-8 text-sm">
            Vyplňte formulář — ozveme se s návrhem termínu. Odesláním souhlasíte se zpracováním údajů podle stránky{" "}
            <Link href="/gdpr" className="text-brand-navy font-medium hover:underline">
              Ochrana osobních údajů
            </Link>
            .
          </p>
          <div className="rounded-2xl p-[1px] bg-gradient-to-br from-brand-navy/15 via-brand-cyan/10 to-brand-navy/15 shadow-sm">
            <div className="bg-white rounded-2xl p-8 lg:p-10">
              <ContactPageForm />
            </div>
          </div>
          <p className="mt-12">
            <Link href="/" className="text-brand-navy font-semibold hover:text-brand-cyan">
              ← Zpět na úvod
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
