import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { AdminShell } from "./components/AdminShell";
import { AdminPageHeader } from "./components/AdminPageHeader";
import { ErrorState, EmptyState } from "./components/FeedbackStates";
import { ConfirmDialog } from "./components/ConfirmDialog";

export default function MentorsAdmin() {
  const [mentors, setMentors] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", photoUrl: "", expertise: "" });
  const [loading, setLoading] = useState(false);

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isBusy, setIsBusy] = useState(false);

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
    setLoading(true);
    try {
      await api.createMentor(form);
      setForm({ name: "", photoUrl: "", expertise: "" });
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
      await api.deleteMentor(deleteId);
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
        title="Mentors"
        description="Manage the event's technical and design mentors."
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12">
        <div>
          <h2 className="text-xl mb-6 font-display uppercase tracking-widest text-[var(--admin-paper)] border-b border-[var(--admin-line)] pb-2">Add Mentor</h2>

          {error && <ErrorState error={error} />}

          <form onSubmit={handleCreate} className="admin-card flex flex-col gap-4">
            <div>
              <label className="admin-label">Name</label>
              <input className="admin-input" placeholder="Jamie Smith" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <label className="admin-label">Photo URL</label>
              <input className="admin-input" placeholder="https://..." required value={form.photoUrl} onChange={(e) => setForm({ ...form, photoUrl: e.target.value })} />
            </div>
            <div>
              <label className="admin-label">Area of Expertise</label>
              <input className="admin-input" placeholder="Frontend, React, UI/UX" required value={form.expertise} onChange={(e) => setForm({ ...form, expertise: e.target.value })} />
            </div>
            <button type="submit" disabled={loading} className="admin-primary-action mt-4">
              {loading ? "Adding..." : "Add Mentor"}
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-xl mb-6 font-display uppercase tracking-widest text-[var(--admin-paper)] border-b border-[var(--admin-line)] pb-2">Registered Mentors</h2>

          {mentors.length === 0 ? (
            <EmptyState title="No Mentors" message="You haven't added any mentors yet." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mentors.map((m) => (
                <div key={m.id} className="admin-card !p-4 flex gap-4 items-center">
                  <img src={m.photoUrl} alt={m.name} className="w-12 h-12 object-cover rounded-full border border-[var(--admin-line)] shrink-0" onError={(e) => (e.currentTarget.style.display = 'none')} />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-[var(--admin-paper)] truncate">{m.name}</h3>
                    <p className="text-xs text-[var(--admin-muted)] truncate my-1">{m.expertise}</p>
                    <button onClick={() => setDeleteId(m.id)} className="admin-danger-action !h-6 !px-2 !text-[0.6rem] mt-1">Remove</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <ConfirmDialog
        isOpen={!!deleteId}
        title="Remove Mentor"
        message="Are you sure you want to remove this mentor?"
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteId(null)}
        confirmLabel="Yes, Remove"
        isDestructive={true}
        isBusy={isBusy}
      />
    </AdminShell>
  );
}
