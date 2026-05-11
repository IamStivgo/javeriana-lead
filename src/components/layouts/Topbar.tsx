import clsx from "clsx";
import { SearchBar, ThemeToggle } from "../../components/molecules";

export interface TopbarProps {
  onSearch?: (value: string) => void;
  showSearch?: boolean;
}

export function Topbar({ onSearch, showSearch = true }: TopbarProps) {
  return (
    <header
      className={clsx(
        "sticky top-0 z-30 anim-down",
        "bg-[var(--color-surface)]/80 backdrop-blur-xl",
        "border-b border-[var(--color-line)]"
      )}
    >
      <div className="px-6 lg:px-10 py-4 flex items-center gap-4">
        {/* Mobile menu button (placeholder) */}
        <button
          className="lg:hidden p-2 rounded-lg hover:bg-[var(--color-surface-2)] transition-colors"
          aria-label="Abrir menú"
        >
          <svg
            className="w-6 h-6 text-[var(--color-ink)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Search */}
        {showSearch && onSearch && (
          <div className="flex-1 max-w-xl">
            <SearchBar
              onSearch={onSearch}
              placeholder="Buscar programas..."
              fullWidth
            />
          </div>
        )}

        {!showSearch && <div className="flex-1" />}

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <ThemeToggle />

          {/* User menu placeholder */}
          <button
            className={clsx(
              "p-2 rounded-lg transition-colors",
              "hover:bg-[var(--color-surface-2)]",
              "hidden sm:block"
            )}
            aria-label="Menú de usuario"
          >
            <div className="w-8 h-8 rounded-full bg-[var(--color-accent)] flex items-center justify-center">
              <span className="text-sm font-semibold text-white">U</span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
