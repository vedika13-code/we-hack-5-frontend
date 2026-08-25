import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { AdminShell } from "./components/AdminShell";
import { AdminPageHeader } from "./components/AdminPageHeader";
import { LoadingState, ErrorState, EmptyState } from "./components/FeedbackStates";
import { StatusBadge } from "./components/StatusBadge";

export default function AdminShortlist() {
  const [shortlistedTeams, setShortlistedTeams] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError("");
    try {
      const result = await api.getAdminTeams({});
      const filtered = (result.teams || []).filter((t: any) => t.shortlisted);
      setShortlistedTeams(filtered);
    } catch (err: any) {
      setError(err.message || "Failed to load shortlisted teams");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleRemoveShortlist(teamId: string) {
    setBusyId(teamId);
    setError("");
    try {
      await api.setTeamShortlist(teamId, false);
      await load();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setBusyId(null);
    }
  }

  return (
    <AdminShell>
      <AdminPageHeader
        title="Shortlist"
        description="Manage the final list of shortlisted teams for the event."
      />

      {error && <ErrorState error={error} />}
      {!error && loading && <LoadingState />}

      {!error && !loading && shortlistedTeams.length === 0 && (
        <EmptyState
          title="No Shortlisted Teams"
          message="You haven't shortlisted any teams yet. Go to the Teams tab to shortlist teams."
        />
      )}

      {!error && !loading && shortlistedTeams.length > 0 && (
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
              {shortlistedTeams.map((team) => (
                <tr key={team.id}>
                  <td>
                    <div className="font-bold text-[var(--admin-paper)] text-base mb-1">
                      {team.name}
                    </div>
                    <div className="font-mono text-xs text-[var(--admin-accent)]">
                      {team.code}
                    </div>
                  </td>
                  <td>{team.college}</td>
                  <td>
                    <StatusBadge status="Shortlisted" variant="warning" />
                  </td>
                  <td>
                    <button
                      disabled={busyId === team.id}
                      onClick={() => handleRemoveShortlist(team.id)}
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
    </AdminShell>
  );
}
