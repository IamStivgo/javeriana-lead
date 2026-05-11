import { useState } from "react";
import clsx from "clsx";

export interface PriceRangeFilterProps {
  value: [number, number];
  onChange: (value: [number, number]) => void;
  bounds: [number, number];
  label?: string;
  className?: string;
}

/**
 * Componente de filtro por rango de precio con inputs numéricos
 */
export function PriceRangeFilter({
  value,
  onChange,
  bounds,
  label = "Rango de precio",
  className,
}: PriceRangeFilterProps) {
  const [min, max] = value;
  const [minBound, maxBound] = bounds;

  const [localMin, setLocalMin] = useState(min);
  const [localMax, setLocalMax] = useState(max);

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Number(e.target.value);
    setLocalMin(newMin);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Number(e.target.value);
    setLocalMax(newMax);
  };

  const handleMinBlur = () => {
    const clampedMin = Math.max(minBound, Math.min(localMin, localMax));
    setLocalMin(clampedMin);
    onChange([clampedMin, localMax]);
  };

  const handleMaxBlur = () => {
    const clampedMax = Math.min(maxBound, Math.max(localMax, localMin));
    setLocalMax(clampedMax);
    onChange([localMin, clampedMax]);
  };

  // Si no hay bounds válidos, no renderizar
  if (minBound === maxBound || maxBound === 0) {
    return null;
  }

  return (
    <div className={clsx("flex flex-col gap-2", className)}>
      {label && (
        <label className="text-sm font-medium text-[var(--color-ink)]">
          {label}
        </label>
      )}

      <div className="flex items-center gap-3">
        {/* Input Min */}
        <div className="flex-1">
          <input
            type="number"
            value={localMin}
            onChange={handleMinChange}
            onBlur={handleMinBlur}
            min={minBound}
            max={maxBound}
            step={100000}
            className={clsx(
              "w-full px-3 py-2 rounded-lg border transition-all duration-200",
              "bg-[var(--color-surface)] text-[var(--color-ink)]",
              "border-[var(--color-line)]",
              "focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)]",
              "text-sm"
            )}
            aria-label="Precio mínimo"
          />
          <span className="text-xs text-[var(--color-ink-muted)] mt-1 block">
            {formatCurrency(localMin)}
          </span>
        </div>

        <span className="text-[var(--color-ink-muted)] pb-5">—</span>

        {/* Input Max */}
        <div className="flex-1">
          <input
            type="number"
            value={localMax === Number.POSITIVE_INFINITY ? maxBound : localMax}
            onChange={handleMaxChange}
            onBlur={handleMaxBlur}
            min={minBound}
            max={maxBound}
            step={100000}
            className={clsx(
              "w-full px-3 py-2 rounded-lg border transition-all duration-200",
              "bg-[var(--color-surface)] text-[var(--color-ink)]",
              "border-[var(--color-line)]",
              "focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)]",
              "text-sm"
            )}
            aria-label="Precio máximo"
          />
          <span className="text-xs text-[var(--color-ink-muted)] mt-1 block">
            {formatCurrency(
              localMax === Number.POSITIVE_INFINITY ? maxBound : localMax
            )}
          </span>
        </div>
      </div>
    </div>
  );
}
