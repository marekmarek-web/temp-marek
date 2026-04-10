export default function AdminLeadsLoading() {
  return (
    <div className="animate-pulse space-y-6" aria-busy="true" aria-label="Načítám leady">
      <div className="h-8 w-40 rounded-lg bg-slate-200/80" />
      <div className="h-4 w-72 rounded bg-slate-200/60" />
      <div className="flex flex-wrap gap-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-7 w-20 rounded-full bg-slate-200/80" />
        ))}
      </div>
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-28 rounded-2xl bg-slate-100" />
        ))}
      </div>
    </div>
  );
}
