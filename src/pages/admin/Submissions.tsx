import { useEffect, useState } from "react";
import { api } from "../../lib/api";

export default function AdminSubmissions() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  async function load(searchTerm = "") {
    setLoading(true);
    try {
      const result = await api.getAdminSubmissions({ search: searchTerm });
      setSubmissions(result.submissions);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    load(search);
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-6">Submissions</h1>

      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          className="flex-1 border rounded px-3 py-2"
          placeholder="Search by team name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="bg-slate-900 text-white rounded px-4 py-2">Search</button>
      </form>

      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

      {loading ? (
        <p className="text-slate-500">Loading…</p>
      ) : (
        <div className="border rounded divide-y">
          {submissions.length === 0 && <p className="p-4 text-sm text-slate-500">No submissions yet.</p>}
          {submissions.map((s) => (
            <div key={s.id} className="p-4">
              <div className="flex items-center justify-between mb-1">
                <p className="font-semibold">{s.team?.name}</p>
                <span className="text-xs bg-slate-100 rounded px-2 py-1">{s.status}</span>
              </div>
              <p className="text-sm text-slate-500 mb-2">
                {s.team?.track && `${s.team.track} · `}Version {s.version}
              </p>
              <div className="flex gap-4 text-sm">
                {s.projectLink && (
                  <a href={s.projectLink} target="_blank" rel="noreferrer" className="underline">
                    Project link
                  </a>
                )}
                {s.downloadUrl && (
                  <a href={s.downloadUrl} target="_blank" rel="noreferrer" className="underline">
                    Download file ({s.fileType})
                  </a>
                )}
                {!s.projectLink && !s.fileUrl && <span className="text-slate-400">Nothing submitted yet</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}