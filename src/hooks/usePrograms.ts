import { useState, useEffect } from "react";
import type { ApiState, Program } from "@/types";
import { fetchPrograms } from "@/services";

/**
 * Hook que maneja el fetch de programas con estados loading/error/success
 * Incluye AbortController para cancelar peticiones pendientes
 */
export function usePrograms(): ApiState<Program[]> {
  const [state, setState] = useState<ApiState<Program[]>>({
    status: "idle",
    data: null,
    error: null,
  });

  useEffect(() => {
    const abortController = new AbortController();

    const loadPrograms = async () => {
      setState({ status: "loading", data: null, error: null });

      try {
        const programs = await fetchPrograms(abortController.signal);
        
        if (!abortController.signal.aborted) {
          setState({ status: "success", data: programs, error: null });
        }
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }

        if (!abortController.signal.aborted) {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "Error desconocido al cargar programas";

          setState({ status: "error", data: null, error: errorMessage });
        }
      }
    };

    loadPrograms();

    return () => {
      abortController.abort();
    };
  }, []); 
  return state;
}
