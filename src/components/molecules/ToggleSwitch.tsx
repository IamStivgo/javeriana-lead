import { useId } from "react";
import clsx from "clsx";

export interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

/**
 * Componente de switch toggle para opciones booleanas
 */
export function ToggleSwitch({
  checked,
  onChange,
  label,
  disabled = false,
  className,
}: ToggleSwitchProps) {
  const toggleId = useId();

  return (
    <div className={clsx("flex items-center gap-3", className)}>
      <button
        type="button"
        role="switch"
        id={toggleId}
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={clsx(
          "relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200",
          "focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:ring-offset-2",
          disabled && "opacity-50 cursor-not-allowed",
          !disabled && "cursor-pointer",
          checked
            ? "bg-[var(--color-accent)]"
            : "bg-[var(--color-surface-2)] border border-[var(--color-line)]"
        )}
      >
        <span
          className={clsx(
            "inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 shadow-sm",
            checked ? "translate-x-6" : "translate-x-1"
          )}
        />
      </button>

      {label && (
        <label
          htmlFor={toggleId}
          className={clsx(
            "text-sm text-[var(--color-ink)] select-none",
            disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          )}
          onClick={() => !disabled && onChange(!checked)}
        >
          {label}
        </label>
      )}
    </div>
  );
}
