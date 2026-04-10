"use server";

import { revalidatePath } from "next/cache";
import { requireEditor } from "@/lib/admin/require-editor";
import type { SubscriberStatus } from "@/lib/subscribers/domain";

export async function updateSubscriberStatusAction(subscriberId: string, status: SubscriberStatus) {
  const { supabase } = await requireEditor();
  const now = new Date().toISOString();
  const updates: Record<string, unknown> = { status };
  if (status === "unsubscribed") {
    updates.unsubscribed_at = now;
  } else if (status === "active") {
    updates.unsubscribed_at = null;
  }
  const { error } = await supabase.from("subscribers").update(updates).eq("id", subscriberId);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/subscribers");
}
