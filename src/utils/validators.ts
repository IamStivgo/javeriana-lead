/**
 * Expresión regular para validar formato de email
 */
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Valida si un string tiene formato de email válido
 */
export function isEmail(value: string): boolean {
  return EMAIL_RE.test(value.trim());
}

/**
 * Valida si un email pertenece al dominio institucional de la Javeriana
 */
export function isJaverianaDomain(value: string): boolean {
  return value.trim().toLowerCase().endsWith("@javeriana.edu.co");
}

/**
 * Normaliza un nombre completo:
 */
export function normalizeName(raw: string): string {
  return raw
    .trim()
    .replace(/\s+/g, " ") // Reemplazar múltiples espacios por uno solo
    .toLowerCase()
    .split(" ")
    .map((word) => {
      if (word.length === 0) return word;
      return word[0].toUpperCase() + word.slice(1);
    })
    .join(" ");
}

/**
 * Valida formato de teléfono (mínimo 7 dígitos)
 */
export function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, ""); // Extraer solo dígitos
  return digits.length >= 7;
}

/**
 * Normaliza un número de teléfono:
 */
export function normalizePhone(raw: string): string {
  // Preservar + inicial si existe (código internacional)
  const hasPlus = raw.trim().startsWith("+");
  const digits = raw.replace(/\D/g, "");

  if (digits.length === 0) return "";

  // Formato colombiano típico: XXX XXX XXXX
  if (digits.length === 10) {
    return `${hasPlus ? "+" : ""}${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
  }

  // Formato genérico con espacios cada 3 dígitos
  const formatted = digits.match(/.{1,3}/g)?.join(" ") ?? digits;
  return hasPlus ? `+${formatted}` : formatted;
}

/**
 * Valida que un string tenga un mínimo de caracteres después de trim
 */
export function hasMinLength(value: string, min: number): boolean {
  return value.trim().length >= min;
}
