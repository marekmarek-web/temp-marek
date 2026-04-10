"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import {
  savePostAction,
  type SavePostState,
  uploadBlogCoverAction,
} from "@/app/admin/posts/actions";
import type { BlogPost } from "@/lib/posts";

function toDatetimeLocalValue(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

type Props = { initial: BlogPost | null };

export function PostEditor({ initial }: Props) {
  const [coverUrl, setCoverUrl] = useState(initial?.cover_image_url ?? "");
  const [uploadBusy, setUploadBusy] = useState(false);
  const [uploadErr, setUploadErr] = useState<string | null>(null);

  const [state, formAction, pending] = useActionState<SavePostState, FormData>(savePostAction, null);

  useEffect(() => {
    setCoverUrl(initial?.cover_image_url ?? "");
  }, [initial]);

  async function onCoverFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadErr(null);
    setUploadBusy(true);
    try {
      const fd = new FormData();
      fd.set("file", file);
      const res = await uploadBlogCoverAction(fd);
      if (res.error) {
        setUploadErr(res.error);
        return;
      }
      if (res.url) setCoverUrl(res.url);
    } finally {
      setUploadBusy(false);
      e.target.value = "";
    }
  }

  return (
    <div>
      <div className="flex flex-wrap gap-4 justify-between items-center mb-8">
        <h1 className="text-xl font-bold text-brand-text">
          {initial ? "Upravit článek" : "Nový článek"}
        </h1>
        <Link href="/admin/posts" className="text-sm font-semibold text-brand-navy hover:text-brand-cyan">
          ← Zpět na seznam
        </Link>
      </div>

      {state?.error && (
        <p className="mb-4 text-sm text-red-600 rounded-xl bg-red-50 px-4 py-3">{state.error}</p>
      )}

      <form action={formAction} className="space-y-5 max-w-3xl">
        {initial?.id ? <input type="hidden" name="id" value={initial.id} /> : null}
        <div>
          <label htmlFor="slug" className="block text-sm font-semibold text-brand-text mb-1.5">
            Slug (URL)
          </label>
          <input
            id="slug"
            name="slug"
            required
            defaultValue={initial?.slug ?? ""}
            placeholder="napr-clanek"
            className="w-full px-4 py-3 rounded-xl border border-brand-border focus:ring-2 focus:ring-brand-cyan focus:border-transparent font-mono text-sm"
          />
        </div>
        <div>
          <label htmlFor="title" className="block text-sm font-semibold text-brand-text mb-1.5">
            Nadpis
          </label>
          <input
            id="title"
            name="title"
            required
            defaultValue={initial?.title ?? ""}
            className="w-full px-4 py-3 rounded-xl border border-brand-border focus:ring-2 focus:ring-brand-cyan focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-semibold text-brand-text mb-1.5">
            Kategorie
          </label>
          <input
            id="category"
            name="category"
            defaultValue={initial?.category ?? ""}
            className="w-full px-4 py-3 rounded-xl border border-brand-border focus:ring-2 focus:ring-brand-cyan focus:border-transparent"
          />
        </div>
        <div>
          <label htmlFor="excerpt" className="block text-sm font-semibold text-brand-text mb-1.5">
            Perex
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            rows={3}
            defaultValue={initial?.excerpt ?? ""}
            className="w-full px-4 py-3 rounded-xl border border-brand-border focus:ring-2 focus:ring-brand-cyan focus:border-transparent resize-none"
          />
        </div>
        <div>
          <label htmlFor="body" className="block text-sm font-semibold text-brand-text mb-1.5">
            Text (Markdown)
          </label>
          <textarea
            id="body"
            name="body"
            rows={16}
            defaultValue={initial?.body ?? ""}
            className="w-full px-4 py-3 rounded-xl border border-brand-border focus:ring-2 focus:ring-brand-cyan focus:border-transparent font-mono text-sm"
          />
        </div>
        <div>
          <label htmlFor="cover_image_url" className="block text-sm font-semibold text-brand-text mb-1.5">
            URL obrázku (náhled)
          </label>
          <input
            id="cover_image_url"
            name="cover_image_url"
            value={coverUrl}
            onChange={(e) => setCoverUrl(e.target.value)}
            placeholder="https://… nebo /img/blog/…"
            className="w-full px-4 py-3 rounded-xl border border-brand-border focus:ring-2 focus:ring-brand-cyan focus:border-transparent"
          />
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <label className="text-sm text-brand-muted cursor-pointer">
              <span className="font-semibold text-brand-navy hover:text-brand-cyan">Nahrát obrázek</span>
              <input type="file" accept="image/*" className="sr-only" disabled={uploadBusy} onChange={onCoverFile} />
            </label>
            {uploadBusy && <span className="text-xs text-brand-muted">Nahrávám…</span>}
            {uploadErr && <span className="text-xs text-red-600">{uploadErr}</span>}
          </div>
        </div>
        <div>
          <label htmlFor="published_at" className="block text-sm font-semibold text-brand-text mb-1.5">
            Datum publikace
          </label>
          <input
            id="published_at"
            name="published_at"
            type="datetime-local"
            defaultValue={toDatetimeLocalValue(initial?.published_at ?? null)}
            className="w-full max-w-xs px-4 py-3 rounded-xl border border-brand-border focus:ring-2 focus:ring-brand-cyan focus:border-transparent"
          />
        </div>
        <div className="flex items-start gap-3">
          <input
            id="published"
            name="published"
            type="checkbox"
            defaultChecked={initial?.published ?? false}
            className="mt-1 w-4 h-4 rounded border-brand-border text-brand-navy focus:ring-brand-cyan"
          />
          <label htmlFor="published" className="text-sm text-brand-text">
            Publikovat na webu
          </label>
        </div>
        <button
          type="submit"
          disabled={pending}
          className="py-4 px-8 rounded-2xl bg-brand-navy text-white font-bold hover:bg-brand-navy/90 disabled:opacity-75"
        >
          {pending ? "Ukládám…" : "Uložit"}
        </button>
      </form>
    </div>
  );
}
