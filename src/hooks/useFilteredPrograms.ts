import { useMemo } from "react";
import type { Program, ProgramFilters } from "../types";

/**
 * Hook que filtra y ordena programas usando useMemo para optimización
 * Solo recomputa cuando cambian programas o filtros
 */
export function useFilteredPrograms(
  programs: Program[],
  filters: ProgramFilters
): Program[] {
  return useMemo(() => {
    const q = filters.search.trim().toLowerCase();
    const [minPrice, maxPrice] = filters.priceRange;

    // ──────────────────── Fase 1: Filtrado ────────────────────

    const filtered = programs.filter((p) => {
      // Filtrar por categoría
      if (filters.category !== "Todos" && p.category !== filters.category) {
        return false;
      }

      // Filtrar por modalidad
      if (filters.modality !== "Todas" && p.modality !== filters.modality) {
        return false;
      }

      // Filtrar por facultad
      if (filters.faculty !== "Todas" && p.faculty !== filters.faculty) {
        return false;
      }

      // Filtrar por cupos disponibles
      if (filters.onlyWithSeats && p.seatsLeft <= 0) {
        return false;
      }

      // Filtrar por rango de precio
      if (p.price < minPrice || p.price > maxPrice) {
        return false;
      }

      // Filtrar por texto de búsqueda
      if (q) {
        const searchableText = `${p.title} ${p.faculty} ${p.summary}`
          .toLowerCase();
        if (!searchableText.includes(q)) {
          return false;
        }
      }

      return true;
    });

    // ──────────────────── Fase 2: Ordenamiento ────────────────────

    const sorted = [...filtered].sort((a, b) => {
      switch (filters.sortBy) {
        case "date":
          return +new Date(a.startDate) - +new Date(b.startDate);
        case "rating":
          return b.rating - a.rating;
        case "seats":
          return b.seatsLeft - a.seatsLeft;
        case "price_asc":
          return a.price - b.price;
        case "price_desc":
          return b.price - a.price;
        default:
          return 0;
      }
    });

    return sorted;
  }, [programs, filters]);
}
