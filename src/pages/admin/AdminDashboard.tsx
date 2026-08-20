import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../lib/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.getAdminDashboard().then(setStats).catch((err) => setError(err.message));
  }, []);

  if (error) return <div className="max-w-5xl mx-auto px-6 py-12 text-red-600">{error}</div>;
  if (!stats) return <div className="p-8 text-center text-slate-500">Loading…</div>;

  const cards = [
    { label: "Total Participants", value: stats.totalParticipants },
    { label: "Total Teams", value: stats.totalTeams },
    { label: "Pending Review", value: stats.submittedCount },
    { label: "Approved", value: stats.approvedCount },
    { label: "Submissions", value: stats.submissionCount },
    { label: "Shortlisted", value: stats.shortlistedCount },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {cards.map((c) => (
          <div key={c.label} className="border rounded p-4">
            <p className="text-sm text-slate-500">{c.label}</p>
            <p className="text-3xl font-bold">{c.value}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-4 text-sm">
        <Link to="/admin/teams" className="underline">Manage Teams →</Link>
        <Link to="/admin/sponsors" className="underline">Manage Sponsors →</Link>
      </div>
    </div>
  );
}