import { useState, useCallback } from "react";
import type { LeadDraft, LeadErrors } from "@/types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\d{7,}/;

function validateEmail(email: string): boolean {
  return EMAIL_RE.test(email.trim());
}

function validatePhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, "");
  return PHONE_RE.test(digits);
}

function isJaverianaDomain(email: string): boolean {
  return email.trim().toLowerCase().endsWith("@javeriana.edu.co");
}

export interface UseLeadFormReturn {
  data: LeadDraft;
  errors: LeadErrors;
  touched: Record<keyof LeadDraft, boolean>;
  isValid: boolean;
  isJaverianaEmail: boolean;
  setField: <K extends keyof LeadDraft>(field: K, value: LeadDraft[K]) => void;
  validateField: (field: keyof LeadDraft) => void;
  validateAll: () => boolean;
  reset: () => void;
}

const initialData: LeadDraft = {
  fullName: "",
  email: "",
  phone: "",
  programId: "",
  interest: "",
  notes: "",
  consent: false,
};

/**
 * Hook para manejo del formulario de leads
 */
export function useLeadForm(
  onSubmit?: (data: LeadDraft) => void
): UseLeadFormReturn {
  const [data, setData] = useState<LeadDraft>(initialData);
  const [errors, setErrors] = useState<LeadErrors>({});
  const [touched, setTouched] = useState<Record<keyof LeadDraft, boolean>>({
    fullName: false,
    email: false,
    phone: false,
    programId: false,
    interest: false,
    notes: false,
    consent: false,
  });

  // Detectar si es email institucional
  const isJaverianaEmail = data.email
    ? isJaverianaDomain(data.email)
    : false;

  // Validar un campo individual
  const validateField = useCallback(
    (field: keyof LeadDraft): string | undefined => {
      const value = data[field];

      switch (field) {
        case "fullName":
          if (!value || (value as string).trim().length < 3) {
            return "El nombre completo debe tener al menos 3 caracteres";
          }
          break;

        case "email":
          if (!value || !(value as string).trim()) {
            return "El email es requerido";
          }
          if (!validateEmail(value as string)) {
            return "Email inválido";
          }
          break;

        case "phone":
          if (!value || !(value as string).trim()) {
            return "El teléfono es requerido";
          }
          if (!validatePhone(value as string)) {
            return "Teléfono inválido (mínimo 7 dígitos)";
          }
          break;

        case "programId":
          if (!value || value === "") {
            return "Debes seleccionar un programa";
          }
          break;

        case "interest":
          if (!value || !(value as string).trim()) {
            return "El área de interés es requerida";
          }
          break;

        case "consent":
          if (!(value as boolean)) {
            return "Debes aceptar el tratamiento de datos";
          }
          break;

        case "notes":
          break;
      }

      return undefined;
    },
    [data]
  );

  // Actualizar un campo
  const setField = useCallback(
    <K extends keyof LeadDraft>(field: K, value: LeadDraft[K]) => {
      setData((prev) => ({ ...prev, [field]: value }));
      setTouched((prev) => ({ ...prev, [field]: true }));
      if (touched[field]) {
        const error = validateField(field);
        setErrors((prev) => ({
          ...prev,
          [field]: error,
        }));
      }
    },
    [touched, validateField]
  );

  // Validar campo específico (para onBlur)
  const handleValidateField = useCallback(
    (field: keyof LeadDraft) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      const error = validateField(field);
      setErrors((prev) => ({
        ...prev,
        [field]: error,
      }));
    },
    [validateField]
  );

  // Validar todos los campos
  const validateAll = useCallback((): boolean => {
    const newErrors: LeadErrors = {};
    let hasErrors = false;

    const allTouched: Record<keyof LeadDraft, boolean> = {
      fullName: true,
      email: true,
      phone: true,
      programId: true,
      interest: true,
      notes: true,
      consent: true,
    };
    setTouched(allTouched);

    (Object.keys(data) as Array<keyof LeadDraft>).forEach((field) => {
      const error = validateField(field);
      if (error) {
        newErrors[field] = error;
        hasErrors = true;
      }
    });

    setErrors(newErrors);

    if (!hasErrors && onSubmit) {
      onSubmit(data);
    }

    return !hasErrors;
  }, [data, validateField, onSubmit]);

  const reset = useCallback(() => {
    setData(initialData);
    setErrors({});
    setTouched({
      fullName: false,
      email: false,
      phone: false,
      programId: false,
      interest: false,
      notes: false,
      consent: false,
    });
  }, []);

  // Calcular si el formulario es válido
  const isValid = Object.keys(errors).length === 0 && data.consent;

  return {
    data,
    errors,
    touched,
    isValid,
    isJaverianaEmail,
    setField,
    validateField: handleValidateField,
    validateAll,
    reset,
  };
}
