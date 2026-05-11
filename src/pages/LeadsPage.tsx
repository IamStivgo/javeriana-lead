import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useLeads, usePrograms } from "../hooks";
import { useToast } from "../hooks/useToast";
import { Button, Badge } from "../components/atoms";
import { formatShortDate } from "../utils/formatters";
import type { Lead } from "../types";
import clsx from "clsx";

export function LeadsPage() {
  const { leads, removeLead, clearLeads } = useLeads();
  const { data: programs } = usePrograms();
  const { addToast } = useToast();

  // Agrupar leads por programa
  const leadsByProgram = useMemo(() => {
    const grouped = new Map<number, Lead[]>();

    leads.forEach((lead) => {
      const programLeads = grouped.get(lead.programId) || [];
      programLeads.push(lead);
      grouped.set(lead.programId, programLeads);
    });

    return grouped;
  }, [leads]);

  // Obtener nombre del programa
  const getProgramName = (programId: number): string => {
    const program = programs?.find((p) => p.id === programId);
    return program?.title || `Programa #${programId}`;
  };

  // Obtener categoría del programa
  const getProgramCategory = (programId: number) => {
    const program = programs?.find((p) => p.id === programId);
    return program?.category || null;
  };

  // Handler para eliminar lead individual
  const handleRemoveLead = (lead: Lead) => {
    const confirmed = window.confirm(
      `¿Estás seguro de eliminar el lead de ${lead.fullName}?\n\nEsta acción no se puede deshacer.`
    );

    if (confirmed) {
      removeLead(lead.id);
      addToast(`Lead de ${lead.fullName} eliminado`, "success");
    }
  };

  // Handler para limpiar todos los leads
  const handleClearAll = () => {
    const confirmed = window.confirm(
      `¿Estás seguro de eliminar TODOS los leads (${leads.length})?\n\nEsta acción no se puede deshacer.`
    );

    if (confirmed) {
      clearLeads();
      addToast("Todos los leads han sido eliminados", "success");
    }
  };

  // Empty state
  if (leads.length === 0) {
    return (
      <div className="space-y-6 anim-fade">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-ink)] display-serif">
            Leads Registrados
          </h1>
          <p className="text-[var(--color-ink-soft)] mt-2">
            Administra los prospectos interesados en tus programas
          </p>
        </div>

        <div className="flex flex-col items-center justify-center py-20 space-y-6">
          <div className="w-20 h-20 rounded-full bg-[var(--color-surface-2)] flex items-center justify-center">
            <EmptyIcon />
          </div>
          <div className="text-center space-y-2 max-w-md">
            <h2 className="text-2xl font-semibold text-[var(--color-ink)] display-serif">
              No hay leads registrados
            </h2>
            <p className="text-[var(--color-ink-soft)]">
              Aún no tienes prospectos en tu base de datos. Comienza explorando
              los programas y capturando información de interesados.
            </p>
          </div>
          <Link to="/">
            <Button variant="primary" size="lg">
              <PlusIcon />
              Explorar Programas
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Con leads
  return (
    <div className="space-y-6 anim-fade">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-ink)] display-serif">
            Leads Registrados
          </h1>
          <p className="text-[var(--color-ink-soft)] mt-2">
            {leads.length} {leads.length === 1 ? "lead registrado" : "leads registrados"}
          </p>
        </div>

        <Button variant="outline" size="sm" onClick={handleClearAll}>
          <TrashIcon />
          Limpiar todos
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          icon={<UsersIcon />}
          label="Total Leads"
          value={leads.length}
          color="indigo"
        />
        <StatCard
          icon={<ProgramIcon />}
          label="Programas"
          value={leadsByProgram.size}
          color="amber"
        />
        <StatCard
          icon={<BuildingIcon />}
          label="Emails Javeriana"
          value={leads.filter((l) => l.isJaveriana).length}
          color="emerald"
        />
      </div>

      {/* Leads grouped by program */}
      <div className="space-y-6">
        {Array.from(leadsByProgram.entries()).map(([programId, programLeads]) => {
          const programName = getProgramName(programId);
          const category = getProgramCategory(programId);

          return (
            <section
              key={programId}
              className="rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] overflow-hidden"
            >
              {/* Program header */}
              <div className="p-4 border-b border-[var(--color-line)] bg-[var(--color-surface-2)]">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-[var(--color-ink)]">
                      {programName}
                    </h3>
                    {category && (
                      <Badge variant={getCategoryColor(category)} size="sm">
                        {category}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[var(--color-ink-muted)]">
                      {programLeads.length}{" "}
                      {programLeads.length === 1 ? "lead" : "leads"}
                    </span>
                    <Link to={`/programa/${programId}`}>
                      <Button variant="ghost" size="sm">
                        Ver programa
                        <ArrowRightIcon />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Leads list */}
              <div className="divide-y divide-[var(--color-line)]">
                {programLeads.map((lead) => (
                  <LeadRow
                    key={lead.id}
                    lead={lead}
                    onRemove={() => handleRemoveLead(lead)}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

// ──────────────────── Sub-components ────────────────────

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: "indigo" | "amber" | "emerald";
}

function StatCard({ icon, label, value, color }: StatCardProps) {
  const colorClasses = {
    indigo: "text-[var(--color-indigo)] bg-[var(--color-indigo)]/10",
    amber: "text-[var(--color-amber)] bg-[var(--color-amber)]/10",
    emerald: "text-[var(--color-emerald)] bg-[var(--color-emerald)]/10",
  };

  return (
    <div className="p-5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)]">
      <div className="flex items-center gap-3">
        <div className={clsx("p-3 rounded-lg", colorClasses[color])}>
          {icon}
        </div>
        <div>
          <p className="text-sm text-[var(--color-ink-muted)]">{label}</p>
          <p className="text-2xl font-bold text-[var(--color-ink)]">{value}</p>
        </div>
      </div>
    </div>
  );
}

interface LeadRowProps {
  lead: Lead;
  onRemove: () => void;
}

function LeadRow({ lead, onRemove }: LeadRowProps) {
  return (
    <div className="p-4 hover:bg-[var(--color-surface-2)] transition-colors">
      <div className="flex items-start justify-between gap-4">
        {/* Lead info */}
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-semibold text-[var(--color-ink)]">
              {lead.fullName}
            </h4>
            {lead.isJaveriana && (
              <Badge variant="indigo" size="sm">
                <BuildingIcon className="w-3 h-3" />
                Javeriana
              </Badge>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            <div className="flex items-center gap-2 text-[var(--color-ink-soft)]">
              <EmailIcon />
              <a
                href={`mailto:${lead.email}`}
                className="hover:text-[var(--color-accent)] transition-colors"
              >
                {lead.email}
              </a>
            </div>
            <div className="flex items-center gap-2 text-[var(--color-ink-soft)]">
              <PhoneIcon />
              <a
                href={`tel:${lead.phone}`}
                className="hover:text-[var(--color-accent)] transition-colors"
              >
                {lead.phone}
              </a>
            </div>
            <div className="flex items-center gap-2 text-[var(--color-ink-soft)]">
              <InterestIcon />
              {lead.interest}
            </div>
            <div className="flex items-center gap-2 text-[var(--color-ink-soft)]">
              <CalendarIcon />
              {formatShortDate(lead.createdAt)}
            </div>
          </div>

          {lead.notes && (
            <div className="mt-2 p-2 rounded bg-[var(--color-surface-2)] text-sm text-[var(--color-ink-soft)] border-l-2 border-[var(--color-accent)]">
              <span className="text-xs text-[var(--color-ink-muted)] uppercase tracking-wide">
                Notas:
              </span>{" "}
              {lead.notes}
            </div>
          )}
        </div>

        {/* Actions */}
        <button
          onClick={onRemove}
          className="p-2 rounded-lg text-[var(--color-ink-muted)] hover:text-[var(--color-rose)] hover:bg-[var(--color-rose)]/10 transition-colors"
          aria-label={`Eliminar lead de ${lead.fullName}`}
        >
          <TrashIcon />
        </button>
      </div>
    </div>
  );
}

// ──────────────────── Helpers ────────────────────

function getCategoryColor(category: string): "indigo" | "amber" | "emerald" {
  switch (category) {
    case "Pregrado":
      return "indigo";
    case "Posgrado":
      return "amber";
    case "Educación Continua":
      return "emerald";
    default:
      return "indigo";
  }
}

// ──────────────────── Icons ────────────────────

function EmptyIcon() {
  return (
    <svg
      className="w-10 h-10 text-[var(--color-ink-muted)]"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
      />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4v16m8-8H4"
      />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
      />
    </svg>
  );
}

function UsersIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  );
}

function ProgramIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
      />
    </svg>
  );
}

function BuildingIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className || "w-5 h-5"}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
      />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  );
}

function InterestIcon() {
  return (
    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  );
}
