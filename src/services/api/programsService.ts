/**
 * Servicio de API para Programas Académicos
 */

import type { Program, Category, Modality } from "@/types";

const API_URL = import.meta.env.VITE_PROGRAMS_API ?? "/programs.json";

/**
 * Valida si un valor es una Category válida
 */
function isValidCategory(value: unknown): value is Category {
  return (
    typeof value === "string" &&
    ["Pregrado", "Posgrado", "Educación Continua"].includes(value)
  );
}

/**
 * Valida si un valor es una Modality válida
 */
function isValidModality(value: unknown): value is Modality {
  return (
    typeof value === "string" &&
    ["Presencial", "Híbrida", "Virtual"].includes(value)
  );
}

/**
 * Valida y parsea un programa individual
 */
function parseProgram(raw: unknown): Program | null {
  if (!raw || typeof raw !== "object") return null;

  const obj = raw as Record<string, unknown>;

  // Validar campos requeridos
  if (
    typeof obj.id !== "number" ||
    typeof obj.title !== "string" ||
    !isValidCategory(obj.category) ||
    !isValidModality(obj.modality) ||
    typeof obj.duration !== "string" ||
    typeof obj.startDate !== "string" ||
    typeof obj.location !== "string" ||
    typeof obj.seats !== "number" ||
    typeof obj.seatsLeft !== "number" ||
    typeof obj.price !== "number" ||
    typeof obj.rating !== "number" ||
    typeof obj.faculty !== "string" ||
    typeof obj.summary !== "string" ||
    !Array.isArray(obj.highlights)
  ) {
    console.warn("Programa inválido descartado:", obj);
    return null;
  }

  // Validar que highlights sea un array de strings
  if (!obj.highlights.every((h) => typeof h === "string")) {
    console.warn("Highlights inválidos en programa:", obj);
    return null;
  }

  return {
    id: obj.id,
    title: obj.title.trim(),
    category: obj.category,
    modality: obj.modality,
    duration: obj.duration.trim(),
    startDate: obj.startDate,
    location: obj.location.trim(),
    seats: obj.seats,
    seatsLeft: obj.seatsLeft,
    price: obj.price,
    rating: obj.rating,
    faculty: obj.faculty.trim(),
    summary: obj.summary.trim(),
    highlights: obj.highlights as string[],
  };
}

/**
 * Parsea y valida un array de programas
 */
function parsePrograms(data: unknown): Program[] {
  if (!Array.isArray(data)) {
    throw new Error("La respuesta no es un array válido");
  }

  const programs = data
    .map(parseProgram)
    .filter((p): p is Program => p !== null);

  if (programs.length === 0 && data.length > 0) {
    throw new Error("Ningún programa válido encontrado en la respuesta");
  }

  return programs;
}

/**
 * Obtiene la lista de programas desde la API
 */
export async function fetchPrograms(signal?: AbortSignal): Promise<Program[]> {
  try {
    const res = await fetch(API_URL, { signal });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }

    const data: unknown = await res.json();
    return parsePrograms(data);
  } catch (error) {
    // Re-lanzar errores de abort sin modificar
    if (error instanceof Error && error.name === "AbortError") {
      throw error;
    }

    // Enriquecer otros errores con contexto
    const message =
      error instanceof Error ? error.message : "Error desconocido";
    throw new Error(`Error al cargar programas: ${message}`);
  }
}

/**
 * Obtiene un programa por ID
 */
export async function fetchProgramById(
  id: number,
  signal?: AbortSignal
): Promise<Program | null> {
  const programs = await fetchPrograms(signal);
  return programs.find((p) => p.id === id) ?? null;
}
