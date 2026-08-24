import { useEffect, useState } from "react";
import { api } from "../../lib/api";

const KEYS = [
  { key: "registration", label: "Registration" },
  { key: "team_editing", label: "Team Editing" },
  { key: "submission", label: "Submission" },
];

export default function AdminDeadlines() {
  const [deadlines, setDeadlines] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [drafts, setDrafts] = useState<Record<string, string>>({});

  async function load() {
    try {
      setDeadlines(await api.getDeadlines());
    } catch (err: any) {
      setError(err.message);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function findDeadline(key: string) {
    return deadlines.find((d) => d.key === key);
  }

  async function handleSet(key: string) {
    setError("");
    const value = drafts[key];
    if (!value) return;
    try {
      await api.setDeadline(key, new Date(value).toISOString());
      await load();
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-6">Manage Deadlines</h1>

      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

      <div className="space-y-4">
        {KEYS.map(({ key, label }) => {
          const current = findDeadline(key);
          return (
            <div key={key} className="border rounded p-4">
              <p className="font-semibold mb-1">{label}</p>
              <p className="text-sm text-slate-500 mb-3">
                {current
                  ? `Current: ${new Date(current.extendedTo || current.dueAt).toLocaleString()}${
                      current.extendedTo ? " (extended)" : ""
                    }`
                  : "Not set yet"}
              </p>
              <div className="flex gap-2">
                <input
                  type="datetime-local"
                  className="border rounded px-3 py-2 text-sm"
                  value={drafts[key] || ""}
                  onChange={(e) => setDrafts({ ...drafts, [key]: e.target.value })}
                />
                <button onClick={() => handleSet(key)} className="bg-slate-900 text-white rounded px-4 py-2 text-sm">
                  Set
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}