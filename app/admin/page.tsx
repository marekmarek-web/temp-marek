import Link from "next/link";

export default function AdminHomePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-brand-text mb-2">Administrace</h1>
      <p className="text-brand-muted mb-8 text-sm">
        Správa blogu a textů zobrazených na veřejném webu.
      </p>
      <ul className="space-y-3 text-brand-navy font-semibold">
        <li>
          <Link href="/admin/posts" className="hover:text-brand-cyan underline-offset-2 hover:underline">
            Články — přidat, upravit, publikovat
          </Link>
        </li>
        <li>
          <Link href="/admin/settings" className="hover:text-brand-cyan underline-offset-2 hover:underline">
            Nastavení webu — patička, text u blogu na úvodu
          </Link>
        </li>
      </ul>
    </div>
  );
}
