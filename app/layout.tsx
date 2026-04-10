import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "../assets/css/styles.css";
import "./header-scroll-override.css";
import { QuickCalcWidget } from "@/components/layout/QuickCalcWidget";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { siteConfig } from "@/config/site";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: {
    default: "Marek Příbramský – Privátní finanční plánování",
    template: siteConfig.titleTemplate,
  },
  description: siteConfig.defaultDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" className={inter.variable}>
      <body className="font-sans text-brand-text antialiased bg-brand-background">
        <SiteHeader />
        {children}
        <QuickCalcWidget />
        <SiteFooter />
      </body>
    </html>
  );
}
