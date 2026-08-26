export function EmptyState({ title, message }: { title: string; message: string }) {
  return (
    <div className="admin-card text-center py-16 flex flex-col items-center border-dashed">
      <div className="w-16 h-16 border border-[var(--admin-line)] rounded-full flex items-center justify-center mb-6">
        <span className="text-2xl opacity-50">∅</span>
      </div>
      <h3 className="text-2xl mb-2 text-[var(--admin-paper)]">{title}</h3>
      <p className="text-[var(--admin-muted)] max-w-sm">{message}</p>
    </div>
  );
}

export function LoadingState() {
  return (
    <div className="py-24 flex flex-col items-center justify-center">
      <div className="w-12 h-1 bg-[var(--admin-accent)] animate-pulse mb-6"></div>
      <p className="admin-eyebrow animate-pulse">Loading Operations Data</p>
    </div>
  );
}

export function ErrorState({ error }: { error: string }) {
  return (
    <div className="admin-card border-[var(--admin-pink)] bg-[rgba(238,154,182,0.05)] py-12">
      <h3 className="text-[var(--admin-pink)] mb-2">System Error</h3>
      <p className="text-[var(--admin-paper-dim)] font-mono text-sm">{error}</p>
    </div>
  );
}
