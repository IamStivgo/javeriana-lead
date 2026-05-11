import { useMemo } from "react";
import type { Program, Category } from "../types";

export interface ProgramFilters {
  search: string;
  category: Category | "Todos";
}

/**
 * Hook que filtra programas usando useMemo para optimización
 * Solo recomputa cuando cambian programas o filtros
 */
export function useFilteredPrograms(
  programs: Program[],
  filters: ProgramFilters
): Program[] {
  return useMemo(() => {
    let filtered = programs;

    // Filtrar por categoría
    if (filters.category !== "Todos") {
      filtered = filtered.filter((p) => p.category === filters.category);
    }

    // Filtrar por texto de búsqueda
    if (filters.search.trim()) {
      const searchLower = filters.search.toLowerCase().trim();
      
      filtered = filtered.filter((program) => {
        // Buscar en: título, facultad y resumen
        const searchableText = [
          program.title,
          program.faculty,
          program.summary,
        ]
          .join(" ")
          .toLowerCase();

        return searchableText.includes(searchLower);
      });
    }

    return filtered;
  }, [programs, filters.search, filters.category]);
}
