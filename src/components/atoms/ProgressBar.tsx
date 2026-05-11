import type { HTMLAttributes } from "react";
import clsx from "clsx";

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  value: number; // 0-100
  max?: number;
  showLabel?: boolean;
  variant?: "default" | "success" | "warning" | "danger";
  size?: "sm" | "md" | "lg";
}

export function ProgressBar({
  value,
  max = 100,
  showLabel = false,
  variant = "default",
  size = "md",
  className,
  ...props
}: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const variantStyles = {
    default: "bg-[var(--color-accent)]",
    success: "bg-[var(--color-emerald)]",
    warning: "bg-[var(--color-gold)]",
    danger: "bg-[var(--color-rose)]",
  };

  const sizeStyles = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
  };

  return (
    <div className={clsx("w-full", className)} {...props}>
      {showLabel && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-[var(--color-ink-soft)]">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      <div
        className={clsx(
          "w-full rounded-full bg-[var(--color-surface-2)] overflow-hidden",
          sizeStyles[size]
        )}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div
          className={clsx(
            "h-full rounded-full transition-all duration-300 ease-out",
            variantStyles[variant]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
