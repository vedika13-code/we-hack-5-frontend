import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../lib/api";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [deadlines, setDeadlines] = useState<any[]>([]);

  useEffect(() => {
    api.me().then(setUser).catch(() => {});
    api.getAnnouncements().then((d) => setAnnouncements(d?.announcements ?? d ?? [])).catch(() => {});
    api.getDeadlines().then((d) => setDeadlines(d?.deadlines ?? d ?? [])).catch(() => {});
  }, []);

  const status = user?.team?.registrationStatus ?? null;

  function statusBadge(s: string | null) {
    if (!s) return <span className="wh-badge wh-badge-yellow">No Team</span>;
    const map: Record<string, string> = {
      PENDING: "wh-badge-yellow",
      SUBMITTED: "wh-badge-purple",
      APPROVED: "wh-badge-green",
      REJECTED: "wh-badge-red",
    };
    return <span className={`wh-badge ${map[s] ?? "wh-badge-purple"}`}>{s}</span>;
  }

  const quickActions = [
    {
      to: "/team",
      icon: "👥",
      title: "My Team",
      desc: user?.team?.name ?? "No team yet — join or create one",
      accent: true,
    },
    {
      to: "/submission",
      icon: "📦",
      title: "Submission",
      desc: "Upload your project files or link",
      accent: false,
    },
    {
      to: "/profile",
      icon: "🧑‍💻",
      title: "Profile",
      desc: "View and edit your account details",
      accent: false,
    },
    ...(!user?.teamId
      ? [
          {
            to: "/registration",
            icon: "🚀",
            title: "Register Team",
            desc: "Create or join a team to get started",
            accent: false,
          },
        ]
      : []),
  ];

  return (
    <div className="wh-page max-w-4xl mx-auto">
      {/* ── Hero greeting ── */}
      <div
        className="wh-card-accent mb-8 relative overflow-hidden"
        style={{ minHeight: "140px" }}
      >
        {/* Glow orb */}
        <div
          className="absolute -top-12 -right-12 w-56 h-56 rounded-full pointer-events-none opacity-20"
          style={{ background: "radial-gradient(circle, var(--wh-accent) 0%, transparent 70%)" }}
        />
        <div className="relative z-10">
          <p className="text-xs tracking-widest uppercase text-[var(--wh-text-muted)] mb-2 font-semibold">
            WE HACK 5.0 · DASHBOARD
          </p>
          {user ? (
            <>
              <h1 className="text-3xl font-bold text-[var(--wh-text-heading)] mb-3">
                Welcome back,{" "}
                <span style={{ color: "var(--wh-accent)" }}>
                  {user.fullName?.split(" ")[0] ?? "Hacker"}
                </span>{" "}
                👋
              </h1>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-sm text-[var(--wh-text-muted)]">Registration status:</span>
                {statusBadge(status)}
                {user.email && (
                  <span className="text-xs text-[var(--wh-text-muted)] font-mono">{user.email}</span>
                )}
              </div>
            </>
          ) : (
            <div className="space-y-3">
              <div className="h-8 w-64 rounded-lg bg-[var(--wh-surface-2)] animate-pulse" />
              <div className="h-4 w-40 rounded bg-[var(--wh-surface-2)] animate-pulse" />
            </div>
          )}
        </div>
      </div>

      {/* ── Quick actions ── */}
      <p className="wh-section-label">Quick Actions</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {quickActions.map((action) => (
          <Link
            key={action.to}
            to={action.to}
            className="group block rounded-xl border p-5 transition-all duration-200 hover:-translate-y-0.5"
            style={{
              background: action.accent ? "var(--wh-accent-dim)" : "var(--wh-surface)",
              borderColor: action.accent ? "var(--wh-border)" : "var(--wh-border-muted)",
            }}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl mt-0.5">{action.icon}</span>
              <div>
                <p
                  className="font-semibold text-sm mb-1 group-hover:text-wh-accent transition-colors"
                  style={{ color: action.accent ? "var(--wh-accent)" : "var(--wh-text-heading)" }}
                >
                  {action.title} →
                </p>
                <p className="text-xs text-[var(--wh-text-muted)] leading-relaxed">{action.desc}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* ── Bottom row: Announcements + Deadlines ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Announcements */}
        <div className="wh-card">
          <p className="wh-section-label">📢 Announcements</p>
          {announcements.length > 0 ? (
            <ul className="space-y-3">
              {announcements.slice(0, 4).map((a: any, i: number) => (
                <li key={i} className="border-l-2 pl-3" style={{ borderColor: "var(--wh-accent)" }}>
                  <p className="text-sm font-semibold text-[var(--wh-text-heading)]">{a.title}</p>
                  {a.body && (
                    <p className="text-xs text-[var(--wh-text-muted)] mt-0.5 line-clamp-2">{a.body}</p>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-[var(--wh-text-muted)]">No announcements yet.</p>
          )}
        </div>

        {/* Deadlines */}
        <div className="wh-card">
          <p className="wh-section-label">⏰ Upcoming Deadlines</p>
          {deadlines.length > 0 ? (
            <ul className="space-y-3">
              {deadlines.slice(0, 4).map((d: any, i: number) => {
                const due = d.extendedTo ?? d.dueAt;
                const isPast = due && new Date(due) < new Date();
                return (
                  <li key={i} className="flex items-center justify-between">
                    <span className="text-sm text-[var(--wh-text)]">{d.key ?? d.label}</span>
                    <span
                      className="text-xs font-mono"
                      style={{ color: isPast ? "var(--wh-error)" : "var(--wh-success)" }}
                    >
                      {due ? new Date(due).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "TBD"}
                    </span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-sm text-[var(--wh-text-muted)]">No deadlines set yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
