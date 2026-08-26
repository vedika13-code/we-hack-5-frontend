import { ReactNode } from "react";
import "../pages/admin/admin.css";

interface PageShellProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export function PageShell({ children, title, subtitle }: PageShellProps) {
  return (
    <div className="admin-theme min-h-screen bg-[var(--admin-bg)] text-[var(--admin-text)] py-12 px-4 md:px-12 flex flex-col items-center">
      <div className="w-full max-w-5xl">
        <h1 className="text-4xl md:text-5xl font-display font-bold text-[var(--admin-lime)] uppercase tracking-widest mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-[var(--admin-paper-dim)] mb-12 text-lg max-w-2xl">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}
