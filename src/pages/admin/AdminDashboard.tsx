import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../lib/api";
import { AdminShell } from "./components/AdminShell";
import { MetricCard } from "./components/MetricCard";
import { AdminPageHeader } from "./components/AdminPageHeader";
import { LoadingState, ErrorState } from "./components/FeedbackStates";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.getAdminDashboard().then(setStats).catch((err) => setError(err.message));
  }, []);

  return (
    <AdminShell>
      <AdminPageHeader
        title="Command Centre"
        description="Real-time operations overview for WE HACK 5.0."
      />

      {error && <ErrorState error={error} />}
      {!error && !stats && <LoadingState />}

      {!error && stats && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <MetricCard label="Total Participants" value={stats.totalParticipants ?? 0} />
            <MetricCard label="Total Teams" value={stats.totalTeams ?? 0} />
            <MetricCard label="Pending Review" value={stats.submittedCount ?? 0} />
            <MetricCard label="Approved Teams" value={stats.approvedCount ?? 0} />
            <MetricCard label="Submissions" value={stats.submissionCount ?? 0} />
            <MetricCard label="Shortlisted" value={stats.shortlistedCount ?? 0} />
          </div>

          <div className="flex flex-wrap gap-4">
            <Link to="/admin/teams" className="admin-primary-action">
              Manage Teams
            </Link>
            <Link to="/admin/sponsors" className="admin-secondary-action">
              Manage Sponsors
            </Link>
          </div>
        </>
      )}
    </AdminShell>
  );
}
