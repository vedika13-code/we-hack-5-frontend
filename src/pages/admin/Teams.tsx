import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { AdminShell } from "./components/AdminShell";
import { AdminPageHeader } from "./components/AdminPageHeader";
import { LoadingState, ErrorState, EmptyState } from "./components/FeedbackStates";
import { StatusBadge } from "./components/StatusBadge";
import { ConfirmDialog } from "./components/ConfirmDialog";

export default function AdminTeams() {
  const [teams, setTeams] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [emailTeamId, setEmailTeamId] = useState<string | null>(null);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailMessage, setEmailMessage] = useState("");

  async function load(searchTerm = "") {
    setLoading(true);
    setError("");
    try {
      const result = await api.getAdminTeams({ search: searchTerm });
      setTeams(result.teams || []);
    } catch (err: any) {
      setError(err.message || "Failed to load teams");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    load(search);
  }

  async function handleStatus(teamId: string, status: "APPROVED" | "REJECTED") {
    setBusyId(teamId);
    setError("");
    try {
      await api.setTeamStatus(teamId, status);
      await load(search);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setBusyId(null);
    }
  }

  async function handleShortlist(teamId: string, shortlisted: boolean) {
    setBusyId(teamId);
    setError("");
    try {
      await api.setTeamShortlist(teamId, shortlisted);
      await load(search);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setBusyId(null);
    }
  }

  async function handleConfirmDelete() {
    if (!deleteId) return;
    setBusyId(deleteId);
    setError("");
    try {
      await api.deleteAdminTeam(deleteId);
      setDeleteId(null);
      await load(search);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setBusyId(null);
    }
  }

  async function handleSendEmail(e: React.FormEvent) {
    e.preventDefault();
    if (!emailTeamId) return;
    setBusyId(emailTeamId);
    setError("");
    try {
      await api.emailTeam(emailTeamId, emailSubject, emailMessage);
      setEmailTeamId(null);
      setEmailSubject("");
      setEmailMessage("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setBusyId(null);
    }
  }

  return (
    <AdminShell>
      <AdminPageHeader
        title="Teams"
        description="Review registrations and manage hackathon teams."
      />

      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 mb-8">
        <input
          className="admin-input flex-1"
          placeholder="Search by team name or code..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className="admin-primary-action shrink-0">
          Search
        </button>
      </form>

      {error && <ErrorState error={error} />}
      {!error && loading && <LoadingState />}

      {!error && !loading && teams.length === 0 && (
        <EmptyState
          title="No Teams Found"
          message="No teams match your search criteria or none have registered yet."
        />
      )}

      {!error && !loading && teams.length > 0 && (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Team</th>
                <th>College</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team.id}>
                  <td>
                    <div className="font-bold text-[var(--admin-paper)] text-base mb-1">
                      {team.name}
                    </div>
                    <div className="font-mono text-xs text-[var(--admin-accent)]">
                      {team.code}
                    </div>
                    <div className="mt-2 flex gap-2">
                      {team.shortlisted && (
                        <StatusBadge status="★ Shortlisted" variant="warning" />
                      )}
                      <span className="text-[var(--admin-muted)] text-xs">
                        {team.members?.length ?? 0} members
                      </span>
                    </div>
                  </td>
                  <td>{team.college}</td>
                  <td>
                    <StatusBadge
                      status={team.registrationStatus}
                      variant={team.registrationStatus === "APPROVED" ? "success" : team.registrationStatus === "REJECTED" ? "danger" : "default"}
                    />
                  </td>
                  <td>
                    <div className="flex flex-wrap gap-2">
                      <button
                        disabled={busyId === team.id}
                        onClick={() => handleStatus(team.id, "APPROVED")}
                        className="admin-secondary-action !border-[var(--admin-accent)] !text-[var(--admin-accent)] !h-8 !px-3 !text-[0.65rem]"
                      >
                        Approve
                      </button>
                      <button
                        disabled={busyId === team.id}
                        onClick={() => handleStatus(team.id, "REJECTED")}
                        className="admin-secondary-action !border-[var(--admin-pink)] !text-[var(--admin-pink)] !h-8 !px-3 !text-[0.65rem]"
                      >
                        Reject
                      </button>
                      <button
                        disabled={busyId === team.id}
                        onClick={() => handleShortlist(team.id, !team.shortlisted)}
                        className="admin-secondary-action !border-[var(--admin-gold)] !text-[var(--admin-gold)] !h-8 !px-3 !text-[0.65rem]"
                      >
                        {team.shortlisted ? "Unshortlist" : "Shortlist"}
                      </button>
                      <button
                        disabled={busyId === team.id}
                        onClick={() => setEmailTeamId(team.id)}
                        className="admin-secondary-action !border-[var(--admin-paper)] !text-[var(--admin-paper)] !h-8 !px-3 !text-[0.65rem]"
                      >
                        Email
                      </button>
                      <button
                        disabled={busyId === team.id}
                        onClick={() => setDeleteId(team.id)}
                        className="admin-danger-action !h-8 !px-3 !text-[0.65rem]"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmDialog
        isOpen={!!deleteId}
        title="Delete Team?"
        message="Are you sure you want to permanently delete this team and all of its data? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeleteId(null)}
        confirmLabel="Yes, Delete Team"
        isDestructive={true}
        isBusy={!!busyId}
      />

      {emailTeamId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(10,11,10,0.9)] backdrop-blur-sm">
          <form onSubmit={handleSendEmail} className="admin-card max-w-md w-full relative shadow-2xl border-[var(--admin-accent)] border">
            <h2 className="text-2xl mb-4 text-[var(--admin-paper)]">Email Team</h2>
            <div className="flex flex-col gap-4 mb-6">
              <div>
                <label className="admin-label">Subject</label>
                <input
                  required
                  className="admin-input"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                />
              </div>
              <div>
                <label className="admin-label">Message</label>
                <textarea
                  required
                  rows={4}
                  className="admin-input"
                  value={emailMessage}
                  onChange={(e) => setEmailMessage(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-4 justify-end">
              <button
                type="button"
                onClick={() => setEmailTeamId(null)}
                disabled={!!busyId}
                className="admin-secondary-action"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!!busyId || !emailSubject || !emailMessage}
                className="admin-primary-action !h-10"
              >
                {busyId === emailTeamId ? "Sending..." : "Send Email"}
              </button>
            </div>
          </form>
        </div>
      )}
    </AdminShell>
  );
}
