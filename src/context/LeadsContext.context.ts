import { createContext } from "react";
import type { LeadsContextValue } from "./LeadsContext.types";

export const LeadsContext = createContext<LeadsContextValue | undefined>(undefined);
