import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import "../pages/admin/admin.css";

export default function Team() {
  const [user, setUser] = useState<any>(null);
  const [team, setTeam] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function load(isBackgroundRefresh = false) {
    if (!isBackgroundRefresh) setLoading(true);
    try {
      const me = await api.me();
      setUser(me);
      if (me.teamId) {
        const t = await api.getTeam(me.teamId);
        setTeam(t);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      if (!isBackgroundRefresh) setLoading(false);
    }
  }

  useEffect(() => {
    load();
    const interval = setInterval(() => load(true), 15_000);
    return () => clearInterval(interval);
  }, []);

  async function handleFinalize() {
    setError("");
    try {
      const updated = await api.finalizeTeam(team.id);
      setTeam((prev: any) => ({ ...prev, registrationComplete: updated.registrationComplete }));
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function handleRemove(memberId: string) {
    setError("");
    try {
      const updated = await api.removeMember(team.id, memberId);
      setTeam(updated);
    } catch (err: any) {
      setError(err.message);
    }
  }

  if (loading) {
    return (
      <div className="admin-theme wh-page max-w-2xl mx-auto space-y-4 animate-pulse">
        <div className="h-8 w-48 rounded-lg bg-wh-surface2" />
        <div className="admin-card space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-4 rounded bg-wh-surface2" />
          ))}
        </div>
      </div>
    );
  }

  if (!team) {
    return (
      <div className="admin-theme wh-page max-w-lg mx-auto text-center">
        <div className="admin-card py-14 flex flex-col items-center gap-5">
          <span className="text-6xl">🏕</span>
          <div>
            <h2 className="text-xl font-bold text-[var(--admin-paper)] mb-2">No Team Yet</h2>
            <p className="text-sm text-[var(--admin-muted)]">
              You haven't joined or created a team. Register now to get started.
            </p>
          </div>
          <button
            className="admin-primary-action mt-2"
            onClick={() => navigate("/registration")}
          >
            Register a Team ↗
          </button>
        </div>
      </div>
    );
  }

  const isLeader = user?.role === "TEAM_LEADER";

  function statusBadge(s: string) {
    const map: Record<string, string> = {
      PENDING: "border-[var(--admin-gold)] text-[var(--admin-gold)]",
      SUBMITTED: "border-[var(--admin-lime)] text-[var(--admin-lime)]",
      APPROVED: "border-[var(--admin-lime)] text-[var(--admin-lime)]",
      REJECTED: "border-[var(--admin-pink)] text-[var(--admin-pink)]",
    };
    return <span className={`admin-badge ${map[s] ?? "border-[var(--admin-lime)] text-[var(--admin-lime)]"}`}>{s}</span>;
  }

  function memberInitials(name: string) {
    return name
      .split(" ")
      .slice(0, 2)
      .map((p) => p[0])
      .join("")
      .toUpperCase();
  }

  return (
    <div className="admin-theme wh-page max-w-2xl mx-auto">
      <p className="text-xs tracking-widest uppercase text-[var(--admin-muted)] mb-6 font-semibold">
        WE HACK 5.0 · MY TEAM
      </p>

      {/* ── Team header ── */}
      <div className="admin-card border-[var(--admin-lime)] mb-6 relative overflow-hidden">
        <div
          className="absolute -bottom-8 -right-8 w-40 h-40 rounded-full pointer-events-none opacity-10"
          style={{ background: "radial-gradient(circle, var(--admin-lime) 0%, transparent 70%)" }}
        />
        <div className="relative z-10">
          <div className="flex items-start justify-between gap-4 flex-wrap mb-4">
            <div>
              <h1 className="text-2xl font-bold text-[var(--admin-paper)]">{team.name}</h1>
              {team.college && (
                <p className="text-sm text-[var(--admin-muted)] mt-0.5">{team.college}</p>
              )}
            </div>
            {/* Team code pill */}
            <span
              className="font-mono text-xs font-bold tracking-widest px-3 py-1.5 rounded-lg border"
              style={{
                background: "rgba(220,255,145,0.05)",
                borderColor: "var(--admin-lime)",
                color: "var(--admin-lime)",
              }}
            >
              #{team.code}
            </span>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap gap-3">
            {statusBadge(team.registrationStatus ?? "PENDING")}
            {team.track && (
              <span className="admin-badge border-[var(--admin-lime)] text-[var(--admin-lime)]">🔬 {team.track}</span>
            )}
            <span
              className="admin-badge"
              style={{
                background: team.registrationComplete ? "rgba(52,211,153,0.1)" : "rgba(251,191,36,0.1)",
                color: team.registrationComplete ? "var(--admin-lime)" : "var(--admin-gold)",
                border: `1px solid ${team.registrationComplete ? "rgba(52,211,153,0.25)" : "rgba(251,191,36,0.25)"}`,
              }}
            >
              {team.registrationComplete ? "✅ Finalized" : "⏳ Not Finalized"}
            </span>
          </div>
        </div>
      </div>

      {error && (
        <div className="mb-4 px-4 py-2.5 rounded-lg border text-sm" style={{ background: "rgba(248,113,113,0.08)", borderColor: "rgba(248,113,113,0.25)", color: "var(--admin-pink)" }}>
          {error}
        </div>
      )}

      {/* ── Idea ── */}
      {(team.ideaTitle || team.ideaDescription) && (
        <div className="admin-card mb-6">
          <p className="admin-label">💡 Project Idea</p>
          {team.ideaTitle && (
            <h3 className="font-semibold text-[var(--admin-paper)] mb-1">{team.ideaTitle}</h3>
          )}
          {team.ideaDescription && (
            <p className="text-sm text-[var(--admin-muted)] leading-relaxed">{team.ideaDescription}</p>
          )}
        </div>
      )}

      {/* ── Members ── */}
      <div className="admin-card mb-6">
        <p className="admin-label">👥 Members</p>
        <ul className="space-y-0">
          {team.members?.map((m: any) => (
            <li
              key={m.id}
              className="flex items-center justify-between py-3 border-b border-[var(--admin-line)] last:border-0"
            >
              <div className="flex items-center gap-3">
                <div className="wh-avatar">{memberInitials(m.fullName ?? "?")}</div>
                <div>
                  <p className="text-sm font-medium text-[var(--admin-paper)]">{m.fullName}</p>
                  {m.email && (
                    <p className="text-xs text-[var(--admin-muted)] font-mono">{m.email}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3">
                {m.role === "TEAM_LEADER" ? (
                  <span className="admin-badge border-[var(--admin-lime)] text-[var(--admin-lime)]">Leader</span>
                ) : (
                  <span className="admin-badge" style={{ background: "var(--admin-ink)", color: "var(--admin-muted)", border: "1px solid var(--admin-line)" }}>
                    Member
                  </span>
                )}
                {isLeader && m.role !== "TEAM_LEADER" && (
                  <button
                    className="admin-primary-action admin-primary-action-danger text-xs px-2.5 py-1"
                    onClick={() => handleRemove(m.id)}
                  >
                    Remove
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Finalize CTA ── */}
      {isLeader && !team.registrationComplete && (
        <div className="admin-card border-[var(--admin-lime)] bg-[rgba(220,255,145,0.05)] flex items-center justify-between gap-4 flex-wrap">
          <div>
            <p className="font-semibold text-[var(--admin-paper)] text-sm">Ready to lock in?</p>
            <p className="text-xs text-[var(--admin-muted)] mt-0.5">
              Finalizing locks your team roster and submits your registration.
            </p>
          </div>
          <button className="admin-primary-action flex-shrink-0" onClick={handleFinalize}>
            Finalize Registration ✓
          </button>
        </div>
      )}
    </div>
  );
}