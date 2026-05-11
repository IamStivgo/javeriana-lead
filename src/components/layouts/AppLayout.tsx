import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export interface AppLayoutProps {
  onSearch?: (value: string) => void;
  showSearch?: boolean;
}

export function AppLayout({ onSearch, showSearch = true }: AppLayoutProps) {
  return (
    <div className="min-h-screen flex bg-[var(--color-bg)]">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 min-w-0 flex flex-col">
        {/* Topbar */}
        <Topbar onSearch={onSearch} showSearch={showSearch} />

        {/* Page content */}
        <div className="px-6 lg:px-10 py-7 max-w-[1400px] w-full mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
