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

function AvatarWithFallback({ src, name }: { src?: string; name: string }) {
  const [imgFailed, setImgFailed] = useState(false);
  if (src && !imgFailed) {
    return (
      <img
        src={src}
        alt={name}
        className="w-16 h-16 rounded-full object-cover flex-shrink-0"
        onError={() => setImgFailed(true)}
      />
    );
  }
  return (
    <div className="w-16 h-16 rounded-full bg-[var(--admin-ink)] text-[var(--admin-pink)] font-bold text-lg flex items-center justify-center flex-shrink-0">
      {getInitials(name)}
    </div>
  );
}

/* ─── skeleton ──────────────────────────────────────────────────── */

function MentorSkeleton() {
  return (
    <div className="rounded-xl border border-[var(--admin-line)] admin-card p-4 flex flex-col items-center gap-2 animate-pulse">
      <div className="w-16 h-16 rounded-full bg-[var(--admin-line)]" />
      <div className="h-3.5 bg-[var(--admin-line)] rounded w-24" />
      <div className="h-3 bg-[var(--admin-line)] rounded w-16" />
    </div>
  );
}

/* ─── mentor card ───────────────────────────────────────────────── */

function MentorCard({ mentor }: { mentor: any }) {
  const chips = mentor.expertise
    ? mentor.expertise.split(",").map((s: string) => s.trim()).filter(Boolean)
    : [];

  return (
    <div className="rounded-xl border border-[var(--admin-line)] admin-card hover:shadow-md hover:border-[var(--admin-pink)] transition-all duration-200 flex flex-col overflow-hidden">
      {/* accent top strip */}
      <div className="h-1 w-full bg-gradient-to-r from-[var(--admin-lime)] to-[var(--admin-pink)]" />

      <div className="p-4 flex flex-col items-center text-center gap-2 flex-1">
        <AvatarWithFallback src={mentor.photoUrl} name={mentor.name} />

        <div>
          <h3 className="font-bold text-[var(--admin-paper)] text-sm leading-snug">{mentor.name}</h3>
        </div>

        {chips.length > 0 && (
          <div className="flex flex-wrap gap-1 justify-center">
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
      </div>
    </div>
  );
}

/* ─── main page ─────────────────────────────────────────────────── */

export default function Mentors() {
  const [mentors, setMentors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api.getMentors().then(setMentors).finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    if (!q) return mentors;
    return mentors.filter(
      (m) =>
        m.name?.toLowerCase().includes(q) ||
        m.expertise?.toLowerCase().includes(q)
    );
  }, [mentors, search]);

  return (
    <div className="admin-theme min-h-screen bg-[var(--admin-bg)] text-[var(--admin-text)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14">

        {/* ── Page header ── */}
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--admin-pink)] mb-1">
            WE HACK 5.0
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--admin-paper)] mb-2">Mentors</h1>
          <p className="text-[var(--admin-muted)] text-sm sm:text-base max-w-xl">
            Mentors are available in person throughout the event. No booking needed — just find them on the floor and ask away.
          </p>
        </div>

        {/* ── Search bar ── */}
        {!loading && mentors.length > 0 && (
          <div className="mb-6">
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
                placeholder="Search by name or expertise…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border border-[var(--admin-line)] admin-card focus:outline-none focus:ring-2 focus:ring-[var(--admin-lime)] focus:border-transparent placeholder-[var(--admin-muted)]"
              />
            </div>
          </div>
        )}

        {/* ── Availability callout ── */}
        {!loading && mentors.length > 0 && (
          <div className="flex items-center gap-2 mb-6 px-4 py-2.5 rounded-lg bg-[var(--admin-ink)] border border-[var(--admin-pink)] text-[var(--admin-pink)] text-xs font-semibold uppercase tracking-wide w-fit">
            <span className="w-2 h-2 rounded-full bg-[var(--admin-ink)]0 animate-pulse" />
            Mentor access is live during the hackathon
          </div>
        )}

        {/* ── Content ── */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <MentorSkeleton key={i} />
            ))}
          </div>
        ) : mentors.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-[var(--admin-ink)] flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-[var(--admin-pink)]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0zM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            <p className="text-[var(--admin-paper)] font-semibold text-lg">Mentors to be announced</p>
            <p className="text-[var(--admin-muted)] text-sm mt-1">Our mentor lineup is being finalized. Check back soon.</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-[var(--admin-muted)] text-sm">No mentors match your search.</p>
            <button
              onClick={() => setSearch("")}
              className="mt-3 text-xs font-semibold text-[var(--admin-pink)] hover:underline"
            >
              Clear search
            </button>
          </div>
        ) : (
          <>
            <p className="text-xs text-[var(--admin-muted)] mb-4 font-medium uppercase tracking-wide">
              {filtered.length} of {mentors.length} mentors
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filtered.map((m) => (
                <MentorCard key={m.id} mentor={m} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}