import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { AdminShell } from "./components/AdminShell";
import { AdminPageHeader } from "./components/AdminPageHeader";
import { ErrorState } from "./components/FeedbackStates";
import { ConfirmDialog } from "./components/ConfirmDialog";
import { StatusBadge } from "./components/StatusBadge";

export default function ManageAdmins() {
  const [admins, setAdmins] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [currentUserId, setCurrentUserId] = useState("");

  const [confirmPromote, setConfirmPromote] = useState(false);
  const [demoteId, setDemoteId] = useState<string | null>(null);
  const [isBusy, setIsBusy] = useState(false);

  async function load() {
    try {
      const [adminList, me] = await Promise.all([api.getAdmins(), api.me()]);
      setAdmins(adminList);
      setCurrentUserId(me.id);
    } catch (err: any) {
      setError(err.message);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function handleTriggerPromote(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setConfirmPromote(true);
  }

  async function handleConfirmPromote() {
    setError("");
    setIsBusy(true);
    try {
      await api.promoteToAdmin(email);
      setEmail("");
      setConfirmPromote(false);
      await load();
    } catch (err: any) {
      setError(err.message);
      setConfirmPromote(false);
    } finally {
      setIsBusy(false);
    }
  }

  async function handleConfirmDemote() {
    if (!demoteId) return;
    setError("");
    setIsBusy(true);
    try {
      await api.demoteAdmin(demoteId);
      setDemoteId(null);
      await load();
    } catch (err: any) {
      setError(err.message);
      setDemoteId(null);
    } finally {
      setIsBusy(false);
    }
  }

  return (
    <AdminShell>
      <AdminPageHeader
        title="System Access"
        description="SUPER_ADMIN ONLY. Manage privileged event staff."
      />

      <div className="border border-[var(--admin-pink)] bg-[rgba(238,154,182,0.05)] p-4 md:p-6 mb-8 text-[var(--admin-paper)] text-sm leading-relaxed max-w-3xl">
        <strong className="text-[var(--admin-pink)] block mb-2 uppercase tracking-widest font-bold font-display">Warning: Sensitive Area</strong>
        This interface controls system-level access. Promoting a user grants them complete visibility into participant data, teams, submissions, and event operations. Ensure the email belongs to authorized staff.
      </div>

      {error && <ErrorState error={error} />}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl">
        <div>
          <h2 className="text-xl mb-6 font-display uppercase tracking-widest text-[var(--admin-paper)] border-b border-[var(--admin-line)] pb-2">Grant Privileges</h2>

          <form onSubmit={handleTriggerPromote} className="flex flex-col gap-4">
            <div>
              <label className="admin-label">User Email</label>
              <input
                className="admin-input font-mono"
                placeholder="staff@college.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" disabled={!email || isBusy} className="admin-danger-action mt-2 w-max">
              Promote to Admin
            </button>
          </form>
        </div>

        <div>
          <h2 className="text-xl mb-6 font-display uppercase tracking-widest text-[var(--admin-paper)] border-b border-[var(--admin-line)] pb-2">Active Administrators</h2>

          <div className="flex flex-col gap-4">
            {admins.map((a) => (
              <div key={a.id} className="admin-card !p-4 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <p className="font-bold text-[var(--admin-paper)]">{a.fullName || "Unnamed User"}</p>
                    <StatusBadge
                      status={a.role}
                      variant={a.role === "SUPER_ADMIN" ? "warning" : "default"}
                    />
                  </div>
                  <p className="text-sm font-mono text-[var(--admin-muted)]">{a.email}</p>
                </div>

                {a.role === "ADMIN" && a.id !== currentUserId && (
                  <button onClick={() => setDemoteId(a.id)} className="text-[var(--admin-pink)] hover:text-[var(--admin-paper)] text-xs uppercase tracking-widest font-bold underline underline-offset-4">
                    Revoke
                  </button>
                )}
                {a.id === currentUserId && (
                  <span className="text-[var(--admin-muted)] text-xs uppercase tracking-widest">You</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <ConfirmDialog
        isOpen={confirmPromote}
        title="Promote User?"
        message={
          <>
            You are granting <strong>{email}</strong> access to the event administration panel. They will be able to view and manage sensitive event data.
          </>
        }
        onConfirm={handleConfirmPromote}
        onCancel={() => setConfirmPromote(false)}
        confirmLabel="Yes, Grant Access"
        isDestructive={true}
        isBusy={isBusy}
      />

      <ConfirmDialog
        isOpen={!!demoteId}
        title="Revoke Admin Access?"
        message="This user will immediately lose access to the administration panel and will be reverted to standard participant privileges."
        onConfirm={handleConfirmDemote}
        onCancel={() => setDemoteId(null)}
        confirmLabel="Yes, Revoke"
        isDestructive={true}
        isBusy={isBusy}
      />
    </AdminShell>
  );
}
