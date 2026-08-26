import { useEffect, useState } from "react";
import { api } from "../lib/api";

const CHECKLIST_ITEMS = [
  { key: "readme", label: "README with setup instructions", icon: "📄" },
  { key: "demo", label: "Demo video or live link", icon: "🎬" },
  { key: "sourceCode", label: "Source code pushed", icon: "💻" },
];

export default function Submission() {
  const [submission, setSubmission] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [link, setLink] = useState("");
  const [uploading, setUploading] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const s = await api.getMySubmission();
      setSubmission(s.exists === false ? null : s);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleLinkSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      await api.submitLink(link);
      await load();
      setLink("");
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setError("");
    setUploading(true);
    try {
      await api.uploadSubmissionFile(file);
      await load();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  }

  async function toggleChecklistItem(key: string) {
    const current = submission?.checklist ?? {};
    const next = { ...current, [key]: !current[key] };
    try {
      await api.updateChecklist(next);
      await load();
    } catch (err: any) {
      setError(err.message);
    }
  }

  if (loading) {
    return (
      <div className="wh-page max-w-2xl mx-auto space-y-4 animate-pulse">
        <div className="h-8 w-52 rounded-lg bg-wh-surface2" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="wh-card h-28" />
        ))}
      </div>
    );
  }

  const checkedCount = CHECKLIST_ITEMS.filter((i) => submission?.checklist?.[i.key]).length;

  return (
    <div className="wh-page max-w-2xl mx-auto">
      <p className="text-xs tracking-widest uppercase text-[var(--wh-text-muted)] mb-2 font-semibold">
        WE HACK 5.0 · SUBMISSION
      </p>
      <h1 className="text-2xl font-bold text-[var(--wh-text-heading)] mb-1">Project Submission</h1>
      <p className="text-sm text-[var(--wh-text-muted)] mb-8">
        Submit a file (PDF, PPT, or ZIP) or a repository link. You can resubmit anytime before the deadline.
      </p>

      {error && (
        <div className="mb-6 px-4 py-3 rounded-xl border text-sm" style={{ background: "rgba(248,113,113,0.08)", borderColor: "rgba(248,113,113,0.25)", color: "var(--wh-error)" }}>
          {error}
        </div>
      )}

      {/* ── Checklist ── */}
      <div className="wh-card mb-5">
        <div className="flex items-center justify-between mb-4">
          <p className="wh-section-label mb-0">✅ Submission Checklist</p>
          <span
            className="text-xs font-mono font-bold"
            style={{ color: checkedCount === 3 ? "var(--wh-success)" : "var(--wh-text-muted)" }}
          >
            {checkedCount}/{CHECKLIST_ITEMS.length} done
          </span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 rounded-full mb-5 overflow-hidden" style={{ background: "var(--wh-surface-2)" }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${(checkedCount / CHECKLIST_ITEMS.length) * 100}%`,
              background: checkedCount === 3 ? "var(--wh-success)" : "var(--wh-accent)",
            }}
          />
        </div>

        <div className="space-y-3">
          {CHECKLIST_ITEMS.map((item) => {
            const checked = !!submission?.checklist?.[item.key];
            return (
              <label
                key={item.key}
                className="flex items-center gap-3 cursor-pointer group py-1"
              >
                {/* Custom checkbox */}
                <div
                  className="w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all duration-150"
                  style={{
                    borderColor: checked ? "var(--wh-accent)" : "var(--wh-border-muted)",
                    background: checked ? "var(--wh-accent)" : "transparent",
                  }}
                  onClick={() => toggleChecklistItem(item.key)}
                >
                  {checked && (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={checked}
                  onChange={() => toggleChecklistItem(item.key)}
                />
                <span className="text-sm flex items-center gap-2">
                  <span>{item.icon}</span>
                  <span
                    className="transition-colors"
                    style={{ color: checked ? "var(--wh-text-muted)" : "var(--wh-text)", textDecoration: checked ? "line-through" : "none" }}
                  >
                    {item.label}
                  </span>
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* ── Submit a link ── */}
      <div className="wh-card mb-5">
        <p className="wh-section-label">🔗 Submit a Link</p>
        <form onSubmit={handleLinkSubmit} className="flex gap-2">
          <input
            className="wh-input flex-1"
            placeholder="https://github.com/your-team/project"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <button type="submit" className="wh-btn flex-shrink-0">Submit</button>
        </form>
        {submission?.projectLink && (
          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs text-[var(--wh-text-muted)]">Current:</span>
            <a
              href={submission.projectLink}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-mono text-[var(--wh-accent)] hover:underline truncate"
            >
              {submission.projectLink}
            </a>
          </div>
        )}
      </div>

      {/* ── Upload a file ── */}
      <div className="wh-card mb-6">
        <p className="wh-section-label">📁 Upload a File</p>
        <label
          className="flex flex-col items-center gap-3 border-2 border-dashed rounded-xl p-8 cursor-pointer transition-colors hover:border-[var(--wh-accent)]"
          style={{ borderColor: "var(--wh-border-muted)" }}
        >
          <span className="text-3xl">{uploading ? "⏳" : "📂"}</span>
          <div className="text-center">
            <p className="text-sm font-medium text-[var(--wh-text)]">
              {uploading ? "Uploading…" : "Click to upload or drag & drop"}
            </p>
            <p className="text-xs text-[var(--wh-text-muted)] mt-1">PDF, PPT, PPTX, ZIP accepted</p>
          </div>
          <input
            type="file"
            accept=".pdf,.ppt,.pptx,.zip"
            className="sr-only"
            onChange={handleFileChange}
            disabled={uploading}
          />
        </label>
        {submission?.fileUrl && !uploading && (
          <div className="mt-3 flex items-center gap-3 px-3 py-2.5 rounded-lg" style={{ background: "var(--wh-surface-2)" }}>
            <span className="text-lg">📎</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-[var(--wh-text-muted)]">Uploaded file</p>
              <p className="text-sm font-medium text-[var(--wh-text)] font-mono">{submission.fileType?.toUpperCase()}</p>
            </div>
            {submission.downloadUrl && (
              <a
                href={submission.downloadUrl}
                target="_blank"
                rel="noreferrer"
                className="wh-btn wh-btn-ghost text-xs px-3 py-1.5"
              >
                Download
              </a>
            )}
          </div>
        )}
      </div>

      {/* ── Footer meta ── */}
      {submission && (
        <div className="flex items-center gap-3 flex-wrap">
          <span
            className="wh-badge"
            style={{ background: "var(--wh-surface-2)", color: "var(--wh-text-muted)", border: "1px solid var(--wh-border-muted)" }}
          >
            Version {submission.version}
          </span>
          <span
            className={`wh-badge ${
              submission.status === "APPROVED"
                ? "wh-badge-green"
                : submission.status === "REJECTED"
                ? "wh-badge-red"
                : "wh-badge-yellow"
            }`}
          >
            {submission.status}
          </span>
        </div>
      )}
    </div>
  );
}