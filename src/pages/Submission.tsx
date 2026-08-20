import { useEffect, useState } from "react";
import { api } from "../lib/api";

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

  if (loading) return <div className="p-8 text-center text-slate-500">Loading…</div>;

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-2">Project Submission</h1>
      <p className="text-slate-600 mb-6">
        Submit a file (PDF, PPT, or ZIP) or a link. You can resubmit as many times as needed until the deadline.
      </p>

      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

      <div className="border rounded p-4 mb-6">
        <h2 className="font-semibold mb-3">Checklist</h2>
        <div className="space-y-2">
          {CHECKLIST_ITEMS.map((item) => (
            <label key={item.key} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={!!submission?.checklist?.[item.key]}
                onChange={() => toggleChecklistItem(item.key)}
              />
              {item.label}
            </label>
          ))}
        </div>
      </div>

      <div className="border rounded p-4 mb-6">
        <h2 className="font-semibold mb-3">Submit a link</h2>
        <form onSubmit={handleLinkSubmit} className="flex gap-2">
          <input
            className="flex-1 border rounded px-3 py-2"
            placeholder="https://github.com/your-team/project"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <button className="bg-slate-900 text-white rounded px-4 py-2">Submit</button>
        </form>
        {submission?.projectLink && (
          <p className="text-sm text-slate-500 mt-2">
            Current link:{" "}
            <a href={submission.projectLink} target="_blank" rel="noreferrer" className="underline">
              {submission.projectLink}
            </a>
          </p>
        )}
      </div>

      <div className="border rounded p-4">
        <h2 className="font-semibold mb-3">Upload a file</h2>
        <input type="file" accept=".pdf,.ppt,.pptx,.zip" onChange={handleFileChange} disabled={uploading} />
        {uploading && <p className="text-sm text-slate-500 mt-2">Uploading…</p>}
        {submission?.fileUrl && !uploading && (
          <p className="text-sm text-slate-500 mt-2">
            File uploaded ({submission.fileType}).{" "}
            {submission.downloadUrl && (
              <a href={submission.downloadUrl} target="_blank" rel="noreferrer" className="underline">
                Download
              </a>
            )}
          </p>
        )}
      </div>

      {submission && (
        <p className="text-sm text-slate-500 mt-6">
          Version {submission.version} · Status: {submission.status}
        </p>
      )}
    </div>
  );
}