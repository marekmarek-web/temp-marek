import type { Metadata } from "next";
import { AdminNav } from "@/components/admin/AdminNav";
import { requireEditor } from "@/lib/admin/require-editor";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const { role, displayName } = await requireEditor();

  return (
    <div className="min-h-screen bg-brand-background pt-10 pb-16">
      <a
        href="#admin-main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-brand-navy focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-brand-cyan"
      >
        Přeskočit na obsah
      </a>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AdminNav role={role} displayName={displayName} />
        <main id="admin-main" tabIndex={-1} className="outline-none">
          {children}
        </main>
      </div>
    </div>
  );
}
