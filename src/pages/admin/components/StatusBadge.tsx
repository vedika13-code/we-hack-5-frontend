export function StatusBadge({
  status,
  variant = "default",
}: {
  status: string;
  variant?: "default" | "success" | "warning" | "danger";
}) {
  const baseClass = "admin-badge";
  let colorClass = "text-[var(--admin-paper-dim)] border-[var(--admin-line)]";

  if (variant === "success") {
    colorClass = "text-[var(--admin-accent)] border-[var(--admin-accent)]";
  } else if (variant === "warning") {
    colorClass = "text-[var(--admin-gold)] border-[var(--admin-gold)]";
  } else if (variant === "danger") {
    colorClass = "text-[var(--admin-pink)] border-[var(--admin-pink)]";
  }

  return <span className={`${baseClass} ${colorClass}`}>{status}</span>;
}
