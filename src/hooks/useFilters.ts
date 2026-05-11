import { useCallback, useMemo } from "react";
import type { Program, ProgramFilters } from "../types";
import { DEFAULT_FILTERS, STORAGE_KEYS } from "../utils/constants";
import { useLocalStorage } from "./useLocalStorage";
import { useDebounce } from "./useDebounce";

/**
 * Hook para gestionar el estado de filtros de programas
 * con persistencia en localStorage y debouncing
 */
export function useFilters(programs: Program[]) {
  const [rawFilters, setRawFilters] = useLocalStorage<ProgramFilters>(
    STORAGE_KEYS.FILTERS,
    DEFAULT_FILTERS
  );

  // Normalizar filtros: JSON.stringify convierte Infinity a null
  // Al leer de localStorage, restauramos Infinity si es necesario
  const filters = useMemo(() => {
    const [minPrice, maxPrice] = rawFilters.priceRange;
    return {
      ...rawFilters,
      priceRange: [
        minPrice ?? 0,
        maxPrice === null || maxPrice === undefined ? Number.POSITIVE_INFINITY : maxPrice
      ] as [number, number]
    };
  }, [rawFilters]);

  const setFilters = useCallback(
    (value: ProgramFilters | ((prev: ProgramFilters) => ProgramFilters)) => {
      setRawFilters(value);
    },
    [setRawFilters]
  );

  // Debounce para búsqueda y rango de precio
  const debouncedSearch = useDebounce(filters.search, 250);
  const debouncedPriceRange = useDebounce(filters.priceRange, 150);

  /**
   * Actualizar un filtro específico
   */
  const setFilter = useCallback(
    <K extends keyof ProgramFilters>(key: K, value: ProgramFilters[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    [setFilters]
  );

  /**
   * Limpiar todos los filtros a su estado inicial
   */
  const clearFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
  }, [setFilters]);

  /**
   * Derivar lista única de facultades desde los programas
   */
  const faculties = useMemo(() => {
    if (!programs.length) return ["Todas"];
    const uniqueFaculties = new Set(programs.map((p) => p.faculty));
    return ["Todas", ...Array.from(uniqueFaculties).sort()];
  }, [programs]);

  /**
   * Calcular rango de precios [min, max] desde los programas
   */
  const priceBounds = useMemo<[number, number]>(() => {
    if (!programs.length) return [0, 0];
    const prices = programs.map((p) => p.price);
    return [Math.min(...prices), Math.max(...prices)];
  }, [programs]);

  /**
   * Contar filtros activos (excluyendo defaults)
   */
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.search.trim()) count++;
    if (filters.category !== DEFAULT_FILTERS.category) count++;
    if (filters.modality !== DEFAULT_FILTERS.modality) count++;
    if (filters.faculty !== DEFAULT_FILTERS.faculty) count++;
    if (filters.onlyWithSeats) count++;
    if (filters.sortBy !== DEFAULT_FILTERS.sortBy) count++;
    
    // Verificar si el rango de precio cambió del default
    const [minDefault, maxDefault] = DEFAULT_FILTERS.priceRange;
    const [minCurrent, maxCurrent] = filters.priceRange;
    if (
      minCurrent !== minDefault ||
      (maxCurrent !== maxDefault && maxCurrent !== Number.POSITIVE_INFINITY)
    ) {
      count++;
    }
    
    return count;
  }, [filters]);

  /**
   * Filtros efectivos con debouncing aplicado
   */
  const effectiveFilters = useMemo(
    () => ({
      ...filters,
      search: debouncedSearch,
      priceRange: debouncedPriceRange,
    }),
    [filters, debouncedSearch, debouncedPriceRange]
  );

  return {
    filters,
    effectiveFilters,
    setFilter,
    clearFilters,
    activeFilterCount,
    faculties,
    priceBounds,
  };
}
