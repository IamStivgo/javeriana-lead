import clsx from "clsx";
import { useTheme } from "../../hooks";

export interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export function ThemeToggle({ className, showLabel = false }: ThemeToggleProps) {
  const { isDark, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      className={clsx(
        "flex items-center gap-2 p-2 rounded-lg transition-all duration-200",
        "text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]",
        "hover:bg-[var(--color-surface-2)]",
        "focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]",
        "active:scale-95",
        className
      )}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      title={isDark ? "Modo claro" : "Modo oscuro"}
    >
      {isDark ? <MoonIcon /> : <SunIcon />}
      {showLabel && (
        <span className="text-sm font-medium">
          {isDark ? "Oscuro" : "Claro"}
        </span>
      )}
    </button>
  );
}

// ──────────────────── Icons ────────────────────

function SunIcon() {
  return (
    <svg
      className="w-5 h-5 transition-transform duration-300 rotate-0 hover:rotate-45"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      className="w-5 h-5 transition-transform duration-300"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  );
}
