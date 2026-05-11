import { useParams, Link } from "react-router-dom";

export function ProgramDetailPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="space-y-6">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-accent)] transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Volver a programas
      </Link>

      <div>
        <h1 className="text-3xl font-bold text-[var(--color-ink)] display-serif">
          Detalle del Programa
        </h1>
        <p className="text-[var(--color-ink-soft)] mt-2">
          Programa ID: {id}
        </p>
      </div>

      {/* Este componente se completará en el paso 15 */}
      <div className="text-center py-20">
        <p className="text-[var(--color-ink-muted)]">
          Detalle en construcción...
        </p>
      </div>
    </div>
  );
}
