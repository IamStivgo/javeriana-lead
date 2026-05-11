import { useReducer, useEffect } from "react";
import type { ReactNode } from "react";
import type { Lead } from "../types";
import * as leadsStorage from "../services/storage/leadsStorage";
import { LeadsContext } from "./LeadsContext.context";
import type { LeadsState, LeadsAction, LeadsContextValue } from "./LeadsContext.types";

// ──────────────────── Reducer ────────────────────

function leadsReducer(state: LeadsState, action: LeadsAction): LeadsState {
  switch (action.type) {
    case "hydrate":
      return { leads: action.leads };

    case "add":
      return { leads: [...state.leads, action.lead] };

    case "remove":
      return {
        leads: state.leads.filter((lead) => lead.id !== action.id),
      };

    case "clear":
      return { leads: [] };

    default:
      return state;
  }
}

// ──────────────────── Provider ────────────────────

interface LeadsProviderProps {
  children: ReactNode;
}

export function LeadsProvider({ children }: LeadsProviderProps) {
  const [state, dispatch] = useReducer(leadsReducer, { leads: [] });

  useEffect(() => {
    const storedLeads = leadsStorage.getLeads();
    dispatch({ type: "hydrate", leads: storedLeads });
  }, []);

  useEffect(() => {
    if (state.leads.length > 0 || leadsStorage.getLeadsCount() > 0) {
      leadsStorage.saveLeads(state.leads);
    }
  }, [state.leads]);

  // ──────────────────── Actions ────────────────────

  const addLead = (lead: Lead) => {
    dispatch({ type: "add", lead });
  };

  const removeLead = (id: string) => {
    dispatch({ type: "remove", id });
  };

  const clearLeads = () => {
    dispatch({ type: "clear" });
    leadsStorage.clearLeads();
  };

  const getLeadsByProgram = (programId: number): Lead[] => {
    return state.leads.filter((lead) => lead.programId === programId);
  };

  // ──────────────────── Context Value ────────────────────

  const value: LeadsContextValue = {
    leads: state.leads,
    addLead,
    removeLead,
    clearLeads,
    getLeadsByProgram,
  };

  return (
    <LeadsContext.Provider value={value}>{children}</LeadsContext.Provider>
  );
}
