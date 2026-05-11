import { useState, useEffect } from "react";
import type { InputHTMLAttributes } from "react";
import clsx from "clsx";
import { useDebounce } from "../../hooks";

export interface SearchBarProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  value?: string;
  onSearch: (value: string) => void;
  debounceMs?: number;
  fullWidth?: boolean;
}

export function SearchBar({
  value: controlledValue,
  onSearch,
  debounceMs = 250,
  placeholder = "Buscar programas...",
  fullWidth = false,
  className,
  ...props
}: SearchBarProps) {
  const [localValue, setLocalValue] = useState(controlledValue ?? "");
  
  const currentValue = controlledValue ?? localValue;
  const debouncedValue = useDebounce(currentValue, debounceMs);

  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue, onSearch]);

  const handleClear = () => {
    setLocalValue("");
    onSearch("");
  };

  return (
    <div className={clsx("relative", fullWidth && "w-full", className)}>
      {/* Search icon */}
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-[var(--color-ink-muted)]">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      <input
        type="search"
        value={currentValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder={placeholder}
        className={clsx(
          "w-full pl-10 pr-10 py-2.5 rounded-lg border transition-all duration-200",
          "bg-[var(--color-surface)] text-[var(--color-ink)]",
          "placeholder:text-[var(--color-ink-muted)]",
          "border-[var(--color-line)]",
          "focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)]",
          "hover:border-[var(--color-accent)]/50"
        )}
        {...props}
      />

      {/* Clear button */}
      {currentValue && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors"
          aria-label="Limpiar búsqueda"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
