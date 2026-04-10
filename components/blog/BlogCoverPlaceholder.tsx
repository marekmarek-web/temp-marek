import Image from "next/image";

/** Konzistentní náhrada chybějícího coveru — jemný brand, bez „rozbité“ šedi. */
export function BlogCoverPlaceholder({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-slate-100 via-brand-background to-slate-100 ${className}`.trim()}
      aria-hidden
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <Image
          src="/img/logos/pb-logo-no-bg.png"
          alt=""
          width={160}
          height={48}
          className="h-10 w-auto opacity-[0.18] sm:h-12"
        />
      </div>
    </div>
  );
}
