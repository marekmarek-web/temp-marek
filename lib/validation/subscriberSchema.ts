import { z } from "zod";
import { INTEREST_SEGMENTS, SUBSCRIBER_SOURCES } from "@/lib/subscribers/domain";

export const subscriberBodySchema = z
  .object({
    email: z.string().trim().email("Zadejte platný e-mail."),
    name: z.string().trim().max(120).optional(),
    source: z.enum(SUBSCRIBER_SOURCES as unknown as [string, ...string[]]),
    interestSegment: z.enum(INTEREST_SEGMENTS as unknown as [string, ...string[]]).default("general_updates"),
    sourcePath: z.string().max(500).optional(),
    consentMarketing: z
      .boolean()
      .refine((v) => v === true, { message: "Potvrďte souhlas se zasíláním novinek." }),
    consentTextVersion: z.string().max(40).optional(),
    companyWebsite: z.string().max(120).optional(),
    formOpenedAt: z.number().optional(),
    relatedLeadId: z.string().uuid().optional(),
    /** Volitelné technické klíče (UTM, landing_path) — sloučí se s attribution. */
    metadata: z.record(z.string(), z.string()).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.metadata && Object.keys(data.metadata).length > 20) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Příliš mnoho položek v metadatech.", path: ["metadata"] });
    }
  });

export type SubscriberBody = z.infer<typeof subscriberBodySchema>;
