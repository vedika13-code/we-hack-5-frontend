import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { PageShell } from "../components/PageShell";

const CHECKLIST_ITEMS = [
  { key: "readme", label: "README with setup instructions" },
  { key: "demo", label: "Demo video or live link" },
  { key: "sourceCode", label: "Source code pushed" },
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

  if (loading) return (
    <PageShell title="Project Submission">
      <div className="admin-card p-12 text-center text-[var(--admin-muted)] font-mono animate-pulse uppercase tracking-widest">
        Loading submission...
      </div>
    </PageShell>
  );

  return (
    <PageShell 
      title="Project Submission" 
      subtitle="Submit your project link or file. You can resubmit as many times as needed until the deadline."
    >
      {error && (
        <div className="bg-[rgba(255,90,90,0.1)] border border-[var(--admin-pink)] text-[var(--admin-pink)] p-4 rounded mb-8 font-mono text-sm">
          {error}
        </div>
      )}

      {submission && (
        <div className="flex items-center gap-4 mb-8">
          <div className="text-xs uppercase tracking-widest font-mono bg-[var(--admin-ink)] text-[var(--admin-muted)] border border-[var(--admin-line)] px-3 py-1 rounded">
            Version {submission.version}
          </div>
          <div className={`text-xs uppercase tracking-widest font-bold px-3 py-1 rounded ${
            submission.status === 'FINAL' ? 'bg-[rgba(220,255,145,0.1)] text-[var(--admin-lime)]' : 'bg-[var(--admin-ink)] text-[var(--admin-paper)]'
          }`}>
            {submission.status || 'DRAFT'}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="admin-card p-6 md:p-8">
            <h2 className="text-sm font-bold font-mono tracking-widest text-[var(--admin-accent)] uppercase mb-6 pb-4 border-b border-[var(--admin-line)]">
              Submit Link
            </h2>
            <form onSubmit={handleLinkSubmit} className="flex flex-col sm:flex-row gap-4">
              <input
                className="admin-input flex-1"
                placeholder="https://github.com/your-team/project"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                required
              />
              <button className="admin-primary-action whitespace-nowrap">
                Save Link
              </button>
            </form>
            {submission?.projectLink && (
              <div className="mt-6 p-4 rounded bg-[var(--admin-ink-soft)] border border-[var(--admin-line)] flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-[var(--admin-muted)] mb-1">Current Link</p>
                  <a href={submission.projectLink} target="_blank" rel="noreferrer" className="text-sm text-[var(--admin-paper)] truncate block max-w-sm hover:text-[var(--admin-lime)] transition-colors">
                    {submission.projectLink}
                  </a>
                </div>
              </div>
            )}
          </div>

          <div className="admin-card p-6 md:p-8">
            <h2 className="text-sm font-bold font-mono tracking-widest text-[var(--admin-accent)] uppercase mb-6 pb-4 border-b border-[var(--admin-line)]">
              Upload File
            </h2>
            <div className="flex flex-col gap-4">
              <input 
                type="file" 
                accept=".pdf,.ppt,.pptx,.zip" 
                onChange={handleFileChange} 
                disabled={uploading}
                className="block w-full text-sm text-[var(--admin-paper-dim)]
                  file:mr-4 file:py-2 file:px-4
                  file:rounded file:border-0
                  file:text-xs file:uppercase file:tracking-widest file:font-bold
                  file:bg-[var(--admin-accent)] file:text-[var(--admin-ink)]
                  hover:file:bg-[var(--admin-paper)] hover:file:cursor-pointer transition-colors"
              />
              {uploading && <p className="text-sm font-mono text-[var(--admin-muted)] animate-pulse mt-2">Uploading...</p>}
              
              {submission?.fileUrl && !uploading && (
                <div className="mt-4 p-4 rounded bg-[var(--admin-ink-soft)] border border-[var(--admin-line)] flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-[var(--admin-muted)] mb-1">Current File</p>
                    <p className="text-sm text-[var(--admin-paper)] font-mono">{submission.fileType}</p>
                  </div>
                  {submission.downloadUrl && (
                    <a href={submission.downloadUrl} target="_blank" rel="noreferrer" className="text-xs uppercase tracking-widest font-bold text-[var(--admin-pink)] hover:text-[var(--admin-paper)] underline underline-offset-4">
                      Download
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <div className="admin-card p-6 md:p-8">
            <h2 className="text-sm font-bold font-mono tracking-widest text-[var(--admin-accent)] uppercase mb-6 pb-4 border-b border-[var(--admin-line)]">
              Checklist
            </h2>
            <div className="flex flex-col gap-4">
              {CHECKLIST_ITEMS.map((item) => (
                <label key={item.key} className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative flex items-start pt-1">
                    <input
                      type="checkbox"
                      className="peer sr-only"
                      checked={!!submission?.checklist?.[item.key]}
                      onChange={() => toggleChecklistItem(item.key)}
                    />
                    <div className="w-5 h-5 rounded border border-[var(--admin-line)] bg-[var(--admin-ink-soft)] peer-checked:bg-[var(--admin-lime)] peer-checked:border-[var(--admin-lime)] transition-colors flex items-center justify-center">
                      <svg className="w-3 h-3 text-[var(--admin-ink)] opacity-0 peer-checked:opacity-100 transition-opacity" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <span className="text-sm text-[var(--admin-paper-dim)] group-hover:text-[var(--admin-paper)] transition-colors leading-relaxed">
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}