import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api";

const TRACKS = [
  "AI / ML",
  "Web3 / Blockchain",
  "Fintech",
  "Health Tech",
  "Ed Tech",
  "Sustainability",
  "Open Innovation",
];

export default function Registration() {
  const [mode, setMode] = useState<"create" | "join">("create");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const [createForm, setCreateForm] = useState({
    name: "",
    college: "",
    track: "",
    ideaTitle: "",
    ideaDescription: "",
    hardwareNeeded: false,
  });
  const [joinCode, setJoinCode] = useState("");

  function cf<K extends keyof typeof createForm>(key: K, val: typeof createForm[K]) {
    setCreateForm((prev) => ({ ...prev, [key]: val }));
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const team = await api.createTeam(createForm);
      navigate("/team", { state: { teamId: team.id } });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleJoin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await api.joinTeam(joinCode);
      navigate("/team");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="wh-page max-w-lg mx-auto">
      <p className="text-xs tracking-widest uppercase text-[var(--wh-text-muted)] mb-2 font-semibold">
        WE HACK 5.0 · REGISTRATION
      </p>
      <h1 className="text-2xl font-bold text-[var(--wh-text-heading)] mb-1">Team Registration</h1>
      <p className="text-sm text-[var(--wh-text-muted)] mb-8">
        Create a new team or join an existing one with your teammate's team code.
      </p>

      {/* ── Tab switcher ── */}
      <div className="flex mb-8 rounded-xl p-1 gap-1" style={{ background: "var(--wh-surface)" }}>
        {(["create", "join"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setMode(tab)}
            className="flex-1 text-sm font-semibold py-2.5 rounded-lg transition-all duration-200"
            style={{
              background: mode === tab ? "var(--wh-accent)" : "transparent",
              color: mode === tab ? "#fff" : "var(--wh-text-muted)",
              boxShadow: mode === tab ? "0 0 16px var(--wh-accent-glow)" : "none",
            }}
          >
            {tab === "create" ? "🚀 Create a Team" : "🔗 Join with Code"}
          </button>
        ))}
      </div>

      {error && (
        <div className="mb-5 px-4 py-3 rounded-xl border text-sm" style={{ background: "rgba(248,113,113,0.08)", borderColor: "rgba(248,113,113,0.25)", color: "var(--wh-error)" }}>
          {error}
        </div>
      )}

      {mode === "create" ? (
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-[var(--wh-text-muted)] block mb-1.5">
              Team Name *
            </label>
            <input
              className="wh-input"
              placeholder="e.g. Neural Ninjas"
              required
              value={createForm.name}
              onChange={(e) => cf("name", e.target.value)}
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-[var(--wh-text-muted)] block mb-1.5">
              College / Institution *
            </label>
            <input
              className="wh-input"
              placeholder="e.g. IIT Bombay"
              required
              value={createForm.college}
              onChange={(e) => cf("college", e.target.value)}
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-[var(--wh-text-muted)] block mb-1.5">
              Track
            </label>
            <select
              className="wh-input"
              value={createForm.track}
              onChange={(e) => cf("track", e.target.value)}
              style={{ appearance: "none", cursor: "pointer" }}
            >
              <option value="">Select a track (optional)</option>
              {TRACKS.map((t) => (
                <option key={t} value={t} style={{ background: "var(--wh-surface-2)" }}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-[var(--wh-text-muted)] block mb-1.5">
              Idea Title
            </label>
            <input
              className="wh-input"
              placeholder="One-line title of your project"
              value={createForm.ideaTitle}
              onChange={(e) => cf("ideaTitle", e.target.value)}
            />
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-[var(--wh-text-muted)] block mb-1.5">
              Idea Description
            </label>
            <textarea
              className="wh-input resize-none"
              placeholder="What problem are you solving? How does your solution work?"
              rows={4}
              value={createForm.ideaDescription}
              onChange={(e) => cf("ideaDescription", e.target.value)}
            />
          </div>

          {/* Hardware toggle */}
          <label className="flex items-center gap-3 cursor-pointer group">
            <div
              className="relative w-10 h-5 rounded-full transition-colors duration-200 flex-shrink-0"
              style={{ background: createForm.hardwareNeeded ? "var(--wh-accent)" : "var(--wh-surface-2)", border: "1px solid var(--wh-border-muted)" }}
              onClick={() => cf("hardwareNeeded", !createForm.hardwareNeeded)}
            >
              <div
                className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-200"
                style={{ transform: createForm.hardwareNeeded ? "translateX(20px)" : "translateX(0)" }}
              />
            </div>
            <input
              type="checkbox"
              className="sr-only"
              checked={createForm.hardwareNeeded}
              onChange={(e) => cf("hardwareNeeded", e.target.checked)}
            />
            <span className="text-sm text-[var(--wh-text-muted)] group-hover:text-[var(--wh-text)] transition-colors">
              We need hardware for this project
            </span>
          </label>

          <div className="pt-2">
            <button type="submit" disabled={submitting} className="wh-btn w-full justify-center py-3">
              {submitting ? "Creating…" : "Create Team ↗"}
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleJoin} className="space-y-5">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-[var(--wh-text-muted)] block mb-1.5">
              Team Code
            </label>
            <input
              className="wh-input font-mono text-center text-lg tracking-widest uppercase"
              placeholder="XXXXXX"
              required
              value={joinCode}
              onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
              maxLength={10}
            />
            <p className="text-xs text-[var(--wh-text-muted)] mt-2 text-center">
              Get this code from your team leader
            </p>
          </div>

          <button type="submit" disabled={submitting} className="wh-btn w-full justify-center py-3">
            {submitting ? "Joining…" : "Join Team →"}
          </button>
        </form>
      )}
    </div>
  );
}
