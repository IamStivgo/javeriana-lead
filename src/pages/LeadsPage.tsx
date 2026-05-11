import { useLeads } from "../hooks";

export function LeadsPage() {
  const { leads } = useLeads();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[var(--color-ink)] display-serif">
            Leads Registrados
          </h1>
          <p className="text-[var(--color-ink-soft)] mt-2">
            {leads.length} {leads.length === 1 ? "lead registrado" : "leads registrados"}
          </p>
        </div>
      </div>

      {/* Este componente se completará en el paso 16 */}
      <div className="text-center py-20">
        <p className="text-[var(--color-ink-muted)]">
          Listado de leads en construcción...
        </p>
      </div>
    </div>
  );
}
