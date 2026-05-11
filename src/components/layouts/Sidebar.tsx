import React from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { useLeads } from "../../hooks";

// ──────────────────── Navigation Items ────────────────────

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  {
    path: "/",
    label: "Programas",
    icon: (
      <svg className="w-[17px] h-[17px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
  },
  {
    path: "/leads",
    label: "Leads",
    icon: (
      <svg className="w-[17px] h-[17px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
];

// ──────────────────── Sidebar Component ────────────────────

export function Sidebar() {
  const { leads } = useLeads();

  return (
    <aside
      className={clsx(
        "hidden lg:flex flex-col flex-shrink-0 anim-right",
        "w-[232px] bg-[var(--color-surface)] border-r border-[var(--color-line)]"
      )}
      aria-label="Navegación principal"
    >
      {/* Brand */}
      <div className="px-5 pt-6 pb-5 flex items-center gap-2.5">
        <LogoIcon />
        <div>
          <div className="text-sm font-semibold leading-none text-[var(--color-ink)]">
            Lead Manager
          </div>
          <div className="mono text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] mt-1">
            Javeriana · 2026
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="px-3 mt-2">
        <h2 className="mono text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] px-2 mb-1">
          Espacio de trabajo
        </h2>
        <nav aria-label="Menú de navegación" className="flex flex-col gap-0.5">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                clsx(
                  "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13.5px]",
                  "transition-all duration-200 active:scale-[0.98]",
                  isActive
                    ? "bg-[var(--color-accent-soft)] text-[var(--color-accent)] font-semibold"
                    : "text-[var(--color-ink-soft)] font-medium hover:bg-[var(--color-surface-2)] hover:text-[var(--color-ink)]"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={clsx(
                      "transition-colors",
                      isActive
                        ? "text-[var(--color-accent)]"
                        : "text-[var(--color-ink-muted)] group-hover:text-[var(--color-ink-soft)]"
                    )}
                  >
                    {item.icon}
                  </span>
                  <span className="flex-1">{item.label}</span>
                  {item.path === "/leads" && leads.length > 0 && (
                    <span
                      className={clsx(
                        "mono text-[10px] rounded-full px-1.5 py-0.5",
                        isActive
                          ? "bg-[var(--color-accent)] text-[var(--color-surface)]"
                          : "bg-[var(--color-surface-2)] text-[var(--color-ink-muted)]"
                      )}
                    >
                      {leads.length}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}

// ──────────────────── Icons ────────────────────

function LogoIcon() {
  return (
    <div className="w-7 h-7 rounded-lg bg-[var(--color-accent)] flex items-center justify-center text-white font-bold text-sm">
      J
    </div>
  );
}
