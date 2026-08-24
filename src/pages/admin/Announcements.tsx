import { useEffect, useState } from "react";
import { api } from "../../lib/api";

export default function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState({ title: "", body: "" });
  const [sending, setSending] = useState(false);

  async function load() {
    try {
      setAnnouncements(await api.getAnnouncements());
    } catch (err: any) {
      setError(err.message);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSending(true);
    try {
      await api.createAnnouncement(form.title, form.body);
      setForm({ title: "", body: "" });
      setSuccess("Announcement sent — in-app notification and email queued for every participant.");
      await load();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-6">Announcements</h1>

      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
      {success && <p className="text-green-700 text-sm mb-4">{success}</p>}

      <form onSubmit={handleSubmit} className="border rounded p-4 mb-6 space-y-3">
        <h2 className="font-semibold">New announcement</h2>
        <input
          className="w-full border rounded px-3 py-2"
          placeholder="Title"
          required
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          className="w-full border rounded px-3 py-2"
          placeholder="Message"
          rows={4}
          required
          value={form.body}
          onChange={(e) => setForm({ ...form, body: e.target.value })}
        />
        <button disabled={sending} className="bg-slate-900 text-white rounded px-4 py-2 disabled:opacity-50">
          {sending ? "Sending…" : "Send to everyone"}
        </button>
      </form>

      <div className="border rounded divide-y">
        {announcements.length === 0 && <p className="p-4 text-sm text-slate-500">No announcements yet.</p>}
        {announcements.map((a) => (
          <div key={a.id} className="p-4">
            <p className="font-medium">{a.title}</p>
            <p className="text-sm text-slate-600 mt-1">{a.body}</p>
            <p className="text-xs text-slate-400 mt-2">{new Date(a.createdAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}