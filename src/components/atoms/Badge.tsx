import type { HTMLAttributes } from "react";
import clsx from "clsx";

export type BadgeVariant = "default" | "indigo" | "amber" | "emerald" | "rose" | "success" | "warning" | "error";
export type BadgeSize = "sm" | "md" | "lg";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
}

export function Badge({
  variant = "default",
  size = "md",
  dot = false,
  className,
  children,
  ...props
}: BadgeProps) {
  const baseStyles = clsx(
    "inline-flex items-center gap-1.5 rounded-full font-medium",
    "transition-colors duration-200"
  );

  const variantStyles = {
    default: "bg-[var(--color-surface-2)] text-[var(--color-ink-soft)]",
    indigo: "bg-[oklch(0.94_0.04_268)] text-[oklch(0.42_0.13_268)] dark:bg-[oklch(0.30_0.10_268)] dark:text-[oklch(0.78_0.13_268)]",
    amber: "bg-[oklch(0.94_0.05_80)] text-[oklch(0.65_0.12_80)] dark:bg-[oklch(0.30_0.08_80)] dark:text-[oklch(0.78_0.12_80)]",
    emerald: "bg-[oklch(0.94_0.04_165)] text-[oklch(0.55_0.10_165)] dark:bg-[oklch(0.25_0.08_165)] dark:text-[oklch(0.70_0.10_165)]",
    rose: "bg-[oklch(0.94_0.05_18)] text-[oklch(0.62_0.13_18)] dark:bg-[oklch(0.30_0.10_18)] dark:text-[oklch(0.75_0.13_18)]",
    success: "bg-[var(--color-emerald)]/10 text-[var(--color-emerald)]",
    warning: "bg-[var(--color-gold)]/10 text-[var(--color-gold)]",
    error: "bg-[var(--color-rose)]/10 text-[var(--color-rose)]",
  };

  const sizeStyles = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-sm",
    lg: "px-3 py-1.5 text-base",
  };

  return (
    <span
      className={clsx(baseStyles, variantStyles[variant], sizeStyles[size], className)}
      {...props}
    >
      {dot && (
        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
      )}
      {children}
    </span>
  );
}
