
/**
 * Formatea un número como precio en pesos colombianos (COP)
  formatCOP(8950000) // "$8.950.000"
 */
export function formatCOP(amount: number): string {
  // Si es 0, mostrar "Gratis" o "Sin costo"
  if (amount === 0) {
    return "Gratis";
  }

  const formatted = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);

  return formatted;
}

/**
 * Formatea una fecha ISO a formato corto legible en español
 */
export function formatShortDate(isoDate: string): string {
  try {
    const date = new Date(isoDate + "T00:00:00"); // Forzar hora local

    const day = date.getDate();
    const month = date.toLocaleDateString("es-CO", { month: "short" });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  } catch (error) {
    console.warn("Error al formatear fecha:", isoDate, error);
    return isoDate;
  }
}

/**
 * Formatea una fecha ISO a formato largo legible en español
 */
export function formatLongDate(isoDate: string): string {
  try {
    const date = new Date(isoDate + "T00:00:00");

    return date.toLocaleDateString("es-CO", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch (error) {
    console.warn("Error al formatear fecha:", isoDate, error);
    return isoDate;
  }
}

/**
 * Formatea un timestamp ISO a formato relativo (hace X tiempo)
 */
export function formatRelativeTime(isoTimestamp: string): string {
  try {
    const date = new Date(isoTimestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMinutes < 1) return "hace un momento";
    if (diffMinutes < 60) return `hace ${diffMinutes} min`;
    if (diffHours < 24) return `hace ${diffHours}h`;
    if (diffDays < 7) return `hace ${diffDays}d`;

    return formatShortDate(isoTimestamp.split("T")[0]);
  } catch (error) {
    console.warn("Error al formatear tiempo relativo:", isoTimestamp, error);
    return isoTimestamp;
  }
}

/**
 * Formatea un número como porcentaje
 */
export function formatPercentage(value: number, decimals: number = 0): string {
  const percentage = value <= 1 ? value * 100 : value;
  return `${percentage.toFixed(decimals)}%`;
}

/**
 * Trunca un texto largo con ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}
