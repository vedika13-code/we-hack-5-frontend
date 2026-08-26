import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { PageShell } from "../components/PageShell";

export default function Sponsors() {
  const [sponsors, setSponsors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getSponsors().then(setSponsors).finally(() => setLoading(false));
  }, []);

  const titleSponsors = sponsors.filter((s) => s.tier === "title");
  const partnerSponsors = sponsors.filter((s) => s.tier === "partner");

  return (
    <PageShell 
      title="Sponsors" 
      subtitle="WE HACK 5.0 is made possible by our generous partners and sponsors."
    >
      {loading ? (
        <div className="admin-card p-12 text-center text-[var(--admin-muted)] font-mono animate-pulse uppercase tracking-widest">
          Loading sponsors...
        </div>
      ) : sponsors.length === 0 ? (
        <div className="admin-card p-12 text-center flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-[rgba(255,255,255,0.05)] border border-[var(--admin-line)] flex items-center justify-center mb-4 text-2xl">
            🤝
          </div>
          <h3 className="text-xl font-bold text-[var(--admin-paper)] mb-2">No Sponsors Yet</h3>
          <p className="text-[var(--admin-muted)]">Sponsors will be revealed soon.</p>
        </div>
      ) : (
        <div className="space-y-16 text-center">
          {titleSponsors.length > 0 && (
            <div>
              <h2 className="text-sm font-bold font-mono tracking-widest text-[var(--admin-lime)] uppercase mb-8 pb-4 border-b border-[var(--admin-line)]">
                Title Sponsors
              </h2>
              <div className="flex flex-wrap justify-center gap-12">
                {titleSponsors.map((s) => (
                  <a
                    key={s.id}
                    href={s.link}
                    target="_blank"
                    rel="noreferrer"
                    className="block group"
                  >
                    <div className="bg-white rounded-lg p-6 w-64 h-32 flex items-center justify-center shadow-lg border border-transparent group-hover:border-[var(--admin-lime)] transition-colors">
                      <img src={s.logoUrl} alt={s.name} className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {partnerSponsors.length > 0 && (
            <div>
              <h2 className="text-sm font-bold font-mono tracking-widest text-[var(--admin-accent)] uppercase mb-8 pb-4 border-b border-[var(--admin-line)]">
                Partners
              </h2>
              <div className="flex flex-wrap justify-center gap-8">
                {partnerSponsors.map((s) => (
                  <a
                    key={s.id}
                    href={s.link}
                    target="_blank"
                    rel="noreferrer"
                    className="block group"
                  >
                    <div className="bg-white rounded p-4 w-48 h-24 flex items-center justify-center shadow border border-transparent group-hover:border-[var(--admin-accent)] transition-colors">
                      <img src={s.logoUrl} alt={s.name} className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all opacity-80 group-hover:opacity-100" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </PageShell>
  );
}
