import { useEffect, useState } from "react";
import { api } from "../../lib/api";

export default function AdminTeams() {
  const [teams, setTeams] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function load(searchTerm = "") {
    setLoading(true);
    try {
      const result = await api.getAdminTeams({ search: searchTerm });
      setTeams(result.teams);
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

  async function handleStatus(teamId: string, status: "APPROVED" | "REJECTED") {
    setBusyId(teamId);
    setError("");
    try {
      await api.setTeamStatus(teamId, status);
      await load(search);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setBusyId(null);
    }
  }

  async function handleShortlist(teamId: string, shortlisted: boolean) {
    setBusyId(teamId);
    setError("");
    try {
      await api.setTeamShortlist(teamId, shortlisted);
      await load(search);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-6">Manage Teams</h1>

      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          className="flex-1 border rounded px-3 py-2"
          placeholder="Search by team name or registration number"
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
          {teams.length === 0 && <p className="p-4 text-sm text-slate-500">No teams found.</p>}
          {teams.map((team) => (
            <div key={team.id} className="p-4">
              <div className="flex items-center justify-between mb-1">
                <p className="font-semibold">
                  {team.name} <span className="text-xs text-slate-500 font-mono">{team.code}</span>
                </p>
                <span className="text-xs bg-slate-100 rounded px-2 py-1">{team.registrationStatus}</span>
              </div>
              <p className="text-sm text-slate-600">
                {team.college} · {team.members?.length ?? 0} member(s)
                {team.shortlisted && <span className="ml-2 text-green-700">★ Shortlisted</span>}
              </p>
              <div className="flex gap-2 mt-2 text-sm">
                <button
                  disabled={busyId === team.id}
                  onClick={() => handleStatus(team.id, "APPROVED")}
                  className="text-green-700 underline disabled:opacity-50"
                >
                  Approve
                </button>
                <button
                  disabled={busyId === team.id}
                  onClick={() => handleStatus(team.id, "REJECTED")}
                  className="text-red-700 underline disabled:opacity-50"
                >
                  Reject
                </button>
                <button
                  disabled={busyId === team.id}
                  onClick={() => handleShortlist(team.id, !team.shortlisted)}
                  className="text-slate-700 underline disabled:opacity-50"
                >
                  {team.shortlisted ? "Remove shortlist" : "Shortlist"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}