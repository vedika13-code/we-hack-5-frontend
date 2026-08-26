import { useEffect, useState } from "react";
import { api } from "../lib/api";
import "../pages/admin/admin.css";

/* ─── rank badge helpers ────────────────────────────────────────── */

type RankStyle = {
  bg: string;
  text: string;
  border: string;
  label: string;
};

function getRankStyle(rank: number): RankStyle {
  if (rank === 1)
    return {
      bg: "bg-gradient-to-br from-yellow-300 to-amber-400",
      text: "text-yellow-900",
      border: "border-amber-300",
      label: "🥇",
    };
  if (rank === 2)
    return {
      bg: "bg-gradient-to-br from-slate-200 to-slate-300",
      text: "text-[var(--admin-paper)]",
      border: "border-slate-300",
      label: "🥈",
    };
  if (rank === 3)
    return {
      bg: "bg-gradient-to-br from-orange-200 to-orange-300",
      text: "text-orange-800",
      border: "border-orange-300",
      label: "🥉",
    };
  return {
    bg: "bg-slate-100",
    text: "text-[var(--admin-muted)]",
    border: "border-[var(--admin-line)]",
    label: "",
  };
}

/* ─── skeleton ──────────────────────────────────────────────────── */

function RowSkeleton() {
  return (
    <div className="flex items-center gap-4 px-5 py-4 animate-pulse border-b border-[var(--admin-line)] last:border-0">
      <div className="w-10 h-10 rounded-full bg-[var(--admin-line)] flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-[var(--admin-line)] rounded w-1/3" />
        <div className="h-3 bg-[var(--admin-line)] rounded w-1/4" />
      </div>
      <div className="h-5 w-16 bg-[var(--admin-line)] rounded" />
    </div>
  );
}

/* ─── mobile card ───────────────────────────────────────────────── */

function MobileRankCard({ team, rank }: { team: any; rank: number }) {
  const style = getRankStyle(rank);
  const isTop3 = rank <= 3;

  return (
    <div
      className={`rounded-xl border ${isTop3 ? style.border : "border-[var(--admin-line)]"} admin-card overflow-hidden ${isTop3 ? "shadow-sm" : ""} hover:shadow-md transition-shadow duration-200`}
    >
      {isTop3 && <div className="h-1 w-full bg-gradient-to-r from-purple-500 to-violet-400" />}
      <div className="flex items-center gap-4 p-4">
        {/* Rank badge */}
        <div
          className={`w-12 h-12 rounded-full ${style.bg} ${style.text} border ${style.border} flex flex-col items-center justify-center flex-shrink-0 font-bold leading-none`}
        >
          {isTop3 ? (
            <span className="text-xl">{style.label}</span>
          ) : (
            <span className="text-base">{rank}</span>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className={`font-bold truncate ${isTop3 ? "text-[var(--admin-paper)] text-base" : "text-[var(--admin-paper)] text-sm"}`}>
            {team.name}
          </p>
          {team.college && (
            <p className="text-xs text-[var(--admin-muted)] truncate mt-0.5">{team.college}</p>
          )}
        </div>

        {/* Track chip */}
        {team.track && (
          <span className="text-xs font-semibold uppercase tracking-wide bg-[var(--admin-ink)] text-[var(--admin-pink)] border border-[var(--admin-pink)] px-2 py-0.5 rounded flex-shrink-0">
            {team.track}
          </span>
        )}
      </div>
    </div>
  );
}

/* ─── desktop table row ─────────────────────────────────────────── */

function TableRow({ team, rank }: { team: any; rank: number }) {
  const style = getRankStyle(rank);
  const isTop3 = rank <= 3;

  return (
    <tr className={`border-b border-[var(--admin-line)] last:border-0 hover:bg-[var(--admin-bg)] transition-colors ${isTop3 ? "admin-card" : ""}`}>
      {/* Rank */}
      <td className="px-6 py-4 w-16">
        <div
          className={`w-10 h-10 rounded-full ${style.bg} ${style.text} border ${style.border} flex items-center justify-center font-bold text-sm`}
        >
          {isTop3 ? style.label : rank}
        </div>
      </td>

      {/* Team name */}
      <td className="px-4 py-4">
        <p className={`font-bold ${isTop3 ? "text-[var(--admin-paper)] text-base" : "text-[var(--admin-paper)] text-sm"}`}>
          {team.name}
        </p>
      </td>

      {/* College */}
      <td className="px-4 py-4 text-sm text-[var(--admin-muted)] max-w-xs">
        <p className="truncate">{team.college ?? "—"}</p>
      </td>

      {/* Track */}
      <td className="px-4 py-4">
        {team.track ? (
          <span className="text-xs font-semibold uppercase tracking-wide bg-[var(--admin-ink)] text-[var(--admin-pink)] border border-[var(--admin-pink)] px-2 py-0.5 rounded">
            {team.track}
          </span>
        ) : (
          <span className="text-[var(--admin-muted)] text-xs">—</span>
        )}
      </td>
    </tr>
  );
}

/* ─── main page ─────────────────────────────────────────────────── */

export default function Leaderboard() {
  const [teams, setTeams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getLeaderboard().then(setTeams).finally(() => setLoading(false));
  }, []);

  return (
    <div className="admin-theme min-h-screen bg-[var(--admin-bg)] text-[var(--admin-text)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">

        {/* ── Page header ── */}
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--admin-pink)] mb-1">
            WE HACK 5.0
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--admin-paper)] mb-2">Results</h1>
          <p className="text-[var(--admin-muted)] text-sm sm:text-base max-w-xl">
            Shortlisted teams, announced here as they're finalized by the judges.
          </p>
        </div>

        {/* ── Content ── */}
        {loading ? (
          /* skeleton */
          <div className="rounded-xl border border-[var(--admin-line)] admin-card overflow-hidden">
            {Array.from({ length: 5 }).map((_, i) => (
              <RowSkeleton key={i} />
            ))}
          </div>
        ) : teams.length === 0 ? (
          /* empty state */
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-[var(--admin-ink)] flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-[var(--admin-pink)]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
              </svg>
            </div>
            <p className="text-[var(--admin-paper)] font-semibold text-lg">Results not yet announced</p>
            <p className="text-[var(--admin-muted)] text-sm mt-1">
              Shortlisted teams will appear here once judges have finalized their decisions.
            </p>
          </div>
        ) : (
          <>
            <p className="text-xs text-[var(--admin-muted)] mb-4 font-medium uppercase tracking-wide">
              {teams.length} team{teams.length !== 1 ? "s" : ""} shortlisted
            </p>

            {/* ── Mobile: card list (all widths, hidden sm+) ── */}
            <div className="flex flex-col gap-3 sm:hidden">
              {teams.map((t, i) => (
                <MobileRankCard key={t.id} team={t} rank={i + 1} />
              ))}
            </div>

            {/* ── Desktop: table (sm+) ── */}
            <div className="hidden sm:block rounded-xl border border-[var(--admin-line)] admin-card overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[var(--admin-line)] bg-[var(--admin-bg)]">
                    <th className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-[var(--admin-muted)] w-16">
                      Rank
                    </th>
                    <th className="px-4 py-3 text-xs font-bold uppercase tracking-widest text-[var(--admin-muted)]">
                      Team
                    </th>
                    <th className="px-4 py-3 text-xs font-bold uppercase tracking-widest text-[var(--admin-muted)]">
                      College
                    </th>
                    <th className="px-4 py-3 text-xs font-bold uppercase tracking-widest text-[var(--admin-muted)]">
                      Track
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((t, i) => (
                    <TableRow key={t.id} team={t} rank={i + 1} />
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}