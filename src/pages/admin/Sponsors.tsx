import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { AdminShell } from "./components/AdminShell";
import { AdminPageHeader } from "./components/AdminPageHeader";
import { ErrorState, EmptyState } from "./components/FeedbackStates";
import { ConfirmDialog } from "./components/ConfirmDialog";

export default function AdminSponsors() {
  const [sponsors, setSponsors] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", logoUrl: "", tier: "partner", link: "" });
  const [loading, setLoading] = useState(false);

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isBusy, setIsBusy] = useState(false);

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
    setLoading(true);
    try {
      await api.createSponsor(form);
      setForm({ name: "", logoUrl: "", tier: "partner", link: "" });
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
      await api.deleteSponsor(deleteId);
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
        title="Sponsors"
        description="Manage event sponsors and partnership tiers."
      />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12">
        <div>
          <h2 className="text-xl mb-6 font-display uppercase tracking-widest text-[var(--admin-paper)] border-b border-[var(--admin-line)] pb-2">Add Sponsor</h2>

          {error && <ErrorState error={error} />}

          <form onSubmit={handleCreate} className="admin-card flex flex-col gap-4">
            <div>
              <label className="admin-label">Name</label>
              <input
                className="admin-input"
                placeholder="Acme Corp"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <label className="admin-label">Logo URL</label>
              <input
                className="admin-input"
                placeholder="https://..."
                required
                value={form.logoUrl}
                onChange={(e) => setForm({ ...form, logoUrl: e.target.value })}
              />
              {form.logoUrl && (
                <div className="mt-2 p-2 border border-[var(--admin-line)] bg-white rounded">
                  <img src={form.logoUrl} alt="Preview" className="h-12 object-contain" onError={(e) => (e.currentTarget.style.display = 'none')} />
                </div>
              )}
            </div>
            <div>
              <label className="admin-label">Website Link</label>
              <input
                className="admin-input"
                placeholder="https://acme.com"
                required
                value={form.link}
                onChange={(e) => setForm({ ...form, link: e.target.value })}
              />
            </div>
            <div>
              <label className="admin-label">Tier</label>
              <select
                className="admin-select"
                value={form.tier}
                onChange={(e) => setForm({ ...form, tier: e.target.value })}
              >
                <option value="title">Title Sponsor</option>
                <option value="gold">Gold</option>
                <option value="partner">Partner</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="admin-primary-action mt-4"
            >
              {loading ? "Adding..." : "Add Sponsor"}
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-xl mb-6 font-display uppercase tracking-widest text-[var(--admin-paper)] border-b border-[var(--admin-line)] pb-2">Current Sponsors</h2>

          {sponsors.length === 0 ? (
            <EmptyState title="No Sponsors" message="You haven't added any sponsors yet." />
          ) : (
            <div className="admin-table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Logo</th>
                    <th>Details</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sponsors.map((s) => (
                    <tr key={s.id}>
                      <td className="w-24">
                        <div className="bg-white p-2 rounded flex items-center justify-center">
                          <img src={s.logoUrl} alt={s.name} className="h-8 max-w-full object-contain" />
                        </div>
                      </td>
                      <td>
                        <div className="font-bold text-[var(--admin-paper)] text-base mb-1">{s.name}</div>
                        <div className="text-xs uppercase tracking-widest text-[var(--admin-accent)]">{s.tier}</div>
                      </td>
                      <td>
                        <button
                          onClick={() => setDeleteId(s.id)}
                          className="admin-danger-action !h-8 !px-3 !text-[0.65rem]"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <ConfirmDialog
        isOpen={!!deleteId}
        title="Remove Sponsor"
        message="Are you sure you want to remove this sponsor? They will no longer appear on the public event page."
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteId(null)}
        confirmLabel="Yes, Remove"
        isDestructive={true}
        isBusy={isBusy}
      />
    </AdminShell>
  );
}
