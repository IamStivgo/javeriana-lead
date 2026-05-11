import React from "react";
import { Badge } from "../atoms";
import type { Program } from "../../types";

export interface ProgramCardProps {
  program: Program;
  onInscribe?: (program: Program) => void;
}

export const ProgramCard = React.memo(({ program, onInscribe }: ProgramCardProps) => {
  return (
    <article
      className="bg-[var(--color-surface)] border border-[var(--color-line)] rounded-xl p-4 hover:border-[var(--color-accent)]/50 transition-all duration-200 hover:shadow-lg"
    >
      {/* Badge */}
      <Badge variant="indigo" size="sm" className="mb-3">
        {program.category}
      </Badge>

      {/* Title */}
      <h3 className="text-lg font-semibold text-[var(--color-ink)] display-serif mb-2 line-clamp-2">
        {program.title}
      </h3>

      {/* Faculty */}
      <p className="text-sm text-[var(--color-ink-soft)] mb-4">
        {program.faculty}
      </p>

      {/* Este componente se completará en el paso 14 */}
    </article>
  );
});

ProgramCard.displayName = "ProgramCard";
