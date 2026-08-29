import { useEffect, useState } from "react";
import { api } from "../lib/api";
import "../pages/admin/admin.css";

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

  if (loading) {
    return (
      <div className="admin-theme wh-page max-w-2xl mx-auto space-y-4 animate-pulse">
        <div className="h-8 w-52 rounded-lg bg-wh-surface2" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="admin-card h-28" />
        ))}
      </div>
    );
  }

  return (
    <div className="admin-theme wh-page max-w-2xl mx-auto">
      <p className="text-xs tracking-widest uppercase text-[var(--admin-muted)] mb-2 font-semibold">
        WE HACK 5.0 · SUBMISSION
      </p>
      <h1 className="text-2xl font-bold text-[var(--admin-paper)] mb-1">Project Submission</h1>
      <p className="text-sm text-[var(--admin-muted)] mb-8">
        Submit a file (PDF, PPT, or ZIP) or a repository link. You can resubmit anytime before the deadline.
      </p>

      {error && (
        <div className="mb-6 px-4 py-3 rounded-xl border text-sm" style={{ background: "rgba(248,113,113,0.08)", borderColor: "rgba(248,113,113,0.25)", color: "var(--admin-pink)" }}>
          {error}
        </div>
      )}

      <div className="admin-card mb-5">
        <p className="admin-label">Submit a Link</p>
        <form onSubmit={handleLinkSubmit} className="flex gap-2">
          <input
            className="wh-input flex-1"
            placeholder="https://github.com/your-team/project"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <button type="submit" className="admin-primary-action flex-shrink-0">Submit</button>
        </form>
        {submission?.projectLink && (
          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs text-[var(--admin-muted)]">Current:</span>
            <a href={submission.projectLink} target="_blank" rel="noreferrer" className="text-xs font-mono text-[var(--admin-lime)] hover:underline truncate">
              {submission.projectLink}
            </a>
          </div>
        )}
      </div>

      <div className="admin-card mb-6">
        <p className="admin-label">Upload a File</p>
        <label
          className="flex flex-col items-center gap-3 border-2 border-dashed rounded-xl p-8 cursor-pointer transition-colors hover:border-[var(--admin-lime)]"
          style={{ borderColor: "var(--admin-line)" }}
        >
          <span className="text-3xl">{uploading ? "Uploading" : "Upload"}</span>
          <div className="text-center">
            <p className="text-sm font-medium text-[var(--admin-paper)]">
              {uploading ? "Uploading…" : "Click to upload or drag & drop"}
            </p>
            <p className="text-xs text-[var(--admin-muted)] mt-1">PDF, PPT, PPTX, ZIP accepted</p>
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
          <div className="mt-3 flex items-center gap-3 px-3 py-2.5 rounded-lg" style={{ background: "var(--admin-ink)" }}>
            <span className="text-lg">File</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-[var(--admin-muted)]">Uploaded file</p>
              <p className="text-sm font-medium text-[var(--admin-paper)] font-mono">{submission.fileType?.toUpperCase()}</p>
            </div>
            {submission.downloadUrl && (
              <a href={submission.downloadUrl} target="_blank" rel="noreferrer" className="admin-primary-action admin-primary-action-ghost text-xs px-3 py-1.5">
                Download
              </a>
            )}
          </div>
        )}
      </div>

      {submission && (
        <div className="flex items-center gap-3 flex-wrap">
          <span
            className="admin-badge"
            style={{ background: "var(--admin-ink)", color: "var(--admin-muted)", border: "1px solid var(--admin-line)" }}
          >
            Version {submission.version}
          </span>
          <span
            className={`admin-badge ${
              submission.status === "APPROVED"
                ? "border-[var(--admin-lime)] text-[var(--admin-lime)]"
                : submission.status === "REJECTED"
                ? "border-[var(--admin-pink)] text-[var(--admin-pink)]"
                : "border-[var(--admin-gold)] text-[var(--admin-gold)]"
            }`}
          >
            {submission.status}
          </span>
        </div>
      )}
    </div>
  );
}
