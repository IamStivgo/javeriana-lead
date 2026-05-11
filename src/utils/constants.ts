import type { BadgeVariant } from "../components/atoms/Badge";
import type { Category } from "../types";

/**
 * Opciones de categorías de programas para filtros
 */
export const CATEGORIES = [
  "Todos",
  "Pregrado",
  "Posgrado",
  "Educación Continua",
] as const;

export type CategoryFilter = (typeof CATEGORIES)[number];

/**
 * Opciones de modalidades de programas para filtros
 */
export const MODALITIES = [
  "Todas",
  "Presencial",
  "Híbrida",
  "Virtual",
] as const;

export type ModalityFilter = (typeof MODALITIES)[number];

/**
 * Áreas de interés para el formulario de leads
 */
export const INTERESTS = [
  "Información general",
  "Proceso de admisión",
  "Costos y financiación",
  "Becas y ayudas",
  "Plan de estudios",
  "Modalidad y horarios",
  "Prácticas y empleabilidad",
  "Homologaciones",
  "Otro",
] as const;

export type Interest = (typeof INTERESTS)[number];

/**
 * Colores para badges de categorías
 */
export const CATEGORY_COLORS: Record<Category, BadgeVariant> = {
  Pregrado: "indigo",
  Posgrado: "amber",
  "Educación Continua": "emerald",
};

/**
 * Configuración de paginación
 */
export const PAGINATION = {
  PROGRAMS_PER_PAGE: 12,
  LEADS_PER_PAGE: 20,
} as const;

/**
 * Configuración de debounce
 */
export const DEBOUNCE_DELAYS = {
  SEARCH: 250,
  RESIZE: 150,
  SCROLL: 100,
} as const;

/**
 * Límites de caracteres para formularios
 */
export const CHAR_LIMITS = {
  FULL_NAME_MIN: 3,
  FULL_NAME_MAX: 100,
  EMAIL_MAX: 100,
  PHONE_MIN: 7,
  PHONE_MAX: 20,
  NOTES_MAX: 500,
} as const;

/**
 * Mensajes de validación reutilizables
 */
export const VALIDATION_MESSAGES = {
  REQUIRED: "Este campo es requerido",
  EMAIL_INVALID: "Email inválido",
  EMAIL_JAVERIANA_PREFERRED: "Se detectó un email institucional",
  PHONE_INVALID: "Teléfono inválido (mínimo 7 dígitos)",
  NAME_TOO_SHORT: "El nombre debe tener al menos 3 caracteres",
  CONSENT_REQUIRED: "Debes aceptar el tratamiento de datos",
} as const;

/**
 * Claves de localStorage
 */
export const STORAGE_KEYS = {
  LEADS: "javeriana_leads",
  THEME: "javeriana_theme",
  FILTERS: "javeriana_filters",
} as const;

/**
 * Rutas de la aplicación
 */
export const ROUTES = {
  HOME: "/",
  PROGRAM_DETAIL: (id: number) => `/programa/${id}`,
  LEADS: "/leads",
  NOT_FOUND: "*",
} as const;
