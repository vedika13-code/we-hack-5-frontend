import { useEffect, useState } from "react";
import { api } from "../../lib/api";

export default function JudgesAdmin() {
  const [judges, setJudges] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", photoUrl: "", designation: "", company: "", linkedin: "", expertise: "", bio: "" });

  async function load() {
    try {
      setJudges(await api.getJudges());
    } catch (err: any) {
      setError(err.message);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      await api.createJudge({ ...form, linkedin: form.linkedin || undefined });
      setForm({ name: "", photoUrl: "", designation: "", company: "", linkedin: "", expertise: "", bio: "" });
      await load();
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function handleDelete(id: string) {
    setError("");
    try {
      await api.deleteJudge(id);
      await load();
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-6">Manage Judges</h1>

      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

      <form onSubmit={handleCreate} className="border rounded p-4 mb-6 space-y-3">
        <h2 className="font-semibold">Add a judge</h2>
        <input className="w-full border rounded px-3 py-2" placeholder="Name" required
          value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="w-full border rounded px-3 py-2" placeholder="Photo URL" required
          value={form.photoUrl} onChange={(e) => setForm({ ...form, photoUrl: e.target.value })} />
        <input className="w-full border rounded px-3 py-2" placeholder="Designation" required
          value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} />
        <input className="w-full border rounded px-3 py-2" placeholder="Company" required
          value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
        <input className="w-full border rounded px-3 py-2" placeholder="LinkedIn URL (optional)"
          value={form.linkedin} onChange={(e) => setForm({ ...form, linkedin: e.target.value })} />
        <input className="w-full border rounded px-3 py-2" placeholder="Expertise" required
          value={form.expertise} onChange={(e) => setForm({ ...form, expertise: e.target.value })} />
        <textarea className="w-full border rounded px-3 py-2" placeholder="Bio" required rows={3}
          value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
        <button className="bg-slate-900 text-white rounded px-4 py-2">Add judge</button>
      </form>

      <div className="border rounded divide-y">
        {judges.length === 0 && <p className="p-4 text-sm text-slate-500">No judges yet.</p>}
        {judges.map((j) => (
          <div key={j.id} className="flex items-center justify-between p-4">
            <div>
              <p className="font-medium">{j.name}</p>
              <p className="text-xs text-slate-500">{j.designation} · {j.company}</p>
            </div>
            <button onClick={() => handleDelete(j.id)} className="text-red-600 text-sm underline">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}