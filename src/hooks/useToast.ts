import { useContext } from "react";
import { ToastContext } from "../components/atoms/Toast.context";
import type { ToastContextValue } from "../components/atoms/Toast.types";

/**
 * Hook para acceder al contexto de Toast
 */
export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);

  if (context === undefined) {
    throw new Error("useToast debe usarse dentro de un ToastProvider");
  }

  return context;
}
