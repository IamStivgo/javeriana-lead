import clsx from "clsx";
import { FilterPills, SortMenu, PriceRangeFilter, ToggleSwitch } from "../molecules";
import { Select } from "../atoms/Select";
import { Button } from "../atoms/Button";
import { useFiltersContext } from "../../hooks/useFiltersContext";
import { CATEGORIES, MODALITIES } from "../../utils/constants";
import type { Category, Modality } from "../../types";

export interface FiltersBarProps {
  className?: string;
}

/**
 * Barra de filtros avanzados que orquesta todos los controles
 * de filtrado y ordenamiento de programas
 */
export function FiltersBar({ className }: FiltersBarProps) {
  const context = useFiltersContext();
  
  if (!context) {
    throw new Error("FiltersBar debe usarse dentro de FiltersProvider");
  }
  
  const {
    filters,
    setFilter,
    clearFilters,
    activeFilterCount,
    faculties,
    priceBounds,
  } = context;

  // Opciones de categoría con contadores (se podría mejorar con conteo real)
  const categoryOptions = CATEGORIES.map((cat) => ({
    value: cat,
    label: cat,
  }));

  return (
    <div className={clsx("space-y-4", className)}>
      {/* Fila 1: Pills de Categoría */}
      <div>
        <FilterPills
          options={categoryOptions}
          value={filters.category}
          onChange={(value) => setFilter("category", value as Category | "Todos")}
        />
      </div>

      {/* Fila 2: Filtros secundarios */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-end">
        {/* Columna de filtros principales */}
        <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Modalidad */}
          <Select
            value={filters.modality}
            onChange={(e) => setFilter("modality", e.target.value as Modality | "Todas")}
            options={MODALITIES.map((mod) => ({ value: mod, label: mod }))}
            label="Modalidad"
            aria-label="Filtrar por modalidad"
          />

          {/* Facultad */}
          <Select
            value={filters.faculty}
            onChange={(e) => setFilter("faculty", e.target.value)}
            options={faculties.map((fac: string) => ({ value: fac, label: fac }))}
            label="Facultad"
            aria-label="Filtrar por facultad"
          />

          {/* Ordenamiento */}
          <SortMenu
            value={filters.sortBy}
            onChange={(value) => setFilter("sortBy", value)}
            label="Ordenar por"
          />

          {/* Toggle: Solo con cupos */}
          <div className="flex items-end h-full pb-2">
            <ToggleSwitch
              checked={filters.onlyWithSeats}
              onChange={(value) => setFilter("onlyWithSeats", value)}
              label="Solo con cupos"
            />
          </div>
        </div>

        {/* Contador y botón limpiar */}
        <div className="flex items-center gap-3">
          {activeFilterCount > 0 && (
            <>
              <div className="flex items-center gap-2 text-sm text-[var(--color-ink-soft)]">
                <span className="px-2 py-1 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-semibold">
                  {activeFilterCount}
                </span>
                <span className="hidden sm:inline">
                  {activeFilterCount === 1 ? "filtro activo" : "filtros activos"}
                </span>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                aria-label="Limpiar todos los filtros"
              >
                Limpiar
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Fila 3: Rango de precio (colapsable) */}
      <details className="group">
        <summary className="cursor-pointer list-none flex items-center gap-2 text-sm font-medium text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors">
          <svg
            className="w-4 h-4 transition-transform group-open:rotate-90"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
          Filtrar por precio
        </summary>

        <div className="mt-3 pl-6">
          <PriceRangeFilter
            key={`${filters.priceRange[0]}-${filters.priceRange[1]}`}
            value={filters.priceRange}
            onChange={(value) => setFilter("priceRange", value)}
            bounds={priceBounds}
          />
        </div>
      </details>
    </div>
  );
}
