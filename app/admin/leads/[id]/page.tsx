import { notFound } from "next/navigation";
import { AdminBreadcrumb } from "@/components/admin/AdminBreadcrumb";
import { requireEditor } from "@/lib/admin/require-editor";
import { LeadDetailForm, type LeadDetailRow, type StatusHistoryRow } from "@/components/admin/LeadDetailForm";
import type { LeadCategory, LeadSourceType, LeadStatus } from "@/lib/leads/domain";

type Props = { params: Promise<{ id: string }> };

export default async function AdminLeadDetailPage({ params }: Props) {
  const { id } = await params;
  const { supabase } = await requireEditor();

  const { data: row, error } = await supabase.from("leads").select("*").eq("id", id).maybeSingle();

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-900">
        Nepodařilo se načíst lead: {error.message}
      </div>
    );
  }
  if (!row) {
    notFound();
  }

  const { data: historyRaw } = await supabase
    .from("lead_status_history")
    .select("id, old_status, new_status, changed_by, created_at")
    .eq("lead_id", id)
    .order("created_at", { ascending: false });

  const { data: staff } = await supabase.from("profiles").select("id, full_name").order("full_name", { ascending: true });

  const history = (historyRaw ?? []) as StatusHistoryRow[];

  const ids = new Set<string>();
  if (row.last_edited_by) ids.add(row.last_edited_by);
  for (const h of history) {
    if (h.changed_by) ids.add(h.changed_by);
  }
  const idList = [...ids];
  let editorNames: Record<string, string> = {};
  if (idList.length) {
    const { data: editors } = await supabase.from("profiles").select("id, full_name").in("id", idList);
    editorNames = Object.fromEntries(
      (editors ?? []).map((p) => [p.id, p.full_name?.trim() || p.id.slice(0, 8)]),
    );
  }

  const lead: LeadDetailRow = {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    note: row.note,
    source_type: row.source_type as LeadSourceType,
    raw_source: row.raw_source,
    source_path: row.source_path,
    lead_category: row.lead_category as LeadCategory,
    calculator_type: row.calculator_type,
    result_summary: row.result_summary,
    topic: row.topic,
    interest: row.interest,
    consent: row.consent,
    status: row.status as LeadStatus,
    assignee_id: row.assignee_id,
    internal_notes: row.internal_notes,
    possible_duplicate: row.possible_duplicate,
    duplicate_of_id: row.duplicate_of_id,
    attachment_filename: row.attachment_filename,
    created_at: row.created_at,
    updated_at: row.updated_at,
    last_edited_by: row.last_edited_by,
    needs_follow_up: row.needs_follow_up ?? true,
  };

  return (
    <div>
      <AdminBreadcrumb
        items={[
          { label: "Přehled", href: "/admin" },
          { label: "Leady", href: "/admin/leads" },
          { label: lead.name },
        ]}
      />
      <h1 className="text-2xl font-bold text-brand-text mb-6">{lead.name}</h1>
      <LeadDetailForm lead={lead} staff={staff ?? []} history={history} editorNames={editorNames} />
    </div>
  );
}
