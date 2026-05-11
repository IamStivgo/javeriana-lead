import { useState, useMemo, useCallback } from "react";
import { usePrograms, useFilteredPrograms, useFiltersContext } from "../hooks";
import { FilterPills, SkeletonCard } from "../components/molecules";
import { ProgramCard, LeadForm } from "../components/organisms";
import { Button } from "../components/atoms";
import { CATEGORIES } from "../utils";
import { FiltersProvider } from "../context/FiltersContext";
import type { Category, Program } from "../types";

export function DashboardPage() {
  const programsState = usePrograms();

  // ──────────────────── Estados de carga ────────────────────

  // Estado: Loading
  if (programsState.status === "loading") {
    return (
      <div className="space-y-6">
        <div>
          <div className="h-9 w-64 bg-[var(--color-surface-2)] rounded animate-pulse mb-2" />
          <div className="h-5 w-96 bg-[var(--color-surface-2)] rounded animate-pulse" />
        </div>

        <div className="h-10 bg-[var(--color-surface-2)] rounded-lg animate-pulse" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  // Estado: Error
  if (programsState.status === "error") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-ink)] display-serif">
            Programas Académicos
          </h1>
        </div>

        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <div className="w-16 h-16 rounded-full bg-[var(--color-rose)]/10 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-[var(--color-rose)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="text-center space-y-2">
            <h2 className="text-xl font-semibold text-[var(--color-ink)]">
              Error al cargar programas
            </h2>
            <p className="text-[var(--color-ink-soft)] max-w-md">
              {programsState.error || "Ocurrió un error inesperado"}
            </p>
          </div>
          <Button
            variant="primary"
            onClick={() => window.location.reload()}
          >
            Reintentar
          </Button>
        </div>
      </div>
    );
  }

  // Estado: Success pero sin datos
  if (programsState.status === "success" && (!programsState.data || programsState.data.length === 0)) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-ink)] display-serif">
            Programas Académicos
          </h1>
          <p className="text-[var(--color-ink-soft)] mt-2">
            No hay programas disponibles
          </p>
        </div>
      </div>
    );
  }

  // Estado: Success con datos
  return (
    <FiltersProvider programs={programsState.data || []}>
      <DashboardContent programs={programsState.data || []} />
    </FiltersProvider>
  );
}

// ──────────────────── Dashboard Content ────────────────────

interface DashboardContentProps {
  programs: Program[];
}

function DashboardContent({ programs }: DashboardContentProps) {
  const context = useFiltersContext();
  
  if (!context) {
    throw new Error("DashboardContent debe usarse dentro de FiltersProvider");
  }
  
  const { effectiveFilters, setFilter, clearFilters, activeFilterCount } = context;
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProgramId, setSelectedProgramId] = useState<
    number | undefined
  >(undefined);

  // Filtrar programas
  const filteredPrograms = useFilteredPrograms(programs, effectiveFilters);

  const filterOptions = useMemo(() => {
    return CATEGORIES.map((cat) => ({
      value: cat,
      label: cat,
      count:
        cat === "Todos"
          ? programs.length
          : programs.filter((p) => p.category === cat).length,
    }));
  }, [programs]);

  // ──────────────────── Handlers ────────────────────

  const handleInscribe = useCallback((program: Program) => {
    setSelectedProgramId(program.id);
    setIsFormOpen(true);
  }, []);

  const handleCloseForm = useCallback(() => {
    setIsFormOpen(false);
    setSelectedProgramId(undefined);
  }, []);

  // ──────────────────── Render ────────────────────

  const hasResults = filteredPrograms.length > 0;
  const hasFilters = activeFilterCount > 0;

  return (
    <div className="space-y-6 anim-fade">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[var(--color-ink)] display-serif">
          Programas Académicos
        </h1>
        <p className="text-[var(--color-ink-soft)] mt-2">
          Explora {programs.length} programas de pregrado, posgrado y educación continua
        </p>
      </div>

      {/* Filters */}
      <div className="space-y-4">
        <FilterPills
          options={filterOptions}
          value={effectiveFilters.category}
          onChange={(value) => setFilter("category", value as Category | "Todos")}
        />

        {/* Results count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-[var(--color-ink-soft)]">
            {filteredPrograms.length}{" "}
            {filteredPrograms.length === 1 ? "programa encontrado" : "programas encontrados"}
          </p>

          {hasFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
            >
              Limpiar filtros
            </Button>
          )}
        </div>
      </div>

      {/* Programs Grid */}
      {hasResults ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 anim-up">
          {filteredPrograms.map((program, index) => (
            <ProgramCard 
              key={program.id} 
              program={program} 
              onInscribe={handleInscribe}
              index={index}
            />
          ))}
        </div>
      ) : (
        // Empty state
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <div className="w-16 h-16 rounded-full bg-[var(--color-surface-2)] flex items-center justify-center">
            <svg
              className="w-8 h-8 text-[var(--color-ink-muted)]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <div className="text-center space-y-2">
            <h2 className="text-xl font-semibold text-[var(--color-ink)]">
              No se encontraron programas
            </h2>
            <p className="text-[var(--color-ink-soft)] max-w-md">
              No hay programas que coincidan con los filtros seleccionados.
              Intenta con otros criterios de búsqueda.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={clearFilters}
          >
            Limpiar filtros
          </Button>
        </div>
      )}

      {/* Lead Form Modal */}
      <LeadForm
        isOpen={isFormOpen}
        onClose={handleCloseForm}
        preselectedProgramId={selectedProgramId}
      />
    </div>
  );
}
