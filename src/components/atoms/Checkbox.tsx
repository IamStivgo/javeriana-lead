import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";
import clsx from "clsx";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: React.ReactNode;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className, id, disabled, ...props }, ref) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).slice(2, 9)}`;
    const errorId = error ? `${checkboxId}-error` : undefined;

    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-start gap-2">
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            disabled={disabled}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={errorId}
            className={clsx(
              "w-4 h-4 mt-0.5 rounded border transition-all duration-200",
              "text-[var(--color-accent)] bg-[var(--color-surface)]",
              "border-[var(--color-line)]",
              "focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[var(--color-accent)]",
              "checked:bg-[var(--color-accent)] checked:border-[var(--color-accent)]",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              error && "border-[var(--color-rose)]",
              "cursor-pointer",
              className
            )}
            {...props}
          />
          {label && (
            <label
              htmlFor={checkboxId}
              className={clsx(
                "text-sm text-[var(--color-ink)]",
                disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              )}
            >
              {label}
            </label>
          )}
        </div>

        {error && (
          <span
            id={errorId}
            className="text-sm text-[var(--color-rose)] ml-6"
            role="alert"
          >
            {error}
          </span>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
