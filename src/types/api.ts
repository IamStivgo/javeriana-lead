export interface ApiState<T> {
  status: "idle" | "loading" | "success" | "error";
  data: T | null;
  error: string | null;
}

/**
 * Helper type: ApiState en estado idle
 */
export type IdleState<T> = ApiState<T> & { status: "idle"; data: null; error: null };

/**
 * Helper type: ApiState en estado loading
 */
export type LoadingState<T> = ApiState<T> & { status: "loading"; data: null; error: null };

/**
 * Helper type: ApiState en estado success
 */
export type SuccessState<T> = ApiState<T> & { status: "success"; data: T; error: null };

/**
 * Helper type: ApiState en estado error
 */
export type ErrorState<T> = ApiState<T> & { status: "error"; data: null; error: string };
