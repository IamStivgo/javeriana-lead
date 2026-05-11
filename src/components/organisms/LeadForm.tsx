import { useEffect, useRef, useState } from "react";
import { Input, Select, Checkbox, Button, Badge } from "@/components/atoms";
import { useLeadForm } from "@/hooks/useLeadForm";
import { useLeads } from "@/hooks/useLeads";
import { useToast } from "@/hooks/useToast";
import { usePrograms } from "@/hooks/usePrograms";
import { INTERESTS } from "@/utils/constants";
import { normalizeName, normalizePhone, isJaverianaDomain } from "@/utils/validators";
import type { Program } from "@/types";
import clsx from "clsx";

export interface LeadFormProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProgramId?: number;
}

type FormStep = "form" | "success";

export function LeadForm({
  isOpen,
  onClose,
  preselectedProgramId,
}: LeadFormProps) {
  const [step, setStep] = useState<FormStep>("form");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedName, setSubmittedName] = useState("");

  const { addLead } = useLeads();
  const { addToast } = useToast();
  const { data: programs } = usePrograms();

  const formRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  const form = useLeadForm();

  // Preseleccionar programa si viene de una card
  useEffect(() => {
    if (isOpen && preselectedProgramId) {
      form.setField("programId", preselectedProgramId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, preselectedProgramId]);

  // Focus trap y focus inicial
  useEffect(() => {
    if (isOpen && step === "form") {
      setTimeout(() => {
        firstInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen, step]);

  const handleClose = () => {
    if (isSubmitting) return;
    setStep("form");
    form.reset();
    onClose();
  };

  // Cerrar con Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isSubmitting) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, isSubmitting]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = form.validateAll();
    if (!isValid) {
      addToast("Por favor corrige los errores del formulario", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      // Simular delay de API
      await new Promise((resolve) => setTimeout(resolve, 600));

      // Normalizar datos
      const normalizedFullName = normalizeName(form.data.fullName);
      const normalizedEmail = form.data.email.trim().toLowerCase();
      const normalizedPhone = normalizePhone(form.data.phone);
      const isJaveriana = isJaverianaDomain(form.data.email);

      // Crear lead
      const newLead = {
        id: `lead_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
        fullName: normalizedFullName,
        email: normalizedEmail,
        phone: normalizedPhone,
        programId: form.data.programId as number,
        interest: form.data.interest,
        notes: form.data.notes.trim(),
        isJaveriana,
        createdAt: new Date().toISOString(),
      };

      addLead(newLead);
      setSubmittedName(normalizedFullName);
      setStep("success");

      addToast(`Lead registrado: ${normalizedFullName}`, "success");
    } catch {
      addToast("Error al registrar el lead. Intenta nuevamente.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccessClose = () => {
    handleClose();
  };

  if (!isOpen) return null;

  const programOptions =
    programs?.map((p: Program) => ({
      value: p.id,
      label: `${p.title} - ${p.category}`,
    })) ?? [];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 anim-fade"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Sheet lateral */}
      <div
        ref={formRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-form-title"
        className={clsx(
          "fixed top-0 right-0 h-full w-full max-w-lg z-50",
          "bg-[var(--color-bg)] border-l border-[var(--color-line)]",
          "shadow-2xl overflow-y-auto anim-right"
        )}
      >
        {step === "form" && (
          <form onSubmit={handleSubmit} className="flex flex-col h-full">
            {/* Header */}
            <div className="sticky top-0 bg-[var(--color-bg)] border-b border-[var(--color-line)] px-6 py-4 z-10">
              <div className="flex items-center justify-between">
                <h2
                  id="lead-form-title"
                  className="display-serif text-2xl text-[var(--color-ink)]"
                >
                  Inscribir Lead
                </h2>
                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isSubmitting}
                  className="p-2 rounded-lg hover:bg-[var(--color-surface-2)] transition-colors text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
                  aria-label="Cerrar formulario"
                >
                  <CloseIcon />
                </button>
              </div>
              <p className="text-sm text-[var(--color-ink-soft)] mt-1">
                Completa los datos del prospecto interesado
              </p>
            </div>

            {/* Body */}
            <div className="flex-1 px-6 py-6 space-y-5">
              {/* Nombre completo */}
              <Input
                ref={firstInputRef}
                label="Nombre completo"
                placeholder="Ej: María José Pérez"
                value={form.data.fullName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => form.setField("fullName", e.target.value)}
                onBlur={() => form.validateField("fullName")}
                error={form.touched.fullName ? form.errors.fullName : undefined}
                required
                fullWidth
                disabled={isSubmitting}
              />

              {/* Email */}
              <div>
                <Input
                  label="Email"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={form.data.email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => form.setField("email", e.target.value)}
                  onBlur={() => form.validateField("email")}
                  error={form.touched.email ? form.errors.email : undefined}
                  required
                  fullWidth
                  disabled={isSubmitting}
                />
                {form.isJaverianaEmail && !form.errors.email && (
                  <div className="mt-2 flex items-center gap-2">
                    <Badge variant="indigo" size="sm">
                      <InfoIcon />
                      Email institucional detectado
                    </Badge>
                  </div>
                )}
              </div>

              {/* Teléfono */}
              <Input
                label="Teléfono"
                type="tel"
                placeholder="300 123 4567"
                value={form.data.phone}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => form.setField("phone", e.target.value)}
                onBlur={() => form.validateField("phone")}
                error={form.touched.phone ? form.errors.phone : undefined}
                helperText="Mínimo 7 dígitos"
                required
                fullWidth
                disabled={isSubmitting}
              />

              {/* Programa */}
              <Select
                label="Programa de interés"
                placeholder="Selecciona un programa"
                value={form.data.programId}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  form.setField(
                    "programId",
                    e.target.value === "" ? "" : Number(e.target.value)
                  )
                }
                onBlur={() => form.validateField("programId")}
                error={
                  form.touched.programId ? form.errors.programId : undefined
                }
                options={programOptions}
                required
                fullWidth
                disabled={isSubmitting}
              />

              {/* Área de interés */}
              <Select
                label="Área de interés"
                placeholder="¿Qué te gustaría saber?"
                value={form.data.interest}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => form.setField("interest", e.target.value)}
                onBlur={() => form.validateField("interest")}
                error={form.touched.interest ? form.errors.interest : undefined}
                options={INTERESTS.map((i: string) => ({ value: i, label: i }))}
                required
                fullWidth
                disabled={isSubmitting}
              />

              {/* Notas adicionales */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="notes"
                  className="text-sm font-medium text-[var(--color-ink)]"
                >
                  Notas adicionales
                </label>
                <textarea
                  id="notes"
                  placeholder="Información adicional relevante..."
                  value={form.data.notes}
                  onChange={(e) => form.setField("notes", e.target.value)}
                  rows={4}
                  maxLength={500}
                  disabled={isSubmitting}
                  className={clsx(
                    "px-3 py-2 rounded-lg border transition-all duration-200",
                    "bg-[var(--color-surface)] text-[var(--color-ink)]",
                    "placeholder:text-[var(--color-ink-muted)]",
                    "border-[var(--color-line)] focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)]",
                    "focus:outline-none focus:ring-2 focus:ring-offset-1",
                    "resize-none"
                  )}
                />
                <span className="text-xs text-[var(--color-ink-muted)]">
                  {form.data.notes.length} / 500 caracteres
                </span>
              </div>

              {/* Consentimiento */}
              <div className="pt-2">
                <Checkbox
                  label={
                    <span className="text-xs leading-relaxed">
                      Acepto el{" "}
                      <a
                        href="https://www.javeriana.edu.co/tratamiento-datos"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--color-accent)] hover:underline"
                      >
                        tratamiento de datos personales
                      </a>{" "}
                      de acuerdo con la Ley 1581 de 2012 (Habeas Data)
                    </span>
                  }
                  checked={form.data.consent}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => form.setField("consent", e.target.checked)}
                  onBlur={() => form.validateField("consent")}
                  error={form.touched.consent ? form.errors.consent : undefined}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="sticky bottom-0 bg-[var(--color-bg)] border-t border-[var(--color-line)] px-6 py-4">
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleClose}
                  disabled={isSubmitting}
                  fullWidth
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting || !form.data.consent}
                  fullWidth
                >
                  {isSubmitting ? (
                    <>
                      <SpinnerIcon />
                      Guardando...
                    </>
                  ) : (
                    "Guardar Lead"
                  )}
                </Button>
              </div>
            </div>
          </form>
        )}

        {step === "success" && (
          <div className="flex flex-col items-center justify-center h-full px-6 py-12 text-center">
            <div className="anim-pop">
              <div className="w-20 h-20 rounded-full bg-[var(--color-emerald)]/10 flex items-center justify-center mb-6">
                <CheckCircleIcon />
              </div>
              <h2 className="display-serif text-3xl text-[var(--color-ink)] mb-3">
                ¡Lead registrado!
              </h2>
              <p className="text-[var(--color-ink-soft)] mb-2 max-w-sm">
                <strong className="text-[var(--color-ink)]">
                  {submittedName}
                </strong>{" "}
                ha sido agregado exitosamente a la base de datos.
              </p>
              <p className="text-sm text-[var(--color-ink-muted)] mb-8">
                Puedes ver todos los leads registrados en la sección de Leads.
              </p>
              <Button variant="primary" onClick={handleSuccessClose}>
                Entendido
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// ──────────────────── Icons ────────────────────

function CloseIcon() {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg
      className="w-3 h-3"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg
      className="w-4 h-4 animate-spin"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg
      className="w-12 h-12 text-[var(--color-emerald)]"
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
