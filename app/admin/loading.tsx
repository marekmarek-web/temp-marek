export default function AdminLoading() {
  return (
    <div className="animate-pulse space-y-6" aria-busy="true" aria-label="Načítám přehled">
      <div className="h-8 w-48 rounded-lg bg-slate-200/80" />
      <div className="h-4 w-full max-w-xl rounded bg-slate-200/60" />
      <div className="rounded-2xl border border-brand-border bg-white p-6 space-y-4">
        <div className="h-4 w-32 rounded bg-slate-200/80" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 rounded-xl bg-slate-100" />
          ))}
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-28 rounded-2xl bg-slate-100" />
        ))}
      </div>
    </div>
  );
}
