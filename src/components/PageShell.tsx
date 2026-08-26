import { ReactNode } from "react";
import "../pages/admin/admin.css";

interface PageShellProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export function PageShell({ children, title, subtitle }: PageShellProps) {
  return (
    <div className="admin-theme min-h-screen bg-[var(--admin-bg)] text-[var(--admin-text)] py-8 md:py-12 px-4 md:px-12 flex flex-col items-center">
      <div className="w-full max-w-5xl">
        <div className="flex items-center gap-4 mb-8">
          <img 
            src="/brand/wehack-logo.webp" 
            alt="WE HACK 5.0" 
            className="h-10 md:h-12 object-contain"
          />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-display font-bold text-[var(--admin-lime)] uppercase tracking-widest mb-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-[var(--admin-paper-dim)] mb-10 text-lg max-w-2xl">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </div>
  );
}
