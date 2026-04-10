import Link from "next/link";
import { SubscriberStatusSelect } from "@/components/admin/SubscriberStatusSelect";
import { requireEditor } from "@/lib/admin/require-editor";
import { formatPostDate } from "@/lib/format/date";
import {
  INTEREST_SEGMENT_LABELS,
  SUBSCRIBER_SOURCE_LABELS,
  SUBSCRIBER_STATUS_LABELS,
  type InterestSegment,
  type SubscriberStatus,
} from "@/lib/subscribers/domain";

type Search = { status?: string; segment?: string };

function isStatus(s: string | undefined): s is SubscriberStatus {
  return s === "active" || s === "unsubscribed" || s === "bounced" || s === "pending";
}

function isSegment(s: string | undefined): s is InterestSegment {
  return s === "blog_audience" || s === "calculators" || s === "general_updates" || s === "content_interest";
}

function subscribersHref(status: string | null, segment: string | null): string {
  const p = new URLSearchParams();
  if (status) p.set("status", status);
  if (segment) p.set("segment", segment);
  const q = p.toString();
  return q ? `/admin/subscribers?${q}` : "/admin/subscribers";
}

export default async function AdminSubscribersPage({ searchParams }: { searchParams: Promise<Search> }) {
  const sp = await searchParams;
  const statusFilter = isStatus(sp.status) ? sp.status : null;
  const segmentFilter = isSegment(sp.segment) ? sp.segment : null;

  const { supabase } = await requireEditor();

  let q = supabase
    .from("subscribers")
    .select(
      "id, email, name, status, interest_segment, source, source_path, consent_marketing_at, created_at",
    )
    .order("created_at", { ascending: false });
  if (statusFilter) q = q.eq("status", statusFilter);
  if (segmentFilter) q = q.eq("interest_segment", segmentFilter);

  const { data: rows, error } = await q;

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-900" role="alert">
        <p className="font-semibold">Odběratele se nepodařilo načíst</p>
        <p className="mt-1 text-red-800/90">
          Ověřte migraci databáze (subscribers) a oprávnění účtu. Technická zpráva níže je pro správce.
        </p>
        <p className="mt-2 font-mono text-xs opacity-80">{error.message}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-brand-text">Odběratelé</h1>
          <p className="text-sm text-brand-muted mt-1">
            Souhlas s marketingem oddělený od leadů — přehled pro newsletter a export CSV.
          </p>
        </div>
        <a
          href="/api/admin/subscribers/export"
          className="inline-flex items-center justify-center rounded-xl border-2 border-brand-navy px-4 py-2.5 text-sm font-semibold text-brand-navy hover:bg-brand-navy/5 focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:ring-offset-2"
        >
          Export CSV
        </a>
      </div>

      <div className="flex flex-wrap gap-2 mb-4 items-center" role="navigation" aria-label="Filtry stavu">
        <FilterLink href={subscribersHref(null, null)} active={!statusFilter && !segmentFilter}>
          Vše
        </FilterLink>
        <span className="text-xs text-brand-muted self-center px-1">Stav:</span>
        {(["active", "unsubscribed", "pending", "bounced"] as const).map((s) => (
          <FilterLink key={s} href={subscribersHref(s, segmentFilter)} active={statusFilter === s}>
            {SUBSCRIBER_STATUS_LABELS[s]}
          </FilterLink>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 mb-8 items-center" role="navigation" aria-label="Filtry segmentu">
        <span className="text-xs text-brand-muted self-center px-1">Téma:</span>
        {(["blog_audience", "calculators", "general_updates", "content_interest"] as const).map((seg) => (
          <FilterLink key={seg} href={subscribersHref(statusFilter, seg)} active={segmentFilter === seg}>
            {INTEREST_SEGMENT_LABELS[seg]}
          </FilterLink>
        ))}
      </div>

      {!rows?.length ? (
        <div className="rounded-2xl border border-dashed border-brand-border bg-white/60 px-6 py-10 text-center">
          <p className="text-brand-text font-semibold">
            {statusFilter || segmentFilter ? "V tomto výběru nikdo není" : "Zatím žádní odběratelé"}
          </p>
          <p className="text-sm text-brand-muted mt-2 max-w-md mx-auto">
            {statusFilter || segmentFilter
              ? "Zkuste jiný filtr nebo zrušte omezení — zobrazí se celý seznam."
              : "Po přihlášení k newsletteru z webu se záznamy objeví tady. Export je připravený pro CSV."}
          </p>
          {statusFilter || segmentFilter ? (
            <Link
              href="/admin/subscribers"
              className="inline-flex mt-6 text-sm font-semibold text-brand-navy hover:text-brand-cyan"
            >
              Zobrazit všechny odběratele
            </Link>
          ) : null}
        </div>
      ) : (
        <ul className="space-y-3">
          {rows.map((row) => {
            const st = row.status as SubscriberStatus;
            const seg = row.interest_segment as InterestSegment;
            const src = row.source as keyof typeof SUBSCRIBER_SOURCE_LABELS;
            return (
              <li
                key={row.id}
                className="rounded-2xl border border-brand-border bg-white p-4 shadow-sm flex flex-wrap gap-3 justify-between items-start"
              >
                <div className="min-w-0">
                  <span className="font-semibold text-brand-navy">{row.email}</span>
                  {row.name ? <span className="text-brand-muted text-sm"> · {row.name}</span> : null}
                  <div className="mt-1 text-xs text-brand-muted">
                    {SUBSCRIBER_SOURCE_LABELS[src] ?? row.source} · {INTEREST_SEGMENT_LABELS[seg] ?? seg} ·{" "}
                    {formatPostDate(row.created_at)}
                  </div>
                  <div className="mt-1 text-xs">
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 font-medium text-brand-text">
                      {SUBSCRIBER_STATUS_LABELS[st]}
                    </span>
                  </div>
                  {row.source_path ? (
                    <div className="text-[11px] text-brand-muted mt-1 break-all">{row.source_path}</div>
                  ) : null}
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <SubscriberStatusSelect id={row.id} current={st} />
                  {row.consent_marketing_at ? (
                    <span className="text-[10px] text-brand-muted">souhlas: {formatPostDate(row.consent_marketing_at)}</span>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function FilterLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`rounded-full px-3 py-1 text-xs font-semibold transition focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:ring-offset-2 ${
        active ? "bg-brand-navy text-white" : "bg-slate-100 text-brand-text hover:bg-slate-200"
      }`}
    >
      {children}
    </Link>
  );
}
