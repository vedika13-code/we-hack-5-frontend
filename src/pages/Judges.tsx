import { useEffect, useState } from "react";
import { api } from "../lib/api";

export default function Judges() {
  const [judges, setJudges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getJudges().then(setJudges).finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-2">Judges</h1>
      <p className="text-slate-600 mb-8">Meet the people evaluating your projects.</p>

      {loading ? (
        <p className="text-slate-500">Loading…</p>
      ) : judges.length === 0 ? (
        <p className="text-slate-500">Judges will be announced soon.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {judges.map((j) => (
            <div key={j.id} className="border rounded p-4">
              {j.photoUrl && <img src={j.photoUrl} alt={j.name} className="w-20 h-20 rounded-full object-cover mb-3" />}
              <p className="font-semibold">{j.name}</p>
              <p className="text-sm text-slate-600">{j.designation} · {j.company}</p>
              <p className="text-sm text-slate-500 mt-2">{j.expertise}</p>
              {j.linkedin && (
                <a href={j.linkedin} target="_blank" rel="noreferrer" className="text-sm underline mt-2 inline-block">
                  LinkedIn
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}