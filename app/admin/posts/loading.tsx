export default function AdminPostsLoading() {
  return (
    <div className="animate-pulse space-y-6" aria-busy="true" aria-label="Načítám články">
      <div className="flex justify-between gap-4">
        <div className="h-8 w-36 rounded-lg bg-slate-200/80" />
        <div className="h-11 w-36 rounded-xl bg-slate-200/80" />
      </div>
      <div className="space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-24 rounded-xl bg-slate-100" />
        ))}
      </div>
    </div>
  );
}
