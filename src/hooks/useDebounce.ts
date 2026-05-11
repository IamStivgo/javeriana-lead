import { useState, useEffect } from "react";

/**
 * Hook que retorna un valor debounced después de un delay
 * Útil para búsquedas en tiempo real sin hacer fetch en cada tecla
 */
export function useDebounce<T>(value: T, delay: number = 250): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
