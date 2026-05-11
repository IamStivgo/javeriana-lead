import { createContext } from "react";
import type { ProgramFilters } from "../types";

export interface FiltersContextValue {
  filters: ProgramFilters;
  effectiveFilters: ProgramFilters;
  setFilter: <K extends keyof ProgramFilters>(
    key: K,
    value: ProgramFilters[K]
  ) => void;
  clearFilters: () => void;
  activeFilterCount: number;
  faculties: string[];
  priceBounds: [number, number];
}

export const FiltersContext = createContext<FiltersContextValue | null>(null);
