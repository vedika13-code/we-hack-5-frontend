import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import { PageShell } from "../components/PageShell";

export default function Team() {
  const [user, setUser] = useState<any>(null);
  const [team, setTeam] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function load() {
    setLoading(true);
    try {
      const me = await api.me();
      setUser(me);
      if (me.teamId) {
        const t = await api.getTeam(me.teamId);
        setTeam(t);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleFinalize() {
    setError("");
    try {
      const updated = await api.finalizeTeam(team.id);
      setTeam((prev: any) => ({ ...prev, registrationComplete: updated.registrationComplete }));
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function handleRemove(memberId: string) {
    setError("");
    try {
      const updated = await api.removeMember(team.id, memberId);
      setTeam(updated);
    } catch (err: any) {
      setError(err.message);
    }
  }

  if (loading) return (
    <PageShell title="Your Team">
      <div className="admin-card p-12 text-center text-[var(--admin-muted)] font-mono animate-pulse uppercase tracking-widest">
        Loading team data...
      </div>
    </PageShell>
  );

  if (!team) {
    return (
      <PageShell title="Your Team" subtitle="You are not part of any team yet.">
        <div className="admin-card p-12 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-[rgba(255,255,255,0.05)] border border-[var(--admin-line)] flex items-center justify-center mb-6 text-2xl">
            🤝
          </div>
          <button className="admin-primary-action" onClick={() => navigate("/registration")}>
            Register a team
          </button>
        </div>
      </PageShell>
    );
  }

  const isLeader = user?.role === "TEAM_LEADER";

  return (
    <PageShell title={team.name} subtitle="Manage your team members and registration status.">
      {error && (
        <div className="bg-[rgba(255,90,90,0.1)] border border-[var(--admin-pink)] text-[var(--admin-pink)] p-4 rounded mb-8 font-mono text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="admin-card p-6 md:p-8">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--admin-line)]">
            <h2 className="text-sm font-bold font-mono tracking-widest text-[var(--admin-accent)] uppercase">Team Details</h2>
            <span className="text-xs font-mono bg-[var(--admin-ink)] px-3 py-1 rounded border border-[var(--admin-line)] tracking-widest text-[var(--admin-paper)]">
              CODE: {team.code}
            </span>
          </div>
          
          <div className="space-y-4 font-mono text-sm">
            <div>
              <p className="text-[var(--admin-muted)] uppercase tracking-widest text-xs mb-1">College</p>
              <p className="text-[var(--admin-paper)]">{team.college}</p>
            </div>
            {team.track && (
              <div>
                <p className="text-[var(--admin-muted)] uppercase tracking-widest text-xs mb-1">Track</p>
                <p className="text-[var(--admin-paper)]">{team.track}</p>
              </div>
            )}
            {team.ideaTitle && (
              <div>
                <p className="text-[var(--admin-muted)] uppercase tracking-widest text-xs mb-1">Idea</p>
                <p className="text-[var(--admin-paper)]">{team.ideaTitle}</p>
              </div>
            )}
            <div>
              <p className="text-[var(--admin-muted)] uppercase tracking-widest text-xs mb-1">Status</p>
              <div className="flex items-center gap-3">
                <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-widest ${
                  team.registrationStatus === 'APPROVED' ? 'bg-[rgba(220,255,145,0.1)] text-[var(--admin-lime)]' : 
                  team.registrationStatus === 'REJECTED' ? 'bg-[rgba(255,90,90,0.1)] text-[var(--admin-pink)]' : 
                  'bg-[var(--admin-ink)] text-[var(--admin-paper)]'
                }`}>
                  {team.registrationStatus}
                </span>
                <span className="text-[var(--admin-paper-dim)]">
                  ({team.registrationComplete ? "Finalized" : "Not Finalized"})
                </span>
              </div>
            </div>
          </div>
          
          {isLeader && !team.registrationComplete && (
            <button className="admin-primary-action w-full mt-8" onClick={handleFinalize}>
              Finalize Registration
            </button>
          )}
        </div>

        <div className="admin-card p-6 md:p-8">
          <h2 className="text-sm font-bold font-mono tracking-widest text-[var(--admin-accent)] uppercase mb-8 pb-4 border-b border-[var(--admin-line)]">Members</h2>
          
          <div className="flex flex-col gap-3">
            {team.members?.map((m: any) => (
              <div key={m.id} className="flex items-center justify-between p-3 rounded bg-[var(--admin-ink-soft)] border border-[var(--admin-line)]">
                <div>
                  <p className="font-bold text-[var(--admin-paper)] flex items-center gap-2">
                    {m.fullName}
                    {m.role === "TEAM_LEADER" && (
                      <span className="text-[0.65rem] bg-[var(--admin-lime)] text-[var(--admin-ink)] px-2 py-0.5 rounded uppercase tracking-widest">
                        Leader
                      </span>
                    )}
                  </p>
                  <p className="text-xs font-mono text-[var(--admin-muted)] mt-1">{m.email}</p>
                </div>
                {isLeader && m.role !== "TEAM_LEADER" && (
                  <button 
                    className="admin-danger-action !px-3 !py-1 !text-xs !h-auto" 
                    onClick={() => handleRemove(m.id)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
