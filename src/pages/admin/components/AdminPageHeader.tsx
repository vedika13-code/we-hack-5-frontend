import { ReactNode } from "react";

export function AdminPageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-[var(--admin-line)] pb-6">
      <div>
        <h1 className="text-4xl md:text-5xl">{title}</h1>
        {description && (
          <p className="admin-editorial-italic text-lg mt-3">{description}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
