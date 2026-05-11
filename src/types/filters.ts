import type { Category, Modality } from "./program";

/**
 * Claves de ordenamiento disponibles para programas
 */
export type SortKey =
  | "date"          // próxima fecha (asc por startDate)
  | "rating"        // mejor valorados (desc)
  | "seats"         // más cupos disponibles (desc)
  | "price_asc"     // precio menor a mayor
  | "price_desc";   // precio mayor a menor

export interface ProgramFilters {
  search: string;
  category: Category | "Todos";
  modality: Modality | "Todas";
  faculty: string | "Todas";        // se deriva de los programas cargados
  priceRange: [number, number];      // [min, max] en COP
  onlyWithSeats: boolean;            // true => seatsLeft > 0
  sortBy: SortKey;
}
