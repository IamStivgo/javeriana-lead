import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      fullWidth = false,
      loading = false,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = clsx(
      "inline-flex items-center justify-center gap-2",
      "font-medium rounded-lg transition-all duration-200",
      "focus:outline-none focus:ring-2 focus:ring-offset-2",
      "disabled:opacity-50 disabled:cursor-not-allowed",
      "active:scale-[0.98]"
    );

    const variantStyles = {
      primary: clsx(
        "bg-[var(--color-accent)] text-[var(--color-surface)]",
        "hover:bg-[var(--color-accent-strong)]",
        "focus:ring-[var(--color-accent)]"
      ),
      secondary: clsx(
        "bg-[var(--color-accent-soft)] text-[var(--color-accent)]",
        "hover:bg-[var(--color-accent-soft)]/80",
        "focus:ring-[var(--color-accent)]"
      ),
      outline: clsx(
        "border-2 border-[var(--color-line)] text-[var(--color-ink)]",
        "hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]",
        "focus:ring-[var(--color-accent)]"
      ),
      ghost: clsx(
        "text-[var(--color-ink-soft)]",
        "hover:bg-[var(--color-surface-2)]",
        "focus:ring-[var(--color-accent)]"
      ),
      danger: clsx(
        "bg-[var(--color-rose)] text-white",
        "hover:opacity-90",
        "focus:ring-[var(--color-rose)]"
      ),
    };

    const sizeStyles = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-6 py-3 text-lg",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={clsx(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {loading && (
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
