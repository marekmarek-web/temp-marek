"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { updateLeadAction } from "@/app/admin/leads/actions";
import {
  LEAD_CATEGORY_LABELS,
  LEAD_SOURCE_TYPE_LABELS,
  LEAD_STATUSES,
  LEAD_STATUS_LABELS,
  type LeadCategory,
  type LeadSourceType,
  type LeadStatus,
} from "@/lib/leads/domain";
import { formatPostDate } from "@/lib/format/date";

const CALC_LABELS: Record<string, string> = {
  pension: "Penze",
  life: "Život",
  mortgage: "Hypotéka",
  investment: "Investice",
};

export type LeadDetailRow = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  note: string | null;
  source_type: LeadSourceType;
  raw_source: string | null;
  source_path: string | null;
  lead_category: LeadCategory;
  calculator_type: string | null;
  result_summary: string | null;
  topic: string | null;
  interest: string | null;
  consent: boolean | null;
  status: LeadStatus;
  assignee_id: string | null;
  internal_notes: string | null;
  possible_duplicate: boolean;
  duplicate_of_id: string | null;
  attachment_filename: string | null;
  created_at: string;
  updated_at: string;
  last_edited_by: string | null;
  needs_follow_up: boolean;
};

export type StatusHistoryRow = {
  id: string;
  old_status: string | null;
  new_status: string;
  changed_by: string | null;
  created_at: string;
};

export type StaffOption = { id: string; full_name: string | null };

type Props = {
  lead: LeadDetailRow;
  staff: StaffOption[];
  history: StatusHistoryRow[];
  editorNames: Record<string, string>;
};

export function LeadDetailForm({ lead, staff, history, editorNames }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [savedOk, setSavedOk] = useState(false);
  const savedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (savedTimer.current) clearTimeout(savedTimer.current);
    };
  }, []);
  const [status, setStatus] = useState<LeadStatus>(lead.status);
  const [internalNotes, setInternalNotes] = useState(lead.internal_notes ?? "");
  const [assigneeId, setAssigneeId] = useState<string | null>(lead.assignee_id);
  const [needsFollowUp, setNeedsFollowUp] = useState(lead.needs_follow_up);

  function save() {
    setError(null);
    setSavedOk(false);
    startTransition(async () => {
      try {
        await updateLeadAction(lead.id, {
          status,
          internal_notes: internalNotes,
          assignee_id: assigneeId,
          needs_follow_up: needsFollowUp,
        });
        router.refresh();
        setSavedOk(true);
        if (savedTimer.current) clearTimeout(savedTimer.current);
        savedTimer.current = setTimeout(() => setSavedOk(false), 5000);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Uložení se nepodařilo.");
      }
    });
  }

  const mail = lead.email?.trim();
  const tel = lead.phone?.trim();

  return (
    <div className="space-y-8">
      {lead.possible_duplicate ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950">
          <strong>Možná duplicita</strong> (stejný e-mail/telefon v posledních 24 h).
          {lead.duplicate_of_id ? (
            <>
              {" "}
              <Link href={`/admin/leads/${lead.duplicate_of_id}`} className="font-semibold underline">
                Otevřít starší lead
              </Link>
            </>
          ) : null}
        </div>
      ) : null}

      <div className="grid gap-6 sm:grid-cols-2">
        <section className="rounded-2xl border border-brand-border bg-white p-5 shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-wide text-brand-muted mb-3">Kontakt</h2>
          <dl className="space-y-2 text-sm">
            <div>
              <dt className="text-brand-muted">Jméno</dt>
              <dd className="font-semibold text-brand-text">{lead.name}</dd>
            </div>
            {mail ? (
              <div>
                <dt className="text-brand-muted">E-mail</dt>
                <dd>
                  <a className="text-brand-navy hover:underline" href={`mailto:${mail}`}>
                    {mail}
                  </a>
                </dd>
              </div>
            ) : null}
            {tel ? (
              <div>
                <dt className="text-brand-muted">Telefon</dt>
                <dd>
                  <a className="text-brand-navy hover:underline" href={`tel:${tel.replace(/\s/g, "")}`}>
                    {tel}
                  </a>
                </dd>
              </div>
            ) : null}
            {!mail && !tel ? (
              <p className="text-xs text-brand-muted">Bez e-mailu a telefonu (neobvyklé).</p>
            ) : null}
          </dl>
          <div className="mt-4 flex flex-wrap gap-2">
            {mail ? (
              <a
                href={`mailto:${mail}`}
                className="inline-flex rounded-lg border border-brand-border px-3 py-1.5 text-xs font-semibold text-brand-navy hover:bg-slate-50"
              >
                Napsat e-mail
              </a>
            ) : null}
            {tel ? (
              <a
                href={`tel:${tel.replace(/\s/g, "")}`}
                className="inline-flex rounded-lg border border-brand-border px-3 py-1.5 text-xs font-semibold text-brand-navy hover:bg-slate-50"
              >
                Zavolat
              </a>
            ) : null}
          </div>
        </section>

        <section className="rounded-2xl border border-brand-border bg-white p-5 shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-wide text-brand-muted mb-3">Zdroj a kontext</h2>
          <dl className="space-y-2 text-sm">
            <div>
              <dt className="text-brand-muted">Typ zdroje</dt>
              <dd>{LEAD_SOURCE_TYPE_LABELS[lead.source_type]}</dd>
            </div>
            {lead.raw_source ? (
              <div>
                <dt className="text-brand-muted">Raw source</dt>
                <dd className="font-mono text-xs">{lead.raw_source}</dd>
              </div>
            ) : null}
            <div>
              <dt className="text-brand-muted">Kategorie</dt>
              <dd>{LEAD_CATEGORY_LABELS[lead.lead_category]}</dd>
            </div>
            {lead.calculator_type ? (
              <div>
                <dt className="text-brand-muted">Kalkulačka</dt>
                <dd>{CALC_LABELS[lead.calculator_type] ?? lead.calculator_type}</dd>
              </div>
            ) : null}
            {lead.source_path ? (
              <div>
                <dt className="text-brand-muted">Stránka</dt>
                <dd className="break-all text-xs">{lead.source_path}</dd>
              </div>
            ) : null}
            {lead.topic ? (
              <div>
                <dt className="text-brand-muted">Téma</dt>
                <dd>{lead.topic}</dd>
              </div>
            ) : null}
            {lead.interest ? (
              <div>
                <dt className="text-brand-muted">Zájem</dt>
                <dd>{lead.interest}</dd>
              </div>
            ) : null}
            {lead.attachment_filename ? (
              <div>
                <dt className="text-brand-muted">Příloha</dt>
                <dd className="text-xs">{lead.attachment_filename}</dd>
              </div>
            ) : null}
          </dl>
        </section>
      </div>

      {lead.note ? (
        <section className="rounded-2xl border border-brand-border bg-white p-5 shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-wide text-brand-muted mb-2">Zpráva od uživatele</h2>
          <p className="text-sm whitespace-pre-wrap text-brand-text">{lead.note}</p>
        </section>
      ) : null}

      {lead.result_summary ? (
        <section className="rounded-2xl border border-brand-border bg-white p-5 shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-wide text-brand-muted mb-2">Souhrn / kontext</h2>
          <p className="text-sm whitespace-pre-wrap text-brand-text">{lead.result_summary}</p>
        </section>
      ) : null}

      <section className="rounded-2xl border border-brand-border bg-white p-5 shadow-sm">
        <h2 className="text-sm font-bold uppercase tracking-wide text-brand-muted mb-4">Obsluha leadu</h2>
        {savedOk ? (
          <p
            role="status"
            className="mb-4 text-sm text-green-900 rounded-xl bg-green-50 border border-green-200 px-3 py-2"
          >
            Uloženo. Stav a poznámky jsou v databázi.
          </p>
        ) : null}
        <div className="flex items-start gap-3 rounded-xl border border-brand-border/80 bg-slate-50/80 px-3 py-2.5 mb-4">
          <input
            id="lead-needs-fu"
            type="checkbox"
            checked={needsFollowUp}
            onChange={(e) => setNeedsFollowUp(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-brand-border text-brand-navy focus:ring-brand-cyan"
          />
          <label htmlFor="lead-needs-fu" className="text-sm text-brand-text">
            <span className="font-semibold">Fronta follow-up</span> — zaškrtnuto, dokud lead nevyžaduje další akci týmu
            (kontakt, doplnění, uzavření).
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="lead-status" className="block text-xs font-semibold text-brand-muted mb-1">
              Stav
            </label>
            <select
              id="lead-status"
              value={status}
              onChange={(e) => setStatus(e.target.value as LeadStatus)}
              className="w-full rounded-xl border border-brand-border px-3 py-2 text-sm"
            >
              {LEAD_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {LEAD_STATUS_LABELS[s]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="lead-assignee" className="block text-xs font-semibold text-brand-muted mb-1">
              Přiřazeno
            </label>
            <select
              id="lead-assignee"
              value={assigneeId ?? ""}
              onChange={(e) => setAssigneeId(e.target.value || null)}
              className="w-full rounded-xl border border-brand-border px-3 py-2 text-sm"
            >
              <option value="">— nepřiřazeno —</option>
              {staff.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.full_name?.trim() || p.id.slice(0, 8)}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="lead-internal" className="block text-xs font-semibold text-brand-muted mb-1">
            Interní poznámky
          </label>
          <textarea
            id="lead-internal"
            rows={5}
            value={internalNotes}
            onChange={(e) => setInternalNotes(e.target.value)}
            className="w-full rounded-xl border border-brand-border px-3 py-2 text-sm resize-y min-h-[120px]"
            placeholder="Poznámky vidí jen tým v adminu…"
            maxLength={12000}
          />
        </div>
        {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={save}
            disabled={pending}
            className="rounded-xl bg-brand-navy px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-navy/90 disabled:opacity-60"
          >
            {pending ? "Ukládám…" : "Uložit změny"}
          </button>
          <span className="text-xs text-brand-muted">
            Vytvořeno {formatPostDate(lead.created_at)} · Upraveno {formatPostDate(lead.updated_at)}
            {lead.last_edited_by ? ` · naposledy ${editorNames[lead.last_edited_by] ?? "—"}` : null}
          </span>
        </div>
      </section>

      {history.length > 0 ? (
        <section className="rounded-2xl border border-brand-border bg-slate-50/80 p-5">
          <h2 className="text-sm font-bold uppercase tracking-wide text-brand-muted mb-3">Historie stavu</h2>
          <ul className="space-y-2 text-sm">
            {history.map((h) => (
              <li key={h.id} className="flex flex-wrap gap-x-2 border-b border-brand-border/60 pb-2 last:border-0">
                <span className="text-brand-muted">{formatPostDate(h.created_at)}</span>
                <span>
                  {h.old_status ? `${LEAD_STATUS_LABELS[h.old_status as LeadStatus] ?? h.old_status} → ` : ""}
                  <strong>{LEAD_STATUS_LABELS[h.new_status as LeadStatus] ?? h.new_status}</strong>
                </span>
                {h.changed_by ? (
                  <span className="text-brand-muted">· {editorNames[h.changed_by] ?? h.changed_by.slice(0, 8)}</span>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
