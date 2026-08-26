import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { PageShell } from "../components/PageShell";

export default function Judges() {
  const [judges, setJudges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getJudges().then(setJudges).finally(() => setLoading(false));
  }, []);

  return (
    <PageShell 
      title="Judges" 
      subtitle="Meet the industry experts evaluating your projects and crowning the winners."
    >
      {loading ? (
        <div className="admin-card p-12 text-center text-[var(--admin-muted)] font-mono animate-pulse uppercase tracking-widest">
          Loading judges...
        </div>
      ) : judges.length === 0 ? (
        <div className="admin-card p-12 text-center flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-[rgba(255,255,255,0.05)] border border-[var(--admin-line)] flex items-center justify-center mb-4 text-2xl">
            ⚖️
          </div>
          <h3 className="text-xl font-bold text-[var(--admin-paper)] mb-2">Panel Pending</h3>
          <p className="text-[var(--admin-muted)]">Judges will be announced soon.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {judges.map((j) => (
            <div key={j.id} className="admin-card flex flex-col h-full hover:border-[var(--admin-lime)] transition-colors p-6">
              <div className="flex items-start gap-4 mb-4">
                {j.photoUrl ? (
                  <img src={j.photoUrl} alt={j.name} className="w-16 h-16 rounded-full object-cover border border-[var(--admin-line)]" />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-[var(--admin-ink-soft)] border border-[var(--admin-line)] flex items-center justify-center text-xl font-display text-[var(--admin-lime)]">
                    {j.name.charAt(0)}
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-bold text-[var(--admin-paper)]">{j.name}</h3>
                  <p className="text-sm font-mono text-[var(--admin-accent)] mt-1">{j.designation}</p>
                  <p className="text-sm text-[var(--admin-muted)]">{j.company}</p>
                </div>
              </div>
              <p className="text-sm text-[var(--admin-paper-dim)] flex-grow italic">
                "{j.bio || j.expertise}"
              </p>
              
              {(j.linkedin || j.expertise) && (
                <div className="mt-4 pt-4 border-t border-[var(--admin-line)] flex flex-wrap gap-2 items-center justify-between">
                  <div className="text-xs font-mono text-[var(--admin-muted)]">
                    {j.expertise}
                  </div>
                  {j.linkedin && (
                    <a href={j.linkedin} target="_blank" rel="noreferrer" className="text-xs uppercase tracking-widest font-bold text-[var(--admin-pink)] hover:text-[var(--admin-paper)] underline underline-offset-4">
                      LinkedIn
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </PageShell>
  );
}