import { useMemo, type ReactNode } from "react";
import type { Program } from "../types";
import { useFilters } from "../hooks/useFilters";
import { FiltersContext, type FiltersContextValue } from "./filtersContextDefinition";

export type { FiltersContextValue };

// ──────────────────── Provider ────────────────────

interface FiltersProviderProps {
  children: ReactNode;
  programs: Program[];
}

export function FiltersProvider({ children, programs }: FiltersProviderProps) {
  const filtersHook = useFilters(programs);

  const value = useMemo(() => filtersHook, [filtersHook]);

  return (
    <FiltersContext.Provider value={value}>
      {children}
    </FiltersContext.Provider>
  );
}
