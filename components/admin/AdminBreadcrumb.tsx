import Link from "next/link";

export type BreadcrumbItem = { label: string; href?: string };

export function AdminBreadcrumb({ items }: { items: BreadcrumbItem[] }) {
  if (!items.length) return null;
  return (
    <nav aria-label="Drobečková navigace" className="text-sm text-brand-muted mb-3">
      <ol className="flex flex-wrap gap-x-1.5 gap-y-1 items-center">
        {items.map((item, i) => (
          <li key={`${item.label}-${i}`} className="flex items-center gap-1.5">
            {i > 0 ? (
              <span aria-hidden className="text-brand-border select-none">
                /
              </span>
            ) : null}
            {item.href ? (
              <Link href={item.href} className="font-medium text-brand-navy hover:text-brand-cyan">
                {item.label}
              </Link>
            ) : (
              <span className="text-brand-text font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
