import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { AdminShell } from "./components/AdminShell";
import { AdminPageHeader } from "./components/AdminPageHeader";
import { LoadingState, ErrorState, EmptyState } from "./components/FeedbackStates";
import { StatusBadge } from "./components/StatusBadge";

export default function AdminSubmissions() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  async function load(searchTerm = "") {
    setLoading(true);
    setError("");
    try {
      const result = await api.getAdminSubmissions({ search: searchTerm });
      setSubmissions(result.submissions || []);
    } catch (err: any) {
      setError(err.message || "Failed to load submissions");
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

  return (
    <AdminShell>
      <AdminPageHeader
        title="Submissions"
        description="Review project files and links submitted by teams."
      />

      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 mb-8">
        <input
          className="admin-input flex-1"
          placeholder="Search by team name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className="admin-primary-action shrink-0">
          Search
        </button>
      </form>

      {error && <ErrorState error={error} />}
      {!error && loading && <LoadingState />}

      {!error && !loading && submissions.length === 0 && (
        <EmptyState
          title="No Submissions"
          message="No submissions match your search criteria or none have been submitted yet."
        />
      )}

      {!error && !loading && submissions.length > 0 && (
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Team</th>
                <th>Track / Version</th>
                <th>Status</th>
                <th>Assets</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((s) => (
                <tr key={s.id}>
                  <td>
                    <div className="font-bold text-[var(--admin-paper)] text-base">
                      {s.team?.name || "Unknown Team"}
                    </div>
                  </td>
                  <td>
                    {s.team?.track && (
                      <div className="text-[var(--admin-paper)] font-bold mb-1">
                        {s.team.track}
                      </div>
                    )}
                    <div className="text-xs font-mono text-[var(--admin-muted)]">
                      Version {s.version ?? 1}
                    </div>
                  </td>
                  <td>
                    <StatusBadge
                      status={s.status || "UNKNOWN"}
                      variant={s.status === "FINAL" ? "success" : "default"}
                    />
                  </td>
                  <td>
                    <div className="flex flex-wrap gap-3 text-xs uppercase tracking-wider font-bold">
                      {s.projectLink && (
                        <a
                          href={s.projectLink}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[var(--admin-accent)] hover:text-[var(--admin-paper)] underline underline-offset-4"
                        >
                          View Link
                        </a>
                      )}
                      {s.downloadUrl && (
                        <a
                          href={s.downloadUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[var(--admin-accent)] hover:text-[var(--admin-paper)] underline underline-offset-4"
                        >
                          Download {s.fileType ? `(${s.fileType})` : ""}
                        </a>
                      )}
                      {!s.projectLink && !s.downloadUrl && (
                        <span className="text-[var(--admin-muted)]">No assets</span>
                      )}
                    </div>
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
