export function MetricCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="admin-card flex flex-col justify-between h-32">
      <p className="admin-eyebrow">{label}</p>
      <p className="admin-display-text text-4xl mt-4">{value}</p>
    </div>
  );
}
