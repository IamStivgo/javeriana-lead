import { useState, useEffect } from "react";
import type { ReactNode } from "react";
import { STORAGE_KEYS } from "../utils";
import { ThemeContext } from "./ThemeContext.context";
import type { ThemeContextValue } from "./ThemeContext.types";

// ──────────────────── Provider ────────────────────

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  // Inicializar desde localStorage o preferencia del sistema
  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.THEME);
      if (stored !== null) {
        return stored === "dark";
      }

      if (window.matchMedia) {
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
      }

      return false;
    } catch (error) {
      console.warn("Error al leer theme de localStorage:", error);
      return false;
    }
  });

  useEffect(() => {
    const root = document.documentElement;

    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    try {
      localStorage.setItem(STORAGE_KEYS.THEME, isDark ? "dark" : "light");
    } catch (error) {
      console.warn("Error al guardar theme en localStorage:", error);
    }
  }, [isDark]);

  useEffect(() => {
    if (!window.matchMedia) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      const stored = localStorage.getItem(STORAGE_KEYS.THEME);
      if (stored === null) {
        setIsDark(e.matches);
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleChange);
      } else if (mediaQuery.removeListener) {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  // ──────────────────── Actions ────────────────────

  const toggle = () => {
    setIsDark((prev) => !prev);
  };

  const setDark = (dark: boolean) => {
    setIsDark(dark);
  };

  // ──────────────────── Context Value ────────────────────

  const value: ThemeContextValue = {
    isDark,
    toggle,
    setDark,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
