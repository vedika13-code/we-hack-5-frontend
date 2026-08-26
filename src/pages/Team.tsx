import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api";

export default function Team() {
  const [user, setUser] = useState<any>(null);
  const [team, setTeam] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function load(isBackgroundRefresh = false) {
    if (!isBackgroundRefresh) setLoading(true);
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
      if (!isBackgroundRefresh) setLoading(false);
    }
  }

  useEffect(() => {
    load();
    const interval = setInterval(() => load(true), 15_000);
    return () => clearInterval(interval);
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

  if (loading) return <div className="p-8 text-center text-slate-500">Loading…</div>;

  if (!team) {
    return (
      <div className="max-w-lg mx-auto px-6 py-12 text-center">
        <p className="text-slate-600 mb-4">You're not on a team yet.</p>
        <button className="bg-slate-900 text-white rounded px-4 py-2" onClick={() => navigate("/registration")}>
          Register a team
        </button>
      </div>
    );
  }

  const isLeader = user?.role === "TEAM_LEADER";

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{team.name}</h1>
        <span className="text-sm bg-slate-100 rounded px-3 py-1 font-mono tracking-widest">{team.code}</span>
      </div>

      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

      <div className="space-y-1 text-slate-700 mb-6">
        <p>College: {team.college}</p>
        {team.track && <p>Track: {team.track}</p>}
        {team.ideaTitle && <p>Idea: {team.ideaTitle}</p>}
        <p>
          Status: {team.registrationStatus} · Registration{" "}
          {team.registrationComplete ? "complete ✅" : "not yet finalized"}
        </p>
      </div>

      <h2 className="font-semibold mb-2">Members</h2>
      <ul className="divide-y border rounded mb-6">
        {team.members?.map((m: any) => (
          <li key={m.id} className="flex items-center justify-between px-4 py-2">
            <span>
              {m.fullName} {m.role === "TEAM_LEADER" && <span className="text-xs text-slate-500">(Leader)</span>}
            </span>
            {isLeader && m.role !== "TEAM_LEADER" && (
              <button className="text-red-600 text-sm" onClick={() => handleRemove(m.id)}>
                Remove
              </button>
            )}
          </li>
        ))}
      </ul>

      {isLeader && !team.registrationComplete && (
        <button className="bg-slate-900 text-white rounded px-4 py-2" onClick={handleFinalize}>
          Finalize registration
        </button>
      )}
    </div>
  );
}