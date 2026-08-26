import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { PageShell } from "../components/PageShell";

export default function Mentors() {
  const [mentors, setMentors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getMentors().then(setMentors).finally(() => setLoading(false));
  }, []);

  return (
    <PageShell 
      title="Mentors" 
      subtitle="Mentors will be available in person during the event to help your team. No booking needed — just find them on the floor."
    >
      {loading ? (
        <div className="admin-card p-12 text-center text-[var(--admin-muted)] font-mono animate-pulse uppercase tracking-widest">
          Loading mentors...
        </div>
      ) : mentors.length === 0 ? (
        <div className="admin-card p-12 text-center flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-[rgba(255,255,255,0.05)] border border-[var(--admin-line)] flex items-center justify-center mb-4 text-2xl">
            🤝
          </div>
          <h3 className="text-xl font-bold text-[var(--admin-paper)] mb-2">Mentors Pending</h3>
          <p className="text-[var(--admin-muted)]">Mentors will be announced soon.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mentors.map((m) => (
            <div key={m.id} className="admin-card flex items-center gap-4 hover:border-[var(--admin-accent)] transition-colors p-6">
              {m.photoUrl ? (
                <img src={m.photoUrl} alt={m.name} className="w-16 h-16 rounded-full object-cover border border-[var(--admin-line)]" />
              ) : (
                <div className="w-16 h-16 flex-shrink-0 rounded-full bg-[var(--admin-ink-soft)] border border-[var(--admin-line)] flex items-center justify-center text-xl font-display text-[var(--admin-accent)]">
                  {m.name.charAt(0)}
                </div>
              )}
              <div>
                <h3 className="text-xl font-bold text-[var(--admin-paper)]">{m.name}</h3>
                <div className="text-xs font-mono uppercase tracking-widest text-[var(--admin-pink)] mt-1">
                  {m.expertise}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </PageShell>
  );
}