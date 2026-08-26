import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { AdminShell } from "./components/AdminShell";
import { AdminPageHeader } from "./components/AdminPageHeader";
import { ConfirmDialog } from "./components/ConfirmDialog";
import { ErrorState, EmptyState } from "./components/FeedbackStates";

export default function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState({ title: "", body: "" });
  const [sending, setSending] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

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

  function handleTriggerSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title || !form.body) return;
    setIsConfirmOpen(true);
  }

  async function handleConfirmSend() {
    setError("");
    setSuccess("");
    setSending(true);
    try {
      await api.createAnnouncement(form.title, form.body);
      setForm({ title: "", body: "" });
      setSuccess("Announcement sent — in-app notification and email queued for every participant.");
      setIsConfirmOpen(false);
      await load();
    } catch (err: any) {
      setError(err.message);
      setIsConfirmOpen(false);
    } finally {
      setSending(false);
    }
  }

  return (
    <AdminShell>
      <AdminPageHeader
        title="Announcements"
        description="Broadcast messages to all participants via email and in-app notifications."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <h2 className="text-xl mb-6 font-display uppercase tracking-widest text-[var(--admin-paper)] border-b border-[var(--admin-line)] pb-2">New Announcement</h2>
          {error && <ErrorState error={error} />}
          {success && (
            <div className="admin-card !border-[var(--admin-accent)] !bg-[rgba(220,255,145,0.05)] mb-6">
              <p className="text-[var(--admin-accent)] font-bold text-sm tracking-wide">{success}</p>
            </div>
          )}

          <form onSubmit={handleTriggerSubmit} className="admin-card flex flex-col gap-4">
            <div>
              <label className="admin-label">Title</label>
              <input
                className="admin-input"
                placeholder="Important: Schedule Change"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div>
              <label className="admin-label">Message</label>
              <textarea
                className="admin-input min-h-[120px]"
                placeholder="Please note that the deadline for submissions has been extended..."
                required
                value={form.body}
                onChange={(e) => setForm({ ...form, body: e.target.value })}
              />
            </div>
            <button
              type="submit"
              disabled={sending || !form.title || !form.body}
              className="admin-danger-action mt-4"
            >
              Broadcast to Everyone
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-xl mb-6 font-display uppercase tracking-widest text-[var(--admin-paper)] border-b border-[var(--admin-line)] pb-2">History</h2>

          {announcements.length === 0 ? (
            <EmptyState title="No Announcements" message="You haven't sent any announcements yet." />
          ) : (
            <div className="flex flex-col gap-4">
              {announcements.map((a) => (
                <div key={a.id} className="admin-card !p-4 border-l-2 !border-l-[var(--admin-accent)]">
                  <p className="font-bold text-[var(--admin-paper)]">{a.title}</p>
                  <p className="text-sm text-[var(--admin-paper-dim)] mt-2 whitespace-pre-wrap">{a.body}</p>
                  <p className="admin-eyebrow text-[0.6rem] text-[var(--admin-muted)] mt-4">
                    {new Date(a.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        title="Broadcast Announcement?"
        message={
          <>
            You are about to send this announcement to <strong>EVERY registered participant</strong>.
            This action will immediately trigger emails and push notifications. It cannot be undone.
          </>
        }
        onConfirm={handleConfirmSend}
        onCancel={() => setIsConfirmOpen(false)}
        confirmLabel="Yes, Broadcast Now"
        isDestructive={true}
        isBusy={sending}
      />
    </AdminShell>
  );
}
