import { Link } from "react-router-dom";
import { Button } from "../components/atoms";

export function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-6 max-w-md mx-auto px-4">
        {/* 404 Illustration */}
        <div className="relative">
          <div className="text-[120px] font-bold text-[var(--color-accent)]/10 leading-none display-serif">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-20 h-20 text-[var(--color-accent)] anim-float"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-[var(--color-ink)] display-serif">
            Página no encontrada
          </h1>
          <p className="text-[var(--color-ink-soft)]">
            La página que buscas no existe o ha sido movida.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/">
            <Button variant="primary">
              Volver al inicio
            </Button>
          </Link>
          <Link to="/leads">
            <Button variant="outline">
              Ver leads
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
