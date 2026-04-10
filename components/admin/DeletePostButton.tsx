"use client";

import { useId, useState } from "react";
import { deletePostAction } from "@/app/admin/posts/actions";
import { AppModal } from "@/components/ui/AppModal";

type Props = { postId: string; title: string };

export function DeletePostButton({ postId, title }: Props) {
  const [open, setOpen] = useState(false);
  const titleId = useId();

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-xs font-semibold text-red-600 hover:underline rounded px-1 -mx-1 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1"
      >
        Smazat
      </button>
      <AppModal open={open} onClose={() => setOpen(false)} labelledBy={titleId}>
        <div className="p-6">
          <h2 id={titleId} className="text-lg font-bold text-brand-text pr-8">
            Smazat článek?
          </h2>
          <p className="mt-2 text-sm text-brand-muted">
            Tuto akci nelze vrátit. Článek <span className="font-semibold text-brand-text">{title}</span> zmizí z webu i
            z administrace.
          </p>
          <div className="mt-6 flex flex-wrap justify-end gap-3">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-xl border-2 border-brand-border px-4 py-2.5 text-sm font-semibold text-brand-text hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:ring-offset-2"
            >
              Zrušit
            </button>
            <form action={deletePostAction}>
              <input type="hidden" name="id" value={postId} />
              <button
                type="submit"
                className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Ano, smazat
              </button>
            </form>
          </div>
        </div>
      </AppModal>
    </>
  );
}
