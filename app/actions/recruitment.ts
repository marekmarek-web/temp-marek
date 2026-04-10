"use server";

import { z } from "zod";
import { createAdminSupabaseClient } from "@/lib/supabase/admin";
import { isServiceRoleConfigured } from "@/lib/supabase/env";

const schema = z
  .object({
    name: z.string().trim().min(1, "Jméno je povinné").max(200),
    contact: z.string().trim().min(1, "Kontakt je povinný").max(300),
    message: z.string().trim().max(5000).optional(),
    position: z.string().trim().max(200).optional(),
    cvUrl: z.string().trim().max(2000).optional(),
    consent: z
      .boolean()
      .refine((v) => v === true, { message: "Souhlas se zpracováním údajů je povinný." }),
    pageHref: z.string().max(2000).optional(),
  })
  .superRefine((data, ctx) => {
    const u = data.cvUrl?.trim();
    if (!u) return;
    try {
      const parsedUrl = new URL(u);
      if (!/^https?:$/i.test(parsedUrl.protocol)) {
        throw new Error("not http(s)");
      }
    } catch {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Neplatný odkaz (URL).",
        path: ["cvUrl"],
      });
    }
  });

export type RecruitmentActionResult = { ok: true } | { ok: false; message: string };

export async function submitRecruitmentApplication(
  input: unknown
): Promise<RecruitmentActionResult> {
  if (!isServiceRoleConfigured()) {
    return { ok: false, message: "Odesílání přihlášek není na serveru nakonfigurováno." };
  }

  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.flatten().fieldErrors;
    const msg =
      Object.values(first).flat()[0] ?? "Zkontrolujte vyplnění formuláře.";
    return { ok: false, message: msg };
  }

  try {
    const admin = createAdminSupabaseClient();
    const { error } = await admin.from("job_applications").insert({
      name: parsed.data.name,
      contact: parsed.data.contact,
      message: parsed.data.message ?? null,
      position: parsed.data.position ?? null,
      cv_url: parsed.data.cvUrl?.trim() || null,
      consent: true,
      page_url: parsed.data.pageHref ?? null,
    });
    if (error) {
      console.error(error);
      return { ok: false, message: "Nepodařilo se uložit přihlášku. Zkuste to prosím znovu." };
    }
    return { ok: true };
  } catch {
    return { ok: false, message: "Nepodařilo se uložit přihlášku. Zkuste to prosím znovu." };
  }
}
