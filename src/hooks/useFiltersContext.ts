import { useContext } from "react";
import { FiltersContext, type FiltersContextValue } from "../context/filtersContextDefinition";

export function useFiltersContext(): FiltersContextValue | null {
  const context = useContext(FiltersContext);
  return context;
}
