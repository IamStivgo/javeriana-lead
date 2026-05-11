import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import clsx from "clsx";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      fullWidth = false,
      className,
      id,
      required,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).slice(2, 9)}`;
    const errorId = error ? `${inputId}-error` : undefined;
    const helperId = helperText ? `${inputId}-helper` : undefined;

    return (
      <div className={clsx("flex flex-col gap-1.5", fullWidth && "w-full")}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-[var(--color-ink)]"
          >
            {label}
            {required && <span className="text-[var(--color-rose)] ml-1">*</span>}
          </label>
        )}

        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={clsx(errorId, helperId)}
          className={clsx(
            "px-3 py-2 rounded-lg border transition-all duration-200",
            "bg-[var(--color-surface)] text-[var(--color-ink)]",
            "placeholder:text-[var(--color-ink-muted)]",
            "focus:outline-none focus:ring-2 focus:ring-offset-1",
            error
              ? "border-[var(--color-rose)] focus:ring-[var(--color-rose)]"
              : "border-[var(--color-line)] focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)]",
            disabled && "opacity-50 cursor-not-allowed bg-[var(--color-surface-2)]",
            className
          )}
          {...props}
        />

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

Input.displayName = "Input";
