import type { Lead } from "../../types";

const STORAGE_KEY = "javeriana_leads";

export function getLeads(): Lead[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    
    if (!raw) {
      return [];
    }

    const parsed: unknown = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      console.warn("Leads en localStorage no es un array, reiniciando");
      return [];
    }

    const leads = parsed.filter((item): item is Lead => {
      return (
        item &&
        typeof item === "object" &&
        typeof item.id === "string" &&
        typeof item.fullName === "string" &&
        typeof item.email === "string" &&
        typeof item.phone === "string" &&
        typeof item.programId === "number" &&
        typeof item.interest === "string" &&
        typeof item.notes === "string" &&
        typeof item.isJaveriana === "boolean" &&
        typeof item.createdAt === "string"
      );
    });

    if (leads.length !== parsed.length) {
      console.warn(
        `${parsed.length - leads.length} lead(s) inválido(s) descartado(s)`
      );
    }

    return leads;
  } catch (error) {
    console.error("Error al leer leads de localStorage:", error);
    return [];
  }
}

/**
 * Guarda los leads en localStorage
 */
export function saveLeads(leads: Lead[]): void {
  try {
    const json = JSON.stringify(leads);
    localStorage.setItem(STORAGE_KEY, json);
  } catch (error) {
    if (error instanceof Error && error.name === "QuotaExceededError") {
      console.error("Cuota de localStorage excedida. No se pueden guardar más leads.");
      throw new Error(
        "Límite de almacenamiento alcanzado. Por favor, elimina algunos leads antes de continuar.",
        { cause: error }
      );
    }
    console.error("Error al guardar leads:", error);
    throw new Error("No se pudieron guardar los leads", { 
      cause: error 
    });
  }
}

/**
 * Agrega un nuevo lead al almacenamiento
 */
export function addLead(lead: Lead): void {
  const leads = getLeads();
  leads.push(lead);
  saveLeads(leads);
}

/**
 * Elimina un lead por ID
 */
export function removeLead(id: string): boolean {
  const leads = getLeads();
  const initialLength = leads.length;
  const filtered = leads.filter((lead) => lead.id !== id);
  
  if (filtered.length === initialLength) {
    return false;
  }
  
  saveLeads(filtered);
  return true;
}

/**
 * Elimina todos los leads
 */
export function clearLeads(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Error al limpiar leads:", error);
    throw new Error("No se pudieron eliminar los leads", { 
      cause: error 
    });
  }
}

/**
 * Obtiene leads filtrados por programa
 */
export function getLeadsByProgram(programId: number): Lead[] {
  return getLeads().filter((lead) => lead.programId === programId);
}

/**
 * Cuenta total de leads almacenados
 */
export function getLeadsCount(): number {
  return getLeads().length;
}
