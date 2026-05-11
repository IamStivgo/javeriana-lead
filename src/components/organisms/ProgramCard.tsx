import React from "react";
import { Link } from "react-router-dom";
import { Badge, Button, ProgressBar } from "@/components/atoms";
import { formatCOP, formatShortDate, CATEGORY_COLORS } from "@/utils";
import type { Program } from "@/types";
import clsx from "clsx";

export interface ProgramCardProps {
  program: Program;
  onInscribe?: (program: Program) => void;
  index?: number;
}

export const ProgramCard = React.memo(
  ({ program, onInscribe, index = 0 }: ProgramCardProps) => {
    const filled = program.seats - program.seatsLeft;
    const percentage = (filled / program.seats) * 100;
    const variant = percentage > 80 ? "danger" : percentage > 60 ? "warning" : "success";

    const handleInscribe = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onInscribe?.(program);
    };

    return (
      <Link to={`/programa/${program.id}`}>
        <article
          className={clsx(
            "group h-full flex flex-col rounded-2xl p-5",
            "bg-[var(--color-surface)] border border-[var(--color-line)]",
            "hover:border-[var(--color-accent)]/50 hover:-translate-y-1",
            "transition-all duration-300 cursor-pointer",
            "anim-up"
          )}
          style={{
            animationDelay: `${Math.min(index, 11) * 60}ms`,
            boxShadow: "var(--shadow-sm)",
          }}
        >
          {/* Top row: Badge */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <Badge
              variant={CATEGORY_COLORS[program.category]}
              size="sm"
            >
              {program.category}
            </Badge>
          </div>

          {/* Swatch - Image placeholder with stripes */}
          <div
            className="rounded-xl mb-4 overflow-hidden relative"
            style={{
              height: 110,
              background: `linear-gradient(135deg, var(--color-accent-soft), var(--color-surface-2))`,
            }}
          >
            {/* Stripes pattern */}
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 10px,
                  var(--color-line) 10px,
                  var(--color-line) 20px
                )`,
              }}
            />
            {/* Faculty label */}
            <div className="absolute bottom-3 left-3 mono text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)]">
              {program.faculty}
            </div>
            {/* Floating circle */}
            <div
              className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full anim-float"
              style={{ background: "var(--color-accent)", opacity: 0.16 }}
            />
          </div>

          {/* Title */}
          <h3 className="display-serif text-[22px] leading-[1.15] tracking-tight mb-1 text-[var(--color-ink)]">
            {program.title}
          </h3>

          {/* Summary */}
          <p className="text-[13px] text-[var(--color-ink-soft)] leading-snug mb-4 line-clamp-2">
            {program.summary}
          </p>

          {/* Meta information grid */}
          <div className="grid grid-cols-2 gap-2 mb-4 text-[11.5px] text-[var(--color-ink-soft)]">
            <div className="flex items-center gap-1.5">
              <ClockIcon />
              {program.duration}
            </div>
            <div className="flex items-center gap-1.5">
              <MapIcon />
              {program.modality}
            </div>
            <div className="flex items-center gap-1.5">
              <CalendarIcon />
              {formatShortDate(program.startDate)}
            </div>
            <div className="flex items-center gap-1.5">
              <StarIcon />
              {program.rating.toFixed(1)}
            </div>
          </div>

          {/* Seats progress - Footer section */}
          <div className="mt-auto pt-3 border-t border-[var(--color-line)]">
            <div className="flex items-center justify-between mb-1.5">
              <span className="mono text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)]">
                Cupos
              </span>
              <span
                className={clsx(
                  "mono text-[11px]",
                  percentage > 80 ? "text-[var(--color-rose)]" : "text-[var(--color-ink-soft)]"
                )}
              >
                {program.seatsLeft} / {program.seats}
              </span>
            </div>
            <ProgressBar
              value={filled}
              max={program.seats}
              variant={variant}
              size="sm"
            />

            {/* Price and CTA */}
            <div className="flex items-center justify-between mt-4">
              <div>
                <div className="mono text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)]">
                  Inversión
                </div>
                <div className="text-[13.5px] font-semibold mt-0.5 text-[var(--color-ink)]">
                  {formatCOP(program.price)}
                </div>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleInscribe}
                className="group/btn"
              >
                Inscribir
                <ArrowRightIcon />
              </Button>
            </div>
          </div>
        </article>
      </Link>
    );
  }
);

ProgramCard.displayName = "ProgramCard";

// ──────────────────── Icons ────────────────────

function ClockIcon() {
  return (
    <svg
      className="w-3 h-3 text-[var(--color-ink-muted)]"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
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
    <svg
      className="w-3 h-3 text-[var(--color-ink-muted)]"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
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

function CalendarIcon() {
  return (
    <svg
      className="w-3 h-3 text-[var(--color-ink-muted)]"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg
      className="w-3 h-3 text-[var(--color-gold)]"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      className="w-3 h-3 transition-transform group-hover/btn:translate-x-0.5"
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
