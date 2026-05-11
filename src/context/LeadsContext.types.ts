import type { Lead } from "../types";

export interface LeadsState {
  leads: Lead[];
}

export interface LeadsContextValue extends LeadsState {
  addLead: (lead: Lead) => void;
  removeLead: (id: string) => void;
  clearLeads: () => void;
  getLeadsByProgram: (programId: number) => Lead[];
}

export type LeadsAction =
  | { type: "hydrate"; leads: Lead[] }
  | { type: "add"; lead: Lead }
  | { type: "remove"; id: string }
  | { type: "clear" };
