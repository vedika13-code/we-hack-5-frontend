import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { PageShell } from "../components/PageShell";

export default function Leaderboard() {
  const [teams, setTeams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getLeaderboard().then(setTeams).finally(() => setLoading(false));
  }, []);

  return (
    <PageShell 
      title="Results" 
      subtitle="Shortlisted teams, announced here as they're finalized by the judges."
    >
      {loading ? (
        <div className="admin-card p-12 text-center text-[var(--admin-muted)] font-mono animate-pulse uppercase tracking-widest">
          Loading results...
        </div>
      ) : teams.length === 0 ? (
        <div className="admin-card p-12 text-center flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-[rgba(255,255,255,0.05)] border border-[var(--admin-line)] flex items-center justify-center mb-4 text-2xl">
            🏆
          </div>
          <h3 className="text-xl font-bold text-[var(--admin-paper)] mb-2">Results Pending</h3>
          <p className="text-[var(--admin-muted)]">Results haven't been announced yet — check back soon.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {teams.map((t, i) => (
            <div key={t.id} className="admin-card flex flex-col md:flex-row md:items-center justify-between p-6 gap-4 border-l-4 border-l-[var(--admin-lime)] hover:border-l-[var(--admin-pink)] transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex-shrink-0 bg-[var(--admin-ink)] border border-[var(--admin-line)] flex items-center justify-center text-xl font-display font-bold text-[var(--admin-lime)] rounded">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[var(--admin-paper)]">{t.name}</h3>
                  <p className="text-[var(--admin-muted)] font-mono text-sm mt-1">{t.college}</p>
                </div>
              </div>
              {t.track && (
                <div className="text-xs font-bold uppercase tracking-widest bg-[var(--admin-accent)] text-[var(--admin-ink)] px-3 py-1 rounded inline-block self-start md:self-auto">
                  {t.track}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </PageShell>
  );
}