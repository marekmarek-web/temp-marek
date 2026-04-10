import Image from "next/image";
import Link from "next/link";
import {
  branches,
  footerQuickLinks,
  footerToolLinks,
  siteConfig,
  socialLinks,
} from "@/config/site";
import { FooterLeadForm } from "@/components/forms/FooterLeadForm";
import { getFooterTagline } from "@/lib/site-settings";

function SocialIcon({ icon }: { icon: "fb" | "ig" | "li" }) {
  if (icon === "fb") {
    return (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    );
  }
  if (icon === "ig") {
    return (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    );
  }
  return (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export async function SiteFooter() {
  const footerTagline = await getFooterTagline();

  return (
    <footer className="bg-brand-navy text-white py-10 sm:py-12 lg:py-16" role="contentinfo">
      <div className="footer-inner mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 sm:gap-10 lg:gap-12 mb-8 sm:mb-10 lg:mb-12">
          <div className="md:col-span-2 lg:col-span-2">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <Link href="/" className="shrink-0">
                  <Image
                    src="/img/logos/pb-logo-no-bg-grey.png"
                    alt="Premium Brokers"
                    width={120}
                    height={40}
                    className="h-10 w-auto"
                  />
                </Link>
                <span className="font-bold text-xl">{siteConfig.name}</span>
              </div>
              <p className="text-slate-300 text-sm max-w-sm mb-4">{footerTagline}</p>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Sledujte mě</span>
              <div className="flex flex-wrap gap-3 social-icons-row">
                {socialLinks.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon-link"
                    aria-label={s.label}
                  >
                    <SocialIcon icon={s.icon} />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4">Rychlé odkazy</h4>
            <ul className="space-y-2 text-sm">
              {footerQuickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-slate-300 hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4">Nástroje</h4>
            <ul className="space-y-2 text-sm">
              {footerToolLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-slate-300 hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4">Pobočky</h4>
            <ul className="space-y-2 text-sm text-slate-300">
              {branches.map((b) => (
                <li key={b.city}>
                  <strong className="text-white">{b.city}</strong>
                  <br />
                  {b.muted ? (
                    <span className="text-slate-400">{b.lines[0]}</span>
                  ) : (
                    b.lines.map((line) => <span key={line}>{line}</span>)
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4">Kontakt</h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li>
                <a href={`tel:${siteConfig.phoneTel}`} className="hover:text-white">
                  {siteConfig.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.contactEmail}`} className="hover:text-white">
                  {siteConfig.contactEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 pb-8">
          <div className="max-w-md mx-auto lg:mx-0 mb-8">
            <h4 className="font-bold text-sm uppercase tracking-wider mb-3 text-white">Rychlý kontakt</h4>
            <FooterLeadForm />
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
            <p>&copy; {new Date().getFullYear()} {siteConfig.name}. Všechna práva vyhrazena.</p>
            <div className="flex gap-6">
              <a
                href="https://www.beplan.cz/ochrana-osobnich-udaju/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                Ochrana osobních údajů
              </a>
              <Link href="/cookies" className="hover:text-white">
                Cookies
              </Link>
            </div>
          </div>
          <p className="text-[10px] text-slate-500 leading-relaxed max-w-3xl">
            Ing. Marek Příbramský, IČO: 02024870 je vázaným zástupcem samostatného zprostředkovatele BEplan finanční
            plánování s.r.o., IČO: 05779944. Služby jsou poskytovány v rámci následujících registrací. Pojištění: vázaný
            zástupce podle zákona č. 170/2018 Sb., o distribuci pojištění a zajištění. Spotřebitelské úvěry: vázaný
            zástupce podle zákona č. 257/2016 Sb., o spotřebitelském úvěru. Investiční služby a produkty: vázaný zástupce
            podle zákona č. 256/2004 Sb., o podnikání na kapitálovém trhu. Doplňkové penzijní spoření: vázaný zástupce
            podle zákona č. 427/2011 Sb., o doplňkovém penzijním spoření.
          </p>
          <p className="text-sm text-slate-400">
            Vytvořil{" "}
            <a
              href="https://www.m2digitalagency.cz/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white font-medium"
            >
              M2DigitalAgency
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
