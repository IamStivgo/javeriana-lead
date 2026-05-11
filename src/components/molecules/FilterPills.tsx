import clsx from "clsx";

export interface FilterPill {
  value: string;
  label: string;
  count?: number;
}

export interface FilterPillsProps {
  options: FilterPill[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function FilterPills({
  options,
  value,
  onChange,
  className,
}: FilterPillsProps) {
  return (
    <div
      className={clsx(
        "flex flex-wrap gap-2",
        className
      )}
      role="tablist"
      aria-label="Filtros de categoría"
    >
      {options.map((option) => {
        const isActive = value === option.value;

        return (
          <button
            key={option.value}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(option.value)}
            className={clsx(
              "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-accent)]",
              "hover:scale-105 active:scale-95",
              isActive
                ? "bg-[var(--color-accent)] text-[var(--color-surface)] shadow-md"
                : "bg-[var(--color-surface-2)] text-[var(--color-ink-soft)] hover:bg-[var(--color-surface-2)]/80 hover:text-[var(--color-ink)]"
            )}
          >
            {option.label}
            {typeof option.count === "number" && (
              <span
                className={clsx(
                  "ml-1.5 px-1.5 py-0.5 rounded-full text-xs font-semibold",
                  isActive
                    ? "bg-white/20"
                    : "bg-[var(--color-line)]"
                )}
              >
                {option.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
