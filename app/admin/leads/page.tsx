import Link from "next/link";
import { requireEditor } from "@/lib/admin/require-editor";
import {
  LEAD_CATEGORY_LABELS,
  LEAD_SOURCE_TYPE_LABELS,
  LEAD_STATUSES,
  LEAD_STATUS_LABELS,
  type LeadStatus,
} from "@/lib/leads/domain";
import { formatPostDate } from "@/lib/format/date";

type Search = { status?: string; queue?: string };

const STATUS_ORDER: LeadStatus[] = [
  "new",
  ...LEAD_STATUSES.filter((s) => s !== "new"),
];

function isLeadStatus(s: string | undefined): s is LeadStatus {
  return s !== undefined && (LEAD_STATUSES as readonly string[]).includes(s);
}

function leadsHref(status: string | null, queueOnly: boolean): string {
  const p = new URLSearchParams();
  if (status) p.set("status", status);
  if (queueOnly) p.set("queue", "1");
  const q = p.toString();
  return q ? `/admin/leads?${q}` : "/admin/leads";
}

export default async function AdminLeadsPage({ searchParams }: { searchParams: Promise<Search> }) {
  const sp = await searchParams;
  const filter = isLeadStatus(sp.status) ? sp.status : null;
  const queueOnly = sp.queue === "1";
  const { supabase } = await requireEditor();

  let q = supabase
    .from("leads")
    .select(
      "id, name, email, phone, status, created_at, needs_follow_up, possible_duplicate, lead_category, source_type, calculator_type, source_path, raw_source",
    )
    .order("created_at", { ascending: false });
  if (filter) {
    q = q.eq("status", filter);
  }
  if (queueOnly) {
    q = q.eq("needs_follow_up", true);
  }

  const { data: leads, error } = await q;

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-900" role="alert">
        <p className="font-semibold">Leady se nepodařilo načíst</p>
        <p className="mt-1 text-red-800/90">
          Zkuste obnovit stránku. Jde o přístup k databázi nebo o rozšíření tabulky leadů po migraci.
        </p>
        <p className="mt-2 font-mono text-xs opacity-80">{error.message}</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-brand-text">Leady</h1>
          <p className="text-sm text-brand-muted mt-1">
            Poptávky z webu. <strong className="font-semibold text-brand-text">Nový</strong> = ještě neobsloužené;
            <span className="whitespace-nowrap"> </span>
            <strong className="font-semibold text-brand-text">Fronta akce</strong> = čeká na váš další krok (follow-up).
          </p>
        </div>
        <a
          href="/api/admin/leads/export"
          className="inline-flex items-center justify-center rounded-xl border-2 border-brand-navy px-4 py-2.5 text-sm font-semibold text-brand-navy hover:bg-brand-navy/5 focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:ring-offset-2"
        >
          Export CSV
        </a>
      </div>

      <div className="flex flex-wrap gap-2 mb-6 items-center" role="navigation" aria-label="Filtry leadů">
        <FilterChip href={leadsHref(null, false)} active={filter === null && !queueOnly}>
          Vše
        </FilterChip>
        <FilterChip href={leadsHref(filter, true)} active={queueOnly}>
          Fronta akce
        </FilterChip>
        {STATUS_ORDER.map((s) => (
          <FilterChip key={s} href={leadsHref(s, queueOnly)} active={filter === s}>
            {LEAD_STATUS_LABELS[s]}
          </FilterChip>
        ))}
      </div>

      {!leads?.length ? (
        <div className="rounded-2xl border border-dashed border-brand-border bg-white/60 px-6 py-10 text-center">
          <p className="text-brand-text font-semibold">
            {filter || queueOnly ? "V tomto filtru zatím nic není" : "Zatím žádné leady"}
          </p>
          <p className="text-sm text-brand-muted mt-2 max-w-md mx-auto">
            {filter || queueOnly
              ? "Zkuste jiný filtr nebo zrušte omezení — zobrazí se všechny záznamy."
              : "Jakmile někdo odešle formulář na webu, objeví se tady. Můžete si nechat posílat kopii e-mailem podle nastavení v provozu."}
          </p>
          {filter || queueOnly ? (
            <Link
              href="/admin/leads"
              className="inline-flex mt-6 text-sm font-semibold text-brand-navy hover:text-brand-cyan"
            >
              Zobrazit všechny leady
            </Link>
          ) : null}
        </div>
      ) : (
        <ul className="space-y-3">
          {leads.map((row) => {
            const st = row.status as LeadStatus;
            const src = row.source_type as keyof typeof LEAD_SOURCE_TYPE_LABELS;
            const cat = row.lead_category as keyof typeof LEAD_CATEGORY_LABELS;
            const isNew = st === "new";
            return (
              <li key={row.id}>
                <Link
                  href={`/admin/leads/${row.id}`}
                  className={`block rounded-2xl border bg-white p-4 shadow-sm transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:ring-offset-2 ${
                    isNew ? "border-brand-cyan/50 ring-1 ring-brand-cyan/20" : "border-brand-border hover:border-brand-cyan/40"
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <span className="font-semibold text-brand-navy">{row.name}</span>
                      {isNew ? (
                        <span className="ml-2 rounded-full bg-brand-navy px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                          Nový
                        </span>
                      ) : null}
                      {row.possible_duplicate ? (
                        <span className="ml-2 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-900">
                          duplicita?
                        </span>
                      ) : null}
                      {row.needs_follow_up !== false ? (
                        <span className="ml-2 rounded-full bg-cyan-50 px-2 py-0.5 text-xs font-medium text-brand-navy">
                          čeká na akci
                        </span>
                      ) : null}
                      <div className="mt-1 text-xs text-brand-muted">
                        {[row.email, row.phone].filter(Boolean).join(" · ") || "—"}
                      </div>
                    </div>
                    <div className="text-right text-xs">
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 font-medium text-brand-text">
                        {LEAD_STATUS_LABELS[st]}
                      </span>
                      <div className="mt-1 text-brand-muted">{formatPostDate(row.created_at)}</div>
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-brand-muted">
                    <span>{LEAD_CATEGORY_LABELS[cat] ?? cat}</span>
                    <span>·</span>
                    <span>{LEAD_SOURCE_TYPE_LABELS[src] ?? src}</span>
                    {row.calculator_type ? (
                      <>
                        <span>·</span>
                        <span className="font-mono">{row.calculator_type}</span>
                      </>
                    ) : null}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function FilterChip({
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
