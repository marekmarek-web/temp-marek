import dynamic from "next/dynamic";

const PostEditor = dynamic(() => import("@/components/admin/PostEditor").then((m) => m.PostEditor), {
  loading: () => (
    <div
      className="animate-pulse space-y-4 rounded-2xl border border-brand-border bg-white p-8"
      aria-busy
      aria-label="Načítám editor článku"
    >
      <div className="h-8 w-48 bg-slate-200 rounded" />
      <div className="h-4 w-full max-w-md bg-slate-100 rounded" />
      <div className="h-40 w-full bg-slate-100 rounded-xl" />
    </div>
  ),
});

export default function NewPostPage() {
  return <PostEditor initial={null} />;
}
