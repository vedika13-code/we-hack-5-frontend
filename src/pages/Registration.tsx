import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api";

export default function Registration() {
  const [mode, setMode] = useState<"create" | "join">("create");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [createForm, setCreateForm] = useState({
    name: "", college: "", track: "", ideaTitle: "", ideaDescription: "", hardwareNeeded: false,
  });
  const [joinCode, setJoinCode] = useState("");

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      const team = await api.createTeam(createForm);
      navigate("/team", { state: { teamId: team.id } });
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function handleJoin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      await api.joinTeam(joinCode);
      navigate("/team");
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div className="max-w-lg mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-2">Team Registration</h1>
      <p className="text-slate-600 mb-6">Create a new team or join one with a code from your teammate.</p>

      <div className="flex gap-2 mb-6">
        <button
          className={`px-4 py-2 rounded ${mode === "create" ? "bg-slate-900 text-white" : "bg-slate-100"}`}
          onClick={() => setMode("create")}
        >
          Create a team
        </button>
        <button
          className={`px-4 py-2 rounded ${mode === "join" ? "bg-slate-900 text-white" : "bg-slate-100"}`}
          onClick={() => setMode("join")}
        >
          Join with code
        </button>
      </div>

      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

      {mode === "create" ? (
        <form onSubmit={handleCreate} className="space-y-4">
          <input className="w-full border rounded px-3 py-2" placeholder="Team name" required
            value={createForm.name} onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })} />
          <input className="w-full border rounded px-3 py-2" placeholder="College" required
            value={createForm.college} onChange={(e) => setCreateForm({ ...createForm, college: e.target.value })} />
          <input className="w-full border rounded px-3 py-2" placeholder="Track (e.g. AI, Web3, Fintech)"
            value={createForm.track} onChange={(e) => setCreateForm({ ...createForm, track: e.target.value })} />
          <input className="w-full border rounded px-3 py-2" placeholder="Idea title"
            value={createForm.ideaTitle} onChange={(e) => setCreateForm({ ...createForm, ideaTitle: e.target.value })} />
          <textarea className="w-full border rounded px-3 py-2" placeholder="Idea description" rows={4}
            value={createForm.ideaDescription} onChange={(e) => setCreateForm({ ...createForm, ideaDescription: e.target.value })} />
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input type="checkbox" checked={createForm.hardwareNeeded}
              onChange={(e) => setCreateForm({ ...createForm, hardwareNeeded: e.target.checked })} />
            We need hardware for this project
          </label>
          <button className="w-full bg-slate-900 text-white rounded px-3 py-2">Create team</button>
        </form>
      ) : (
        <form onSubmit={handleJoin} className="space-y-4">
          <input className="w-full border rounded px-3 py-2 uppercase tracking-widest" placeholder="Team code" required
            value={joinCode} onChange={(e) => setJoinCode(e.target.value)} />
          <button className="w-full bg-slate-900 text-white rounded px-3 py-2">Join team</button>
        </form>
      )}
    </div>
  );
}
