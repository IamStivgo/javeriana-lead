import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "../layouts";
import {
  DashboardPage,
  ProgramDetailPage,
  LeadsPage,
  NotFoundPage,
} from "../../pages";

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
        element: <ProgramDetailPage />,
      },
      {
        path: "leads",
        element: <LeadsPage />,
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
