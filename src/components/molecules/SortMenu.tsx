import type { SortKey } from "../../types";
import { Select } from "../atoms/Select";
import { SORT_OPTIONS } from "../../utils/constants";

export interface SortMenuProps {
  value: SortKey;
  onChange: (value: SortKey) => void;
  label?: string;
  className?: string;
}

/**
 * Componente de ordenamiento tipado para programas
 */
export function SortMenu({
  value,
  onChange,
  label = "Ordenar por",
  className,
}: SortMenuProps) {
  return (
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value as SortKey)}
      options={SORT_OPTIONS}
      label={label}
      className={className}
      aria-label="Ordenar programas"
    />
  );
}
