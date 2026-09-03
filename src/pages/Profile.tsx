import { useEffect, useState } from "react";
import { api } from "../lib/api";

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .me()
      .then(setUser)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  function initials(name: string) {
    return name
      .split(" ")
      .slice(0, 2)
      .map((p) => p[0])
      .join("")
      .toUpperCase();
  }

  function roleBadge(role: string) {
    const map: Record<string, { cls: string; label: string }> = {
      PARTICIPANT: { cls: "wh-badge-purple", label: "Participant" },
      TEAM_LEADER: { cls: "wh-badge-green", label: "Team Leader" },
      ADMIN: { cls: "wh-badge-yellow", label: "Admin" },
      SUPER_ADMIN: { cls: "wh-badge-red", label: "Super Admin" },
    };
    const entry = map[role] ?? { cls: "wh-badge-purple", label: role };
    return <span className={`wh-badge ${entry.cls}`}>{entry.label}</span>;
  }

  if (loading) {
    return (
      <div className="wh-page max-w-2xl mx-auto">
        <div className="wh-card space-y-4 animate-pulse">
          <div className="flex items-center gap-4">
            <div className="w-18 h-18 rounded-full bg-wh-surface2" style={{ width: 72, height: 72 }} />
            <div className="space-y-2">
              <div className="h-5 w-40 rounded bg-wh-surface2" />
              <div className="h-4 w-28 rounded bg-wh-surface2" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="wh-page max-w-2xl mx-auto text-center">
        <p className="text-[var(--wh-text-muted)]">Unable to load profile.</p>
      </div>
    );
  }

  return (
    <div className="wh-page max-w-2xl mx-auto">
      <p className="text-xs tracking-widest uppercase text-[var(--wh-text-muted)] mb-6 font-semibold">
        WE HACK 5.0 · PROFILE
      </p>

      {/* ── Identity card ── */}
      <div className="wh-card-accent mb-6">
        <div className="flex items-center gap-5">
          {/* Avatar */}
          <div
            className="wh-avatar wh-avatar-lg flex-shrink-0"
            style={{ width: 72, height: 72, fontSize: "1.6rem" }}
          >
            {initials(user.fullName ?? "U")}
          </div>

          {/* Name + role */}
          <div>
            <h1 className="text-2xl font-bold text-[var(--wh-text-heading)] mb-1">
              {user.fullName}
            </h1>
            <div className="flex items-center gap-2 flex-wrap">
              {roleBadge(user.role ?? "PARTICIPANT")}
              {user.team?.name && (
                <span className="wh-badge wh-badge-purple">
                  🏷 {user.team.name}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Details ── */}
      <div className="wh-card mb-6">
        <p className="wh-section-label">Account Details</p>
        <div className="space-y-0">
          <ProfileRow label="Full Name" value={user.fullName} />
          <ProfileRow label="Email" value={user.email} mono />
          {user.college && <ProfileRow label="College" value={user.college} />}
          {user.phone && <ProfileRow label="Phone" value={user.phone} mono />}
        </div>
      </div>

      {/* ── Team info ── */}
      {user.team && (
        <div className="wh-card">
          <p className="wh-section-label">Team</p>
          <div className="space-y-0">
            <ProfileRow label="Team Name" value={user.team.name} />
            {user.team.college && <ProfileRow label="College" value={user.team.college} />}
            {user.team.track && <ProfileRow label="Track" value={user.team.track} />}
            <ProfileRow
              label="Registration"
              value={user.team.registrationStatus ?? "—"}
            />
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Row sub-component ── */
function ProfileRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-[var(--wh-border-muted)] last:border-0">
      <span className="text-xs uppercase tracking-wider text-[var(--wh-text-muted)] font-semibold w-28 flex-shrink-0">
        {label}
      </span>
      <span
        className={`text-sm text-right text-[var(--wh-text)] ${mono ? "font-mono" : ""}`}
      >
        {value ?? "—"}
      </span>
    </div>
  );
}
