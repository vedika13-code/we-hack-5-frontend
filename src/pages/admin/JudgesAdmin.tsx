import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { AdminShell } from "./components/AdminShell";
import { AdminPageHeader } from "./components/AdminPageHeader";
import { ErrorState, EmptyState } from "./components/FeedbackStates";
import { ConfirmDialog } from "./components/ConfirmDialog";

export default function JudgesAdmin() {
  const [judges, setJudges] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", photoUrl: "", designation: "", company: "", linkedin: "", expertise: "", bio: "" });
  const [loading, setLoading] = useState(false);

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isBusy, setIsBusy] = useState(false);

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
    setLoading(true);
    try {
      await api.createJudge({ ...form, linkedin: form.linkedin || undefined });
      setForm({ name: "", photoUrl: "", designation: "", company: "", linkedin: "", expertise: "", bio: "" });
      await load();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleConfirmDelete() {
    if (!deleteId) return;
    setError("");
    setIsBusy(true);
    try {
      await api.deleteJudge(deleteId);
      await load();
      setDeleteId(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsBusy(false);
    }
  }

  return (
    <AdminShell>
      <AdminPageHeader
        title="Judges"
        description="Manage the jury panel and their profiles."
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12">
        <div>
          <h2 className="text-xl mb-6 font-display uppercase tracking-widest text-[var(--admin-paper)] border-b border-[var(--admin-line)] pb-2">Add Judge</h2>

          {error && <ErrorState error={error} />}

          <form onSubmit={handleCreate} className="admin-card flex flex-col gap-4">
            <div>
              <label className="admin-label">Name</label>
              <input className="admin-input" placeholder="Alex Chen" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <label className="admin-label">Photo URL</label>
              <input className="admin-input" placeholder="https://..." required value={form.photoUrl} onChange={(e) => setForm({ ...form, photoUrl: e.target.value })} />
            </div>
            <div>
              <label className="admin-label">Designation</label>
              <input className="admin-input" placeholder="Senior Engineer" required value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} />
            </div>
            <div>
              <label className="admin-label">Company</label>
              <input className="admin-input" placeholder="Tech Corp" required value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
            </div>
            <div>
              <label className="admin-label">LinkedIn URL (optional)</label>
              <input className="admin-input" placeholder="https://linkedin.com/..." value={form.linkedin} onChange={(e) => setForm({ ...form, linkedin: e.target.value })} />
            </div>
            <div>
              <label className="admin-label">Expertise</label>
              <input className="admin-input" placeholder="AI, Cloud Architecture" required value={form.expertise} onChange={(e) => setForm({ ...form, expertise: e.target.value })} />
            </div>
            <div>
              <label className="admin-label">Bio</label>
              <textarea className="admin-textarea min-h-[100px]" placeholder="Short biography..." required value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
            </div>
            <button type="submit" disabled={loading} className="admin-primary-action mt-4">
              {loading ? "Adding..." : "Add Judge"}
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-xl mb-6 font-display uppercase tracking-widest text-[var(--admin-paper)] border-b border-[var(--admin-line)] pb-2">Panel Members</h2>

          {judges.length === 0 ? (
            <EmptyState title="No Judges" message="You haven't added any judges yet." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {judges.map((j) => (
                <div key={j.id} className="admin-card !p-4 flex gap-4">
                  <img src={j.photoUrl} alt={j.name} className="w-16 h-16 object-cover rounded-full border border-[var(--admin-accent)] shrink-0" onError={(e) => (e.currentTarget.style.display = 'none')} />
                  <div>
                    <h3 className="font-bold text-[var(--admin-paper)]">{j.name}</h3>
                    <p className="text-xs text-[var(--admin-accent)] uppercase tracking-wide my-1">{j.designation}</p>
                    <p className="text-xs text-[var(--admin-paper-dim)]">{j.company}</p>
                    <button onClick={() => setDeleteId(j.id)} className="admin-danger-action !h-6 !px-2 !text-[0.6rem] mt-3">Remove</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <ConfirmDialog
        isOpen={!!deleteId}
        title="Remove Judge"
        message="Are you sure you want to remove this judge? They will no longer appear on the public panel."
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteId(null)}
        confirmLabel="Yes, Remove"
        isDestructive={true}
        isBusy={isBusy}
      />
    </AdminShell>
  );
}
