import clsx from "clsx";

export interface SkeletonCardProps {
  className?: string;
  variant?: "card" | "row";
}

export function SkeletonCard({
  className,
  variant = "card",
}: SkeletonCardProps) {
  if (variant === "row") {
    return <SkeletonRow className={className} />;
  }

  return (
    <div
      className={clsx(
        "bg-[var(--color-surface)] border border-[var(--color-line)] rounded-xl p-4",
        "animate-pulse",
        className
      )}
      aria-busy="true"
      aria-label="Cargando programa..."
    >
      {/* Badge */}
      <div className="flex items-center gap-2 mb-3">
        <div className="h-5 w-24 bg-[var(--color-surface-2)] rounded-full" />
      </div>

      {/* Swatch (color stripe) */}
      <div className="h-2 w-full bg-gradient-to-r from-[var(--color-surface-2)] to-[var(--color-line)] rounded mb-4 shimmer-bg" />

      {/* Title */}
      <div className="space-y-2 mb-4">
        <div className="h-6 w-3/4 bg-[var(--color-surface-2)] rounded" />
        <div className="h-4 w-1/2 bg-[var(--color-surface-2)] rounded" />
      </div>

      {/* Meta info */}
      <div className="space-y-2 mb-4">
        <div className="h-3 w-full bg-[var(--color-surface-2)] rounded" />
        <div className="h-3 w-5/6 bg-[var(--color-surface-2)] rounded" />
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="h-2 w-full bg-[var(--color-surface-2)] rounded-full" />
      </div>

      {/* Price + Button */}
      <div className="flex items-center justify-between">
        <div className="h-6 w-28 bg-[var(--color-surface-2)] rounded" />
        <div className="h-9 w-24 bg-[var(--color-surface-2)] rounded-lg" />
      </div>
    </div>
  );
}

function SkeletonRow({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        "bg-[var(--color-surface)] border border-[var(--color-line)] rounded-lg p-4",
        "animate-pulse",
        className
      )}
      aria-busy="true"
      aria-label="Cargando..."
    >
      <div className="flex items-center gap-4">
        {/* Avatar/Icon */}
        <div className="w-12 h-12 bg-[var(--color-surface-2)] rounded-full flex-shrink-0" />

        {/* Content */}
        <div className="flex-1 space-y-2">
          <div className="h-5 w-3/4 bg-[var(--color-surface-2)] rounded" />
          <div className="h-3 w-1/2 bg-[var(--color-surface-2)] rounded" />
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <div className="h-8 w-8 bg-[var(--color-surface-2)] rounded" />
          <div className="h-8 w-8 bg-[var(--color-surface-2)] rounded" />
        </div>
      </div>
    </div>
  );
}
