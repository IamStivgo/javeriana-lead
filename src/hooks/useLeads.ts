import { useContext } from "react";
import { LeadsContext } from "../context/LeadsContext.context";
import type { LeadsContextValue } from "../context/LeadsContext.types";

/**
 * Hook para acceder al contexto de Leads
*/
export function useLeads(): LeadsContextValue {
  const context = useContext(LeadsContext);

  if (context === undefined) {
    throw new Error("useLeads debe usarse dentro de un LeadsProvider");
  }

  return context;
}
