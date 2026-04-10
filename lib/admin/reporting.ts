/**
 * Agregace pro admin přehled (bez externího BI).
 * Data z DB — limity řádků kvůli serverless; při velkém provozu zúžit období nebo přidat SQL RPC.
 */

export const REPORTING_WINDOW_DAYS = 30;
export const REPORTING_LEADS_LIMIT = 8000;

export type TopRow = { key: string; count: number };

export type BusinessReportingSnapshot = {
  windowDays: number;
  sinceIso: string;
  leadsTotal: number;
  subscribersTotal: number;
  topLeadSources: TopRow[];
  topCalculators: TopRow[];
  topBlogLeadPaths: TopRow[];
  draftsCount: number;
  publishedCount: number;
};

type LeadRow = {
  raw_source: string | null;
  calculator_type: string | null;
  source_path: string | null;
};

function topCounts(rows: string[], limit = 8): TopRow[] {
  const m = new Map<string, number>();
  for (const r of rows) {
    const k = r || "unknown";
    m.set(k, (m.get(k) ?? 0) + 1);
  }
  return [...m.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([key, count]) => ({ key, count }));
}

function blogPathsFromLeads(paths: (string | null)[]): string[] {
  const out: string[] = [];
  for (const p of paths) {
    if (!p) continue;
    if (p.includes("/blog/")) {
      const slug = p.split("/blog/")[1]?.split(/[?#]/)[0];
      if (slug) out.push(slug.slice(0, 120));
    }
  }
  return out;
}

export function aggregateReporting(leads: LeadRow[], subscribersCount: number): Omit<BusinessReportingSnapshot, "windowDays" | "sinceIso" | "draftsCount" | "publishedCount"> {
  const sources = leads.map((l) => l.raw_source ?? "");
  const calcs = leads.map((l) => (l.calculator_type ? String(l.calculator_type) : ""));
  const blogPaths = blogPathsFromLeads(leads.map((l) => l.source_path));

  return {
    leadsTotal: leads.length,
    subscribersTotal: subscribersCount,
    topLeadSources: topCounts(sources),
    topCalculators: topCounts(calcs.filter(Boolean)),
    topBlogLeadPaths: topCounts(blogPaths),
  };
}
