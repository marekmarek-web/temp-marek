import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { isServiceRoleConfigured, isSupabaseConfigured } from "@/lib/supabase/env";
import { normalizeEmail } from "@/lib/leads/normalize";
import {
  CONSENT_TEXT_VERSION,
  type InterestSegment,
  type SubscriberSource,
} from "@/lib/subscribers/domain";
import type { SubscriberBody } from "@/lib/validation/subscriberSchema";

export type SubscriberInsertResult = { id: string; updated: boolean };

export async function upsertSubscriberFromBody(body: SubscriberBody): Promise<SubscriberInsertResult> {
  if (!isSupabaseConfigured() || !isServiceRoleConfigured()) {
    throw new Error("SUBSCRIBERS_DB_NOT_CONFIGURED");
  }

  const admin = createAdminSupabaseClient();
  const emailNorm = normalizeEmail(body.email);
  const now = new Date().toISOString();
  const segment = (body.interestSegment ?? "general_updates") as InterestSegment;
  const consentVersion = body.consentTextVersion?.trim() || CONSENT_TEXT_VERSION;

  const { data: existing } = await admin.from("subscribers").select("id, status, metadata").eq("email", emailNorm).maybeSingle();

  const metaExtra = body.relatedLeadId ? { related_lead_id: body.relatedLeadId } : {};
  const fromBody = body.metadata && typeof body.metadata === "object" ? body.metadata : {};
  const prevMeta =
    existing?.metadata && typeof existing.metadata === "object" && !Array.isArray(existing.metadata)
      ? (existing.metadata as Record<string, unknown>)
      : {};
  const mergedMetadata = { ...prevMeta, ...metaExtra, ...fromBody };

  const row = {
    email: emailNorm,
    name: body.name?.trim() || null,
    source: body.source as SubscriberSource,
    raw_source: body.source,
    source_path: body.sourcePath?.trim() || null,
    interest_segment: segment,
    consent_marketing: true,
    consent_marketing_at: now,
    consent_text_version: consentVersion,
    status: "active" as const,
    unsubscribed_at: null as string | null,
    metadata: mergedMetadata,
    related_lead_id: body.relatedLeadId ?? null,
    updated_at: now,
  };

  if (existing?.id) {
    const { data, error } = await admin.from("subscribers").update(row).eq("id", existing.id).select("id").single();
    if (error) throw error;
    if (!data?.id) throw new Error("Subscriber update returned no id");
    return { id: data.id, updated: true };
  }

  const { data, error } = await admin.from("subscribers").insert(row).select("id").single();
  if (error) throw error;
  if (!data?.id) throw new Error("Subscriber insert returned no id");
  return { id: data.id, updated: false };
}
