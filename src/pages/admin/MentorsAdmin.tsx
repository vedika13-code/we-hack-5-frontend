import { useEffect, useState } from "react";
import { api } from "../../lib/api";

export default function MentorsAdmin() {
  const [mentors, setMentors] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", photoUrl: "", expertise: "" });

  async function load() {
    try {
      setMentors(await api.getMentors());
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
      await api.createMentor(form);
      setForm({ name: "", photoUrl: "", expertise: "" });
      await load();
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function handleDelete(id: string) {
    setError("");
    try {
      await api.deleteMentor(id);
      await load();
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-6">Manage Mentors</h1>

      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

      <form onSubmit={handleCreate} className="border rounded p-4 mb-6 space-y-3">
        <h2 className="font-semibold">Add a mentor</h2>
        <input className="w-full border rounded px-3 py-2" placeholder="Name" required
          value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="w-full border rounded px-3 py-2" placeholder="Photo URL" required
          value={form.photoUrl} onChange={(e) => setForm({ ...form, photoUrl: e.target.value })} />
        <input className="w-full border rounded px-3 py-2" placeholder="Area of expertise" required
          value={form.expertise} onChange={(e) => setForm({ ...form, expertise: e.target.value })} />
        <button className="bg-slate-900 text-white rounded px-4 py-2">Add mentor</button>
      </form>

      <div className="border rounded divide-y">
        {mentors.length === 0 && <p className="p-4 text-sm text-slate-500">No mentors yet.</p>}
        {mentors.map((m) => (
          <div key={m.id} className="flex items-center justify-between p-4">
            <div>
              <p className="font-medium">{m.name}</p>
              <p className="text-xs text-slate-500">{m.expertise}</p>
            </div>
            <button onClick={() => handleDelete(m.id)} className="text-red-600 text-sm underline">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}