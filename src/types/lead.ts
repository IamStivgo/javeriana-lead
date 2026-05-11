export interface LeadDraft {
  fullName: string;
  email: string;
  phone: string;
  programId: number | "";
  interest: string;
  notes: string;
  consent: boolean;         // Habeas Data / tratamiento de datos
}

/**
 * Lead persistido
 */
export interface Lead extends Omit<LeadDraft, "programId" | "consent"> {
  id: string;                
  programId: number;         
  isJaveriana: boolean;      
  createdAt: string;
}

/**
 * Errores de validación del formulario
 */
export type LeadErrors = Partial<Record<keyof LeadDraft, string>>;
