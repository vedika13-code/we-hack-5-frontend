import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../lib/api";
import { PageShell } from "../components/PageShell";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    api.me().then(setUser).catch(() => {});
  }, []);

  return (
    <PageShell 
      title="Participant Dashboard" 
      subtitle="Welcome to your central hub for WE HACK 5.0."
    >
      {!user ? (
        <div className="admin-card p-12 text-center text-[var(--admin-muted)] font-mono animate-pulse uppercase tracking-widest">
          Loading dashboard...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="admin-card p-6 md:p-8">
            <h2 className="text-sm font-bold font-mono tracking-widest text-[var(--admin-accent)] uppercase mb-6 pb-4 border-b border-[var(--admin-line)]">
              Your Profile
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-[var(--admin-muted)] mb-1">Name</p>
                <p className="text-lg font-bold text-[var(--admin-paper)]">{user.fullName}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-[var(--admin-muted)] mb-1">Email</p>
                <p className="text-[var(--admin-paper-dim)] font-mono text-sm">{user.email}</p>
              </div>
              <div className="pt-4 mt-4 border-t border-[var(--admin-line)]">
                <Link to="/profile" className="text-xs uppercase tracking-widest font-bold text-[var(--admin-pink)] hover:text-[var(--admin-paper)] underline underline-offset-4">
                  Edit Profile
                </Link>
              </div>
            </div>
          </div>

          <div className="admin-card p-6 md:p-8">
            <h2 className="text-sm font-bold font-mono tracking-widest text-[var(--admin-accent)] uppercase mb-6 pb-4 border-b border-[var(--admin-line)]">
              Team Status
            </h2>
            <div className="space-y-4 flex flex-col h-[calc(100%-4rem)]">
              <div>
                <p className="text-xs uppercase tracking-widest text-[var(--admin-muted)] mb-2">Registration Status</p>
                {user.team ? (
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-widest ${
                      user.team.registrationStatus === 'APPROVED' ? 'bg-[rgba(220,255,145,0.1)] text-[var(--admin-lime)]' : 
                      user.team.registrationStatus === 'REJECTED' ? 'bg-[rgba(255,90,90,0.1)] text-[var(--admin-pink)]' : 
                      'bg-[var(--admin-ink)] text-[var(--admin-paper)] border border-[var(--admin-line)]'
                    }`}>
                      {user.team.registrationStatus}
                    </span>
                    <span className="text-sm font-mono text-[var(--admin-paper-dim)]">
                      {user.team.name}
                    </span>
                  </div>
                ) : (
                  <span className="px-2 py-1 rounded text-xs font-bold uppercase tracking-widest bg-[var(--admin-ink)] text-[var(--admin-muted)] border border-[var(--admin-line)] inline-block">
                    No team yet
                  </span>
                )}
              </div>
              
              <div className="flex-grow"></div>
              
              <div className="pt-4 mt-4 border-t border-[var(--admin-line)]">
                {user.team ? (
                  <Link to="/team" className="text-xs uppercase tracking-widest font-bold text-[var(--admin-lime)] hover:text-[var(--admin-paper)] underline underline-offset-4">
                    Manage Team
                  </Link>
                ) : (
                  <Link to="/registration" className="admin-primary-action inline-block">
                    Register Team
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </PageShell>
  );
}
