export const FORMSUBMIT_AJAX =
  process.env.NEXT_PUBLIC_FORMSUBMIT_URL ??
  "https://formsubmit.co/ajax/pribramsky@premiumbrokers.cz";

export type FormSubmitResponse = Record<string, unknown>;

export async function submitToFormSubmit(
  payload: Record<string, unknown>
): Promise<FormSubmitResponse> {
  const res = await fetch(FORMSUBMIT_AJAX, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Network error");
  return res.json().catch(() => ({}));
}

export function pageUrl(): string {
  if (typeof window === "undefined") return "";
  return window.location.href;
}

export function buildMainLeadPayload(input: {
  name: string;
  contact: string;
  phone?: string;
  topic: string;
  message?: string;
  consent: boolean;
  pageHref: string;
}) {
  const phone = (input.phone ?? "").trim();
  let contact = input.contact.trim();
  if (phone) contact = contact ? `${contact} | ${phone}` : phone;
  return {
    _subject: "Nezávazná konzultace – web",
    name: input.name.trim(),
    contact,
    topic: input.topic,
    message: input.message ?? "",
    phone,
    consent: input.consent ? "ano" : "ne",
    page: input.pageHref,
    created_at: new Date().toISOString(),
  };
}

export function buildFooterLeadPayload(input: {
  name: string;
  email: string;
  phone?: string;
  interest: string;
  pageHref: string;
}) {
  return {
    _subject: "Nezávazná konzultace – footer",
    name: input.name.trim(),
    email: input.email.trim(),
    phone: (input.phone ?? "").trim(),
    interest: input.interest,
    source: "footer-lead",
    page: input.pageHref,
    created_at: new Date().toISOString(),
  };
}

export function buildContactPagePayload(input: {
  name: string;
  contact: string;
  message: string;
  consent: boolean;
  pageHref: string;
}) {
  return {
    _subject: "Kontakt – web",
    name: input.name.trim(),
    contact: input.contact.trim(),
    message: input.message.trim(),
    consent: input.consent ? "ano" : "ne",
    page: input.pageHref,
    created_at: new Date().toISOString(),
  };
}
