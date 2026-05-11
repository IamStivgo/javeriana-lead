import { lazy, Suspense, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "../layouts";
import { DashboardPage, NotFoundPage } from "../../pages";

// ──────────────────── Lazy-loaded Routes ────────────────────

const ProgramDetailPage = lazy(() =>
  import("../../pages/ProgramDetailPage").then((module) => ({
    default: module.ProgramDetailPage,
  }))
);

const LeadsPage = lazy(() =>
  import("../../pages/LeadsPage").then((module) => ({
    default: module.LeadsPage,
  }))
);

// ──────────────────── Loading Fallback ────────────────────

function PageLoader() {
  const [widths] = useState(() =>
    Array.from({ length: 5 }, () => Math.random() * 40 + 60)
  );

  return (
    <div className="space-y-6 anim-fade">
      <div className="h-4 w-32 bg-[var(--color-surface-2)] rounded animate-pulse" />
      <div className="h-10 w-3/4 bg-[var(--color-surface-2)] rounded animate-pulse" />
      <div className="h-64 bg-[var(--color-surface-2)] rounded-xl animate-pulse" />
      <div className="space-y-3">
        {widths.map((width, i) => (
          <div
            key={i}
            className="h-4 bg-[var(--color-surface-2)] rounded animate-pulse"
            style={{ width: `${width}%` }}
          />
        ))}
      </div>
    </div>
  );
}

// ──────────────────── Router Configuration ────────────────────

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout showSearch />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: "programa/:id",
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProgramDetailPage />
          </Suspense>
        ),
      },
      {
        path: "leads",
        element: (
          <Suspense fallback={<PageLoader />}>
            <LeadsPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

// ──────────────────── Router Component ────────────────────

export function AppRouter() {
  return <RouterProvider router={router} />;
}
