"use server";

import { revalidatePath } from "next/cache";
import { requireEditor } from "@/lib/admin/require-editor";
import type { LeadStatus } from "@/lib/leads/domain";

export async function updateLeadAction(
  leadId: string,
  payload: {
    status?: LeadStatus;
    internal_notes?: string;
    assignee_id?: string | null;
    needs_follow_up?: boolean;
  },
) {
  const { supabase, user } = await requireEditor();

  const { data: prev } = await supabase.from("leads").select("status").eq("id", leadId).maybeSingle();

  const updates: Record<string, unknown> = {
    last_edited_by: user.id,
  };
  if (payload.status !== undefined) updates.status = payload.status;
  if (payload.internal_notes !== undefined) {
    updates.internal_notes = payload.internal_notes.trim().length ? payload.internal_notes.trim() : null;
  }
  if (payload.assignee_id !== undefined) updates.assignee_id = payload.assignee_id;
  if (payload.needs_follow_up !== undefined) updates.needs_follow_up = payload.needs_follow_up;

  const { error } = await supabase.from("leads").update(updates).eq("id", leadId);
  if (error) throw new Error(error.message);

  if (payload.status !== undefined && prev?.status !== payload.status) {
    await supabase.from("lead_status_history").insert({
      lead_id: leadId,
      old_status: prev?.status ?? null,
      new_status: payload.status,
      changed_by: user.id,
    });
  }

  revalidatePath("/admin/leads");
  revalidatePath(`/admin/leads/${leadId}`);
}
