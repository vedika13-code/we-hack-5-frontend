import { useEffect, useState } from "react";
import { api } from "../../lib/api";

export default function AdminSponsors() {
  const [sponsors, setSponsors] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", logoUrl: "", tier: "partner", link: "" });

  async function load() {
    try {
      setSponsors(await api.getAdminSponsors());
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
      await api.createSponsor(form);
      setForm({ name: "", logoUrl: "", tier: "partner", link: "" });
      await load();
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function handleDelete(id: string) {
    setError("");
    try {
      await api.deleteSponsor(id);
      await load();
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-6">Manage Sponsors</h1>

      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

      <form onSubmit={handleCreate} className="border rounded p-4 mb-6 space-y-3">
        <h2 className="font-semibold">Add a sponsor</h2>
        <input className="w-full border rounded px-3 py-2" placeholder="Name" required
          value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="w-full border rounded px-3 py-2" placeholder="Logo URL" required
          value={form.logoUrl} onChange={(e) => setForm({ ...form, logoUrl: e.target.value })} />
        <input className="w-full border rounded px-3 py-2" placeholder="Website link" required
          value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} />
        <select className="w-full border rounded px-3 py-2"
          value={form.tier} onChange={(e) => setForm({ ...form, tier: e.target.value })}>
          <option value="title">Title Sponsor</option>
          <option value="gold">Gold</option>
          <option value="partner">Partner</option>
        </select>
        <button className="bg-slate-900 text-white rounded px-4 py-2">Add sponsor</button>
      </form>

      <div className="border rounded divide-y">
        {sponsors.length === 0 && <p className="p-4 text-sm text-slate-500">No sponsors yet.</p>}
        {sponsors.map((s) => (
          <div key={s.id} className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <img src={s.logoUrl} alt={s.name} className="h-8 object-contain" />
              <div>
                <p className="font-medium">{s.name}</p>
                <p className="text-xs text-slate-500">{s.tier}</p>
              </div>
            </div>
            <button onClick={() => handleDelete(s.id)} className="text-red-600 text-sm underline">
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}