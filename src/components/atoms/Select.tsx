import { forwardRef } from "react";
import type { SelectHTMLAttributes } from "react";
import clsx from "clsx";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  options: Array<{ value: string | number; label: string; disabled?: boolean }>;
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      helperText,
      fullWidth = false,
      options,
      placeholder,
      className,
      id,
      required,
      disabled,
      ...props
    },
    ref
  ) => {
    const selectId = id || `select-${Math.random().toString(36).slice(2, 9)}`;
    const errorId = error ? `${selectId}-error` : undefined;
    const helperId = helperText ? `${selectId}-helper` : undefined;

    return (
      <div className={clsx("flex flex-col gap-1.5", fullWidth && "w-full")}>
        {label && (
          <label
            htmlFor={selectId}
            className="text-sm font-medium text-[var(--color-ink)]"
          >
            {label}
            {required && <span className="text-[var(--color-rose)] ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            disabled={disabled}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={clsx(errorId, helperId)}
            className={clsx(
              "w-full px-3 py-2 pr-10 rounded-lg border transition-all duration-200",
              "bg-[var(--color-surface)] text-[var(--color-ink)]",
              "appearance-none cursor-pointer",
              "focus:outline-none focus:ring-2 focus:ring-offset-1",
              error
                ? "border-[var(--color-rose)] focus:ring-[var(--color-rose)]"
                : "border-[var(--color-line)] focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)]",
              disabled && "opacity-50 cursor-not-allowed bg-[var(--color-surface-2)]",
              className
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>

          {/* Chevron icon */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-[var(--color-ink-muted)]">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {error && (
          <span
            id={errorId}
            className="text-sm text-[var(--color-rose)]"
            role="alert"
          >
            {error}
          </span>
        )}

        {helperText && !error && (
          <span
            id={helperId}
            className="text-sm text-[var(--color-ink-muted)]"
          >
            {helperText}
          </span>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";
