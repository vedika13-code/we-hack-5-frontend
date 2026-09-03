import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../lib/api";
import { AdminShell } from "./components/AdminShell";
import { AdminPageHeader } from "./components/AdminPageHeader";
import { ErrorState } from "./components/FeedbackStates";
import { StatusBadge } from "./components/StatusBadge";
import { ConfirmDialog } from "./components/ConfirmDialog";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    api.me().then(setUser).catch(() => {});
  }, []);

  if (!user)
    return (
      <div className="max-w-3xl mx-auto px-6 py-12" style={{ color: "var(--wh-text-muted)" }}>
        Loading…
      </div>
    );

  return (
    <div className="max-w-3xl mx-auto px-6 py-12" style={{ color: "var(--wh-text)" }}>
      <h1 className="text-2xl font-bold mb-2 font-display uppercase">Dashboard</h1>
      <p className="mb-8" style={{ color: "var(--wh-text-muted)" }}>Welcome, {user.fullName}.</p>

      {!user.teamId ? (
        <div
          className="border-2 rounded-lg p-6 text-center"
          style={{ borderColor: "var(--wh-border)" }}
        >
          <h2 className="text-xl font-bold mb-2">You haven't registered a team yet</h2>
          <p className="mb-5" style={{ color: "var(--wh-text-muted)" }}>
            Create a new team or join one with a code from a teammate to get started.
          </p>
          <Link to="/registration" className="wh-btn">
            Register Your Team
          </Link>
        </div>
      ) : (
        <div
          className="border rounded-lg p-6 space-y-3"
          style={{ borderColor: "var(--wh-border-muted)" }}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Your Team</h2>
            <span className="wh-badge wh-badge-accent">
              {user.team?.registrationStatus ?? "SUBMITTED"}
            </span>
          </div>
          <p style={{ color: "var(--wh-text-muted)" }}>
            You're registered
            {user.team?.registrationComplete ? "" : " — finish finalizing your team on the Team page"}.
          </p>
          <div className="flex gap-4 text-sm pt-2">
            <Link to="/team" className="underline" style={{ color: "var(--wh-accent)" }}>View Team →</Link>
            <Link to="/submission" className="underline" style={{ color: "var(--wh-accent)" }}>Go to Submission →</Link>
          </div>
        </div>
      )}
    </div>
  );
}
