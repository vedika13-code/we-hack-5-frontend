import { ReactNode } from "react";

export function ConfirmDialog({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  isDestructive = false,
  isBusy = false,
}: {
  isOpen: boolean;
  title: string;
  message: ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  isDestructive?: boolean;
  isBusy?: boolean;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(10,11,10,0.9)] backdrop-blur-sm">
      <div className="admin-card max-w-md w-full relative shadow-2xl border-[var(--admin-accent)] border">
        <h2 className="text-2xl mb-4 text-[var(--admin-paper)]">{title}</h2>
        <div className="text-[var(--admin-paper-dim)] mb-8 text-sm leading-relaxed">
          {message}
        </div>
        <div className="flex gap-4 justify-end">
          <button
            onClick={onCancel}
            disabled={isBusy}
            className="admin-secondary-action"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            disabled={isBusy}
            className={isDestructive ? "admin-danger-action" : "admin-primary-action !h-10"}
          >
            {isBusy ? "Processing..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
