import { useEffect, useMemo, useState } from "react";
import { api } from "../lib/api";
import "../pages/admin/admin.css";

/* ─── helpers ──────────────────────────────────────────────────── */

function getInitials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function Avatar({ src, name, size = "lg" }: { src?: string; name: string; size?: "lg" | "md" }) {
  const dim = size === "lg" ? "w-20 h-20 text-xl" : "w-14 h-14 text-base";
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`${dim} rounded-full object-cover flex-shrink-0`}
        onError={(e) => {
          // fallback to initials on broken URL
          (e.currentTarget as HTMLImageElement).style.display = "none";
          (e.currentTarget.nextElementSibling as HTMLElement | null)?.style.setProperty(
            "display",
            "flex"
          );
        }}
      />
    );
  }
  return (
    <div
      className={`${dim} rounded-full bg-[var(--admin-ink)] text-[var(--admin-pink)] font-bold flex items-center justify-center flex-shrink-0`}
    >
      {getInitials(name)}
    </div>
  );
}

function AvatarWithFallback({ src, name, size = "lg" }: { src?: string; name: string; size?: "lg" | "md" }) {
  const dim = size === "lg" ? "w-20 h-20 text-xl" : "w-14 h-14 text-base";
  const [imgFailed, setImgFailed] = useState(false);

  if (src && !imgFailed) {
    return (
      <img
        src={src}
        alt={name}
        className={`${dim} rounded-full object-cover flex-shrink-0`}
        onError={() => setImgFailed(true)}
      />
    );
  }
  return (
    <div
      className={`${dim} rounded-full bg-[var(--admin-ink)] text-[var(--admin-pink)] font-bold flex items-center justify-center flex-shrink-0`}
    >
      {getInitials(name)}
    </div>
  );
}

/* ─── skeleton ──────────────────────────────────────────────────── */

function CardSkeleton() {
  return (
    <div className="rounded-xl border border-[var(--admin-line)] admin-card p-5 flex flex-col gap-3 animate-pulse">
      <div className="w-20 h-20 rounded-full bg-[var(--admin-line)] mx-auto" />
      <div className="space-y-2 flex-1">
        <div className="h-4 bg-[var(--admin-line)] rounded w-3/4 mx-auto" />
        <div className="h-3 bg-[var(--admin-line)] rounded w-1/2 mx-auto" />
        <div className="h-3 bg-[var(--admin-line)] rounded w-full mt-3" />
        <div className="h-3 bg-[var(--admin-line)] rounded w-5/6" />
        <div className="flex gap-2 mt-3 justify-center">
          <div className="h-5 w-16 bg-[var(--admin-line)] rounded" />
          <div className="h-5 w-12 bg-[var(--admin-line)] rounded" />
        </div>
      </div>
    </div>
  );
}

/* ─── judge card ────────────────────────────────────────────────── */

function JudgeCard({ judge }: { judge: any }) {
  const chips = judge.expertise
    ? judge.expertise.split(",").map((s: string) => s.trim()).filter(Boolean)
    : [];

  return (
    <div className="rounded-xl border border-[var(--admin-line)] admin-card hover:shadow-lg hover:border-[var(--admin-pink)] transition-all duration-200 flex flex-col overflow-hidden group">
      {/* Top accent strip */}
      <div className="h-1 w-full bg-gradient-to-r from-[var(--admin-lime)] to-[var(--admin-pink)]" />

      <div className="p-5 flex flex-col items-center text-center flex-1">
        <AvatarWithFallback src={judge.photoUrl} name={judge.name} size="lg" />

        <h3 className="mt-3 font-bold text-[var(--admin-paper)] text-base leading-snug">{judge.name}</h3>
        <p className="text-sm text-[var(--admin-muted)] mt-0.5">
          {[judge.designation, judge.company].filter(Boolean).join(" · ")}
        </p>

        {/* Expertise chips */}
        {chips.length > 0 && (
          <div className="flex flex-wrap gap-1.5 justify-center mt-3">
            {chips.map((chip: string) => (
              <span
                key={chip}
                className="text-xs font-semibold uppercase tracking-wide bg-[var(--admin-ink)] text-[var(--admin-pink)] border border-[var(--admin-pink)] px-2 py-0.5 rounded"
              >
                {chip}
              </span>
            ))}
          </div>
        )}

        {/* Bio */}
        {judge.bio && (
          <p className="text-sm text-[var(--admin-muted)] mt-3 line-clamp-2 leading-relaxed">{judge.bio}</p>
        )}

        {/* LinkedIn */}
        {judge.linkedin && (
          <a
            href={judge.linkedin}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--admin-pink)] hover:text-[var(--admin-lime)] transition-colors"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.447 20.452H17.21v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.985V9h3.102v1.561h.044c.432-.817 1.489-1.678 3.066-1.678 3.279 0 3.883 2.158 3.883 4.963v6.606zM5.337 7.433a1.8 1.8 0 1 1 0-3.6 1.8 1.8 0 0 1 0 3.6zM6.93 20.452H3.742V9H6.93v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>
        )}
      </div>
    </div>
  );
}

/* ─── main page ─────────────────────────────────────────────────── */

export default function Judges() {
  const [judges, setJudges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeChip, setActiveChip] = useState<string | null>(null);

  useEffect(() => {
    api.getJudges().then(setJudges).finally(() => setLoading(false));
  }, []);

  // Derive all unique expertise tags from data
  const allChips = useMemo(() => {
    const set = new Set<string>();
    judges.forEach((j) => {
      if (j.expertise) {
        j.expertise.split(",").forEach((s: string) => {
          const t = s.trim();
          if (t) set.add(t);
        });
      }
    });
    return Array.from(set).sort();
  }, [judges]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return judges.filter((j) => {
      const matchesSearch =
        !q ||
        j.name?.toLowerCase().includes(q) ||
        j.company?.toLowerCase().includes(q) ||
        j.expertise?.toLowerCase().includes(q) ||
        j.designation?.toLowerCase().includes(q);
      const matchesChip =
        !activeChip ||
        j.expertise?.split(",").some((s: string) => s.trim() === activeChip);
      return matchesSearch && matchesChip;
    });
  }, [judges, search, activeChip]);

  return (
    <div className="admin-theme min-h-screen bg-[var(--admin-bg)] text-[var(--admin-text)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14">

        {/* ── Page header ── */}
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--admin-pink)] mb-1">
            WE HACK 5.0
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--admin-paper)] mb-2">Judges</h1>
          <p className="text-[var(--admin-muted)] text-sm sm:text-base max-w-xl">
            Meet the industry professionals evaluating your projects across all tracks.
          </p>
        </div>

        {/* ── Search + filters ── */}
        {!loading && judges.length > 0 && (
          <div className="mb-6 space-y-3">
            {/* Search bar */}
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--admin-muted)]"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search by name, company or expertise…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border border-[var(--admin-line)] admin-card focus:outline-none focus:ring-2 focus:ring-[var(--admin-lime)] focus:border-transparent placeholder-[var(--admin-muted)]"
              />
            </div>

            {/* Filter chips */}
            {allChips.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveChip(null)}
                  className={`text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded border transition-colors ${
                    activeChip === null
                      ? "bg-[var(--admin-lime)] text-[var(--admin-ink)] border-[var(--admin-lime)]"
                      : "admin-card text-[var(--admin-paper-dim)] border-[var(--admin-line)] hover:border-[var(--admin-lime)] hover:text-[var(--admin-pink)]"
                  }`}
                >
                  All
                </button>
                {allChips.map((chip) => (
                  <button
                    key={chip}
                    onClick={() => setActiveChip(chip === activeChip ? null : chip)}
                    className={`text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded border transition-colors ${
                      activeChip === chip
                        ? "bg-[var(--admin-lime)] text-[var(--admin-ink)] border-[var(--admin-lime)]"
                        : "admin-card text-[var(--admin-paper-dim)] border-[var(--admin-line)] hover:border-[var(--admin-lime)] hover:text-[var(--admin-pink)]"
                    }`}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Content ── */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : judges.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-[var(--admin-ink)] flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-[var(--admin-pink)]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0z" />
              </svg>
            </div>
            <p className="text-[var(--admin-paper)] font-semibold text-lg">Judges to be announced</p>
            <p className="text-[var(--admin-muted)] text-sm mt-1">Check back soon — the panel is being finalized.</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-[var(--admin-muted)] text-sm">No judges match your search. Try different keywords.</p>
            <button
              onClick={() => { setSearch(""); setActiveChip(null); }}
              className="mt-3 text-xs font-semibold text-[var(--admin-pink)] hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <p className="text-xs text-[var(--admin-muted)] mb-4 font-medium uppercase tracking-wide">
              {filtered.length} of {judges.length} judges
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((j) => (
                <JudgeCard key={j.id} judge={j} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}