import Link from "next/link";
import { aggregateReporting, REPORTING_LEADS_LIMIT, REPORTING_WINDOW_DAYS } from "@/lib/admin/reporting";
import { requireEditor } from "@/lib/admin/require-editor";
import { POST_DISTRIBUTION_LABELS } from "@/lib/content/distribution";
import { formatPostDate } from "@/lib/posts";

type Props = { searchParams: Promise<{ notice?: string }> };

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const REPORTING_MS = REPORTING_WINDOW_DAYS * 24 * 60 * 60 * 1000;

export default async function AdminHomePage({ searchParams }: Props) {
  const sp = await searchParams;
  const { supabase } = await requireEditor();

  const since = new Date(Date.now() - WEEK_MS).toISOString();
  const reportingSince = new Date(Date.now() - REPORTING_MS).toISOString();

  const [
    { count: draftCount },
    { count: publishedCount },
    { count: leadsWeek, error: leadsErr },
    { count: subsWeek, error: subsErr },
    { count: newLeadsCount, error: newLeadsErr },
    { count: awaitingDist, error: distErr },
    { data: recent },
    { data: awaitingPosts },
    { data: reportingLeads, error: reportingLeadsErr },
    { count: subsReporting, error: subsReportingErr },
  ] = await Promise.all([
    supabase.from("posts").select("id", { count: "exact", head: true }).eq("published", false),
    supabase.from("posts").select("id", { count: "exact", head: true }).eq("published", true),
    supabase.from("leads").select("id", { count: "exact", head: true }).gte("created_at", since),
    supabase.from("subscribers").select("id", { count: "exact", head: true }).gte("created_at", since),
    supabase.from("leads").select("id", { count: "exact", head: true }).eq("status", "new"),
    supabase
      .from("posts")
      .select("id", { count: "exact", head: true })
      .eq("published", true)
      .eq("distribution_status", "awaiting_distribution"),
    supabase
      .from("posts")
      .select("id, slug, title, published, updated_at, author_name")
      .order("updated_at", { ascending: false })
      .limit(6),
    supabase
      .from("posts")
      .select("id, slug, title, distribution_status")
      .eq("published", true)
      .eq("distribution_status", "awaiting_distribution")
      .order("published_at", { ascending: false })
      .limit(5),
    supabase
      .from("leads")
      .select("raw_source, calculator_type, source_path")
      .gte("created_at", reportingSince)
      .limit(REPORTING_LEADS_LIMIT),
    supabase.from("subscribers").select("id", { count: "exact", head: true }).gte("created_at", reportingSince),
  ]);

  const reporting =
    !reportingLeadsErr && !subsReportingErr
      ? aggregateReporting(reportingLeads ?? [], subsReporting ?? 0)
      : null;

  const leadsOk = !leadsErr;
  const subsOk = !subsErr;
  const newLeadsOk = !newLeadsErr;
  const distOk = !distErr;

  return (
    <div>
      {sp.notice === "no-admin" ? (
        <p className="mb-6 text-sm rounded-xl bg-amber-50 text-amber-900 px-4 py-3 border border-amber-200">
          Tato sekce je jen pro roli <strong>admin</strong>. Články můžete spravovat v části Články.
        </p>
      ) : null}

      <h1 className="text-2xl font-bold text-brand-text mb-2">Přehled</h1>
      <p className="text-brand-muted mb-8 text-sm max-w-2xl">
        Co je nového a co čeká na váš další krok — obsah, leady a odběratelé na jedné stránce.
      </p>

      <section className="rounded-2xl border border-brand-navy/15 bg-gradient-to-br from-white to-slate-50/90 p-5 sm:p-6 shadow-sm mb-8">
        <h2 className="text-sm font-bold uppercase tracking-wider text-brand-muted mb-4">Priorita (dnes)</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/admin/leads?status=new"
            className="rounded-xl border border-brand-border bg-white p-4 shadow-sm hover:border-brand-cyan/50 hover:shadow-md transition focus:outline-none focus:ring-2 focus:ring-brand-cyan"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted">Nové leady</p>
            <p className="text-2xl font-bold text-brand-navy mt-1">{newLeadsOk ? newLeadsCount ?? 0 : "—"}</p>
            <p className="text-xs text-brand-cyan font-semibold mt-2">Otevřít inbox →</p>
          </Link>
          <Link
            href="/admin/leads?queue=1"
            className="rounded-xl border border-brand-border bg-white p-4 shadow-sm hover:border-brand-cyan/50 hover:shadow-md transition focus:outline-none focus:ring-2 focus:ring-brand-cyan"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted">Fronta akce</p>
            <p className="text-sm text-brand-muted mt-2 leading-snug">Leady označené k follow-up — kontakt nebo uzavření.</p>
            <p className="text-xs text-brand-cyan font-semibold mt-3">Fronta →</p>
          </Link>
          <div className="rounded-xl border border-brand-border bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted">Odběratelé (7 dní)</p>
            <p className="text-2xl font-bold text-brand-navy mt-1">{subsOk ? subsWeek ?? 0 : "—"}</p>
            {subsOk ? (
              <Link href="/admin/subscribers" className="text-xs text-brand-cyan font-semibold mt-2 inline-block">
                Audience →
              </Link>
            ) : (
              <p className="text-[10px] text-amber-800 mt-2">Kontrola migrace</p>
            )}
          </div>
          <div className="rounded-xl border border-brand-border bg-white p-4 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted">Čeká na distribuci</p>
            <p className="text-2xl font-bold text-brand-navy mt-1">{distOk ? awaitingDist ?? 0 : "—"}</p>
            {distOk ? (
              <Link href="/admin/posts" className="text-xs text-brand-cyan font-semibold mt-2 inline-block">
                Články →
              </Link>
            ) : (
              <p className="text-[10px] text-amber-800 mt-2">Migrace sloupců u článků</p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-brand-border/60">
          <Link
            href="/admin/posts/new"
            className="inline-flex items-center py-2.5 px-4 rounded-xl bg-brand-navy text-white font-semibold text-sm hover:bg-brand-navy/90 focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:ring-offset-2"
          >
            Nový článek
          </Link>
          <Link
            href="/admin/leads"
            className="inline-flex items-center py-2.5 px-4 rounded-xl border-2 border-brand-navy text-brand-navy font-semibold text-sm hover:bg-brand-navy/5 focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:ring-offset-2"
          >
            Všechny leady
          </Link>
          <Link
            href="/admin/subscribers"
            className="inline-flex items-center py-2.5 px-4 rounded-xl border-2 border-brand-border text-brand-text font-semibold text-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:ring-offset-2"
          >
            Odběratelé
          </Link>
        </div>
        {distOk && awaitingPosts?.length ? (
          <div className="mt-6 pt-6 border-t border-brand-border/60">
            <p className="text-xs font-bold uppercase tracking-wider text-brand-muted mb-2">Rychle otevřít — distribuce</p>
            <ul className="space-y-1.5 text-sm">
              {awaitingPosts.map((p) => (
                <li key={p.id}>
                  <Link href={`/admin/posts/${p.id}/edit`} className="font-medium text-brand-navy hover:text-brand-cyan">
                    {p.title}
                  </Link>
                  <span className="text-xs text-brand-muted ml-2">
                    {POST_DISTRIBUTION_LABELS[(p.distribution_status as keyof typeof POST_DISTRIBUTION_LABELS) ?? "none"]}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </section>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="rounded-2xl border border-brand-border bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted">Koncepty</p>
          <p className="text-2xl font-bold text-brand-navy mt-1">{draftCount ?? 0}</p>
          <Link href="/admin/posts" className="text-xs font-semibold text-brand-cyan hover:underline mt-2 inline-block">
            Články →
          </Link>
        </div>
        <div className="rounded-2xl border border-brand-border bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted">Publikováno</p>
          <p className="text-2xl font-bold text-brand-navy mt-1">{publishedCount ?? 0}</p>
        </div>
        <div className="rounded-2xl border border-brand-border bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted">Leady (7 dní)</p>
          <p className="text-2xl font-bold text-brand-navy mt-1">{leadsOk ? leadsWeek ?? 0 : "—"}</p>
          {!leadsOk ? (
            <p className="text-[10px] text-amber-800 mt-1">Nelze načíst</p>
          ) : (
            <Link href="/admin/leads" className="text-xs font-semibold text-brand-cyan hover:underline mt-2 inline-block">
              Inbox →
            </Link>
          )}
        </div>
        <div className="rounded-2xl border border-brand-border bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-muted">Tip</p>
          <p className="text-sm text-brand-muted mt-2 leading-snug">
            <strong className="text-brand-text">Nové</strong> leady řešte nejdřív; u článků zkontrolujte stav distribuce před sdílením.
          </p>
        </div>
      </div>

      {reporting ? (
        <details className="rounded-2xl border border-brand-border bg-white p-5 sm:p-6 shadow-sm mb-10 group">
          <summary className="text-lg font-bold text-brand-text cursor-pointer list-none flex items-center justify-between gap-2">
            <span>Obchodní přehled ({REPORTING_WINDOW_DAYS} dní)</span>
            <span className="text-xs font-normal text-brand-muted group-open:hidden">rozbalit</span>
            <span className="text-xs font-normal text-brand-muted hidden group-open:inline">sbalit</span>
          </summary>
          <p className="text-xs text-brand-muted mb-6 mt-2">
            Agregace z databáze (ne analytika webu). Podrobnosti:{" "}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-[11px] text-brand-navy">docs/business-reporting-playbook.md</code>
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="rounded-xl border border-brand-border bg-slate-50/80 px-4 py-3">
              <p className="text-xs font-semibold uppercase text-brand-muted">Leady celkem</p>
              <p className="text-2xl font-bold text-brand-navy">{reporting.leadsTotal}</p>
            </div>
            <div className="rounded-xl border border-brand-border bg-slate-50/80 px-4 py-3">
              <p className="text-xs font-semibold uppercase text-brand-muted">Noví odběratelé</p>
              <p className="text-2xl font-bold text-brand-navy">{reporting.subscribersTotal}</p>
            </div>
            <div className="rounded-xl border border-brand-border bg-slate-50/80 px-4 py-3">
              <p className="text-xs font-semibold uppercase text-brand-muted">Koncepty článků</p>
              <p className="text-2xl font-bold text-brand-navy">{draftCount ?? 0}</p>
            </div>
            <div className="rounded-xl border border-brand-border bg-slate-50/80 px-4 py-3">
              <p className="text-xs font-semibold uppercase text-brand-muted">Publikováno</p>
              <p className="text-2xl font-bold text-brand-navy">{publishedCount ?? 0}</p>
            </div>
          </div>
          <div className="grid lg:grid-cols-3 gap-6 text-sm">
            <div>
              <p className="font-bold text-brand-text mb-2">Top zdroje leadů</p>
              <ul className="space-y-1.5 text-brand-muted">
                {reporting.topLeadSources.length ? (
                  reporting.topLeadSources.map((r) => (
                    <li key={r.key} className="flex justify-between gap-2">
                      <span className="truncate font-medium text-brand-text">{r.key}</span>
                      <span className="shrink-0 tabular-nums">{r.count}</span>
                    </li>
                  ))
                ) : (
                  <li>—</li>
                )}
              </ul>
            </div>
            <div>
              <p className="font-bold text-brand-text mb-2">Kalkulačky</p>
              <ul className="space-y-1.5 text-brand-muted">
                {reporting.topCalculators.length ? (
                  reporting.topCalculators.map((r) => (
                    <li key={r.key} className="flex justify-between gap-2">
                      <span className="truncate font-medium text-brand-text">{r.key}</span>
                      <span className="shrink-0 tabular-nums">{r.count}</span>
                    </li>
                  ))
                ) : (
                  <li>—</li>
                )}
              </ul>
            </div>
            <div>
              <p className="font-bold text-brand-text mb-2">Blog — cesty</p>
              <ul className="space-y-1.5 text-brand-muted">
                {reporting.topBlogLeadPaths.length ? (
                  reporting.topBlogLeadPaths.map((r) => (
                    <li key={r.key} className="flex justify-between gap-2">
                      <span className="truncate font-medium text-brand-text">{r.key}</span>
                      <span className="shrink-0 tabular-nums">{r.count}</span>
                    </li>
                  ))
                ) : (
                  <li>—</li>
                )}
              </ul>
            </div>
          </div>
        </details>
      ) : (
        <p className="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-10">
          Obchodní přehled se nepodařilo načíst (oprávnění nebo migrace tabulek).
        </p>
      )}

      <h2 className="text-lg font-bold text-brand-text mb-3">Naposledy upravené články</h2>
      {!recent?.length ? (
        <p className="text-brand-muted text-sm">Zatím žádné záznamy.</p>
      ) : (
        <ul className="space-y-2">
          {recent.map((p) => (
            <li
              key={p.id}
              className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-brand-border bg-white px-4 py-3 text-sm"
            >
              <Link
                href={`/admin/posts/${p.id}/edit`}
                className="font-semibold text-brand-navy hover:text-brand-cyan focus:outline-none focus:ring-2 focus:ring-brand-cyan rounded"
              >
                {p.title}
              </Link>
              <span className="text-xs text-brand-muted">
                {p.published ? "publikováno" : "koncept"} · {formatPostDate(p.updated_at)}
                {p.author_name ? ` · ${p.author_name}` : ""}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
