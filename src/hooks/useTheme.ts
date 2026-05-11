import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext.context";
import type { ThemeContextValue } from "../context/ThemeContext.types";

/**
 * Hook para acceder al contexto de Theme
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme debe usarse dentro de un ThemeProvider");
  }

  return context;
}
