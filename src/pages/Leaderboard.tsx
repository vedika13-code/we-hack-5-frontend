import { useEffect, useState } from "react";
import { api } from "../lib/api";

export default function Leaderboard() {
  const [teams, setTeams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getLeaderboard().then(setTeams).finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-2">Results</h1>
      <p className="text-slate-600 mb-8">Shortlisted teams, announced here as they're finalized by the judges.</p>

      {loading ? (
        <p className="text-slate-500">Loading…</p>
      ) : teams.length === 0 ? (
        <p className="text-slate-500">Results haven't been announced yet — check back soon.</p>
      ) : (
        <div className="border rounded divide-y">
          {teams.map((t, i) => (
            <div key={t.id} className="flex items-center justify-between p-4">
              <div>
                <p className="font-semibold">
                  {i + 1}. {t.name}
                </p>
                <p className="text-sm text-slate-500">{t.college}</p>
              </div>
              {t.track && <span className="text-xs bg-slate-100 rounded px-2 py-1">{t.track}</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}