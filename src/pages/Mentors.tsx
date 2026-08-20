import { useEffect, useState } from "react";
import { api } from "../lib/api";

export default function Mentors() {
  const [mentors, setMentors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getMentors().then(setMentors).finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-2">Mentors</h1>
      <p className="text-slate-600 mb-8">
        Mentors will be available in person during the event to help your team. No booking needed — just find them on the floor.
      </p>

      {loading ? (
        <p className="text-slate-500">Loading…</p>
      ) : mentors.length === 0 ? (
        <p className="text-slate-500">Mentors will be announced soon.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {mentors.map((m) => (
            <div key={m.id} className="border rounded p-4">
              {m.photoUrl && <img src={m.photoUrl} alt={m.name} className="w-20 h-20 rounded-full object-cover mb-3" />}
              <p className="font-semibold">{m.name}</p>
              <p className="text-sm text-slate-600">{m.expertise}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}