import { useState, useMemo } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { usePrograms } from "../hooks";
import { Button, Badge, ProgressBar } from "../components/atoms";
import { LeadForm } from "../components/organisms";
import { formatCOP, formatShortDate, CATEGORY_COLORS } from "../utils";
import clsx from "clsx";

export function ProgramDetailPage() {
  const { id } = useParams<{ id: string }>();
  const programsState = usePrograms();
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [loadingWidths] = useState(() =>
    Array.from({ length: 5 }, () => Math.random() * 40 + 60)
  );

  // Buscar programa por ID
  const program = useMemo(() => {
    if (!programsState.data || !id) return null;
    const programId = parseInt(id, 10);
    if (isNaN(programId)) return null;
    return programsState.data.find((p) => p.id === programId) || null;
  }, [programsState.data, id]);

  // Estados de carga
  if (programsState.status === "loading") {
    return (
      <div className="space-y-6">
        <div className="h-4 w-32 bg-[var(--color-surface-2)] rounded animate-pulse" />
        <div className="h-10 w-3/4 bg-[var(--color-surface-2)] rounded animate-pulse" />
        <div className="h-64 bg-[var(--color-surface-2)] rounded-xl animate-pulse" />
        <div className="space-y-3">
          {loadingWidths.map((width, i) => (
            <div
              key={i}
              className="h-4 bg-[var(--color-surface-2)] rounded animate-pulse"
              style={{ width: `${width}%` }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (programsState.status === "error") {
    return (
      <div className="space-y-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-accent)] transition-colors"
        >
          <BackIcon />
          Volver a programas
        </Link>

        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <div className="w-16 h-16 rounded-full bg-[var(--color-rose)]/10 flex items-center justify-center">
            <ErrorIcon />
          </div>
          <div className="text-center space-y-2">
            <h2 className="text-xl font-semibold text-[var(--color-ink)]">
              Error al cargar programa
            </h2>
            <p className="text-[var(--color-ink-soft)] max-w-md">
              {programsState.error || "Ocurrió un error inesperado"}
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => window.history.back()}>
              Volver
            </Button>
            <Button variant="primary" onClick={() => window.location.reload()}>
              Reintentar
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Programa no encontrado - redirigir a 404
  if (programsState.status === "success" && !program) {
    return <Navigate to="/404" replace />;
  }

  if (!program) return null;

  // Calcular progreso de cupos
  const filled = program.seats - program.seatsLeft;
  const percentage = (filled / program.seats) * 100;
  const progressVariant =
    percentage > 80 ? "danger" : percentage > 60 ? "warning" : "success";

  const handleInscribe = () => {
    setIsFormOpen(true);
  };

  return (
    <div className="space-y-8 anim-fade">
      {/* Breadcrumb */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-[var(--color-ink-soft)] hover:text-[var(--color-accent)] transition-colors"
      >
        <BackIcon />
        Volver a programas
      </Link>

      {/* Hero Section */}
      <div
        className="relative rounded-2xl p-8 md:p-12 overflow-hidden border border-[var(--color-line)]"
        style={{
          background: `linear-gradient(135deg, var(--color-accent-soft), var(--color-surface-2))`,
        }}
      >
        {/* Stripes pattern */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 20px,
              var(--color-line) 20px,
              var(--color-line) 40px
            )`,
          }}
        />

        {/* Floating circle */}
        <div
          className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full anim-float"
          style={{ background: "var(--color-accent)", opacity: 0.12 }}
        />

        <div className="relative z-10 space-y-4">
          <Badge
            variant={CATEGORY_COLORS[program.category]}
            size="md"
          >
            {program.category}
          </Badge>

          <h1 className="display-serif text-4xl md:text-5xl leading-tight text-[var(--color-ink)]">
            {program.title}
          </h1>

          <p className="text-lg text-[var(--color-ink-soft)] max-w-3xl">
            {program.summary}
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Button
              variant="primary"
              size="lg"
              onClick={handleInscribe}
              className="shadow-lg"
            >
              Inscribirme ahora
              <ArrowRightIcon />
            </Button>
            <Button variant="outline" size="lg" onClick={() => window.history.back()}>
              Explorar más programas
            </Button>
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <InfoCard icon={<ClockIcon />} label="Duración" value={program.duration} />
        <InfoCard icon={<MapIcon />} label="Modalidad" value={program.modality} />
        <InfoCard
          icon={<CalendarIcon />}
          label="Inicio"
          value={formatShortDate(program.startDate)}
        />
        <InfoCard icon={<LocationIcon />} label="Ubicación" value={program.location} />
      </div>

      {/* Main Content - 2 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Highlights */}
          {program.highlights && program.highlights.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-[var(--color-ink)] display-serif">
                Aspectos destacados
              </h2>
              <ul className="space-y-3">
                {program.highlights.map((highlight, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-[var(--color-ink-soft)]"
                  >
                    <CheckIcon />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Faculty */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-[var(--color-ink)] display-serif">
              Facultad
            </h2>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)]">
              <div className="w-12 h-12 rounded-full bg-[var(--color-accent-soft)] flex items-center justify-center">
                <BuildingIcon />
              </div>
              <div>
                <p className="font-semibold text-[var(--color-ink)]">
                  {program.faculty}
                </p>
                <p className="text-sm text-[var(--color-ink-muted)]">
                  Pontificia Universidad Javeriana
                </p>
              </div>
            </div>
          </section>

          {/* Rating */}
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-[var(--color-ink)] display-serif">
              Valoración
            </h2>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} filled={i < Math.floor(program.rating)} />
                ))}
              </div>
              <span className="text-2xl font-bold text-[var(--color-ink)]">
                {program.rating.toFixed(1)}
              </span>
              <span className="text-sm text-[var(--color-ink-muted)]">/ 5.0</span>
            </div>
          </section>
        </div>

        {/* Right column - Sidebar */}
        <div className="space-y-6">
          {/* Price Card */}
          <div className="p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)] sticky top-6">
            <div className="space-y-4">
              <div>
                <p className="mono text-xs uppercase tracking-widest text-[var(--color-ink-muted)] mb-1">
                  Inversión
                </p>
                <p className="text-3xl font-bold text-[var(--color-ink)]">
                  {formatCOP(program.price)}
                </p>
                <p className="text-sm text-[var(--color-ink-muted)] mt-1">
                  Precio por semestre
                </p>
              </div>

              {/* Seats Progress */}
              <div className="pt-4 border-t border-[var(--color-line)]">
                <div className="flex items-center justify-between mb-2">
                  <span className="mono text-xs uppercase tracking-widest text-[var(--color-ink-muted)]">
                    Disponibilidad
                  </span>
                  <span
                    className={clsx(
                      "mono text-sm font-semibold",
                      percentage > 80
                        ? "text-[var(--color-rose)]"
                        : "text-[var(--color-ink-soft)]"
                    )}
                  >
                    {program.seatsLeft} / {program.seats}
                  </span>
                </div>
                <ProgressBar
                  value={filled}
                  max={program.seats}
                  variant={progressVariant}
                />
                <p className="text-xs text-[var(--color-ink-muted)] mt-2">
                  {program.seatsLeft} cupos disponibles
                </p>
              </div>

              <Button
                variant="primary"
                fullWidth
                size="lg"
                onClick={handleInscribe}
              >
                Inscribirme
              </Button>

              <p className="text-xs text-center text-[var(--color-ink-muted)]">
                Sin compromiso. Recibirás información detallada por correo.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lead Form Modal */}
      <LeadForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        preselectedProgramId={program.id}
      />
    </div>
  );
}

// ──────────────────── Sub-components ────────────────────

interface InfoCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function InfoCard({ icon, label, value }: InfoCardProps) {
  return (
    <div className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-line)]">
      <div className="flex items-center gap-3">
        <div className="text-[var(--color-accent)]">{icon}</div>
        <div>
          <p className="text-xs text-[var(--color-ink-muted)] uppercase tracking-wide">
            {label}
          </p>
          <p className="font-semibold text-[var(--color-ink)]">{value}</p>
        </div>
      </div>
    </div>
  );
}

// ──────────────────── Icons ────────────────────

function BackIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 19l-7-7 7-7"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
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
  );
}

function ClockIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function MapIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      className="w-5 h-5 text-[var(--color-emerald)] flex-shrink-0 mt-0.5"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg
      className="w-6 h-6 text-[var(--color-accent)]"
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

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      className={clsx(
        "w-5 h-5",
        filled ? "text-[var(--color-gold)]" : "text-[var(--color-line)]"
      )}
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function ErrorIcon() {
  return (
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
  );
}
