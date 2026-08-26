import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../lib/api";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    api.me().then(setUser).catch(() => {});
  }, []);

  if (!user) return <div className="max-w-3xl mx-auto px-6 py-12 text-slate-500">Loading…</div>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
      <p className="text-slate-600 mb-8">Welcome, {user.fullName}.</p>

      {!user.teamId ? (
        <div className="border-2 border-slate-900 rounded-lg p-6 text-center">
          <h2 className="text-xl font-bold mb-2">You haven't registered a team yet</h2>
          <p className="text-slate-600 mb-5">
            Create a new team or join one with a code from a teammate to get started.
          </p>
          <Link
            to="/registration"
            className="inline-block bg-slate-900 text-white rounded px-6 py-3 font-medium"
          >
            Register Your Team
          </Link>
        </div>
      ) : (
        <div className="border rounded-lg p-6 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Your Team</h2>
            <span className="text-xs bg-slate-100 rounded px-2 py-1">
              {user.team?.registrationStatus ?? "SUBMITTED"}
            </span>
          </div>
          <p className="text-slate-600">
            You're registered
            {user.team?.registrationComplete ? "" : " — finish finalizing your team on the Team page"}.
          </p>
          <div className="flex gap-4 text-sm pt-2">
            <Link to="/team" className="underline">View Team →</Link>
            <Link to="/submission" className="underline">Go to Submission →</Link>
          </div>
        </div>
      )}
    </div>
  );
}