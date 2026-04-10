import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { isServiceRoleConfigured, isSupabaseConfigured } from "@/lib/supabase/env";
import type { LeadInsertRow } from "@/lib/leads/mapPayload";

const DEDUP_WINDOW_MS = 24 * 60 * 60 * 1000;

async function findRecentDuplicateId(row: LeadInsertRow): Promise<string | null> {
  const admin = createAdminSupabaseClient();
  const since = new Date(Date.now() - DEDUP_WINDOW_MS).toISOString();

  if (row.email.length > 0) {
    const { data } = await admin
      .from("leads")
      .select("id")
      .eq("email", row.email)
      .gte("created_at", since)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (data?.id) return data.id;
  }

  if (row.phone_normalized) {
    const { data } = await admin
      .from("leads")
      .select("id")
      .eq("phone_normalized", row.phone_normalized)
      .gte("created_at", since)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (data?.id) return data.id;
  }

  return null;
}

export async function insertLeadRow(row: LeadInsertRow): Promise<{ id: string; duplicateOfId: string | null }> {
  if (!isSupabaseConfigured() || !isServiceRoleConfigured()) {
    throw new Error("LEADS_DB_NOT_CONFIGURED");
  }

  const dupId = await findRecentDuplicateId(row);
  const insertPayload = {
    ...row,
    duplicate_of_id: dupId,
    possible_duplicate: Boolean(dupId),
    metadata: row.metadata,
  };

  const admin = createAdminSupabaseClient();
  const { data, error } = await admin.from("leads").insert(insertPayload).select("id").single();

  if (error) throw error;
  if (!data?.id) throw new Error("Lead insert returned no id");

  return { id: data.id, duplicateOfId: dupId };
}
