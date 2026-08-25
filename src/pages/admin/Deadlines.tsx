import { useEffect, useState } from "react";
import { api } from "../../lib/api";
import { AdminShell } from "./components/AdminShell";
import { AdminPageHeader } from "./components/AdminPageHeader";
import { ErrorState } from "./components/FeedbackStates";
import { StatusBadge } from "./components/StatusBadge";
import { ConfirmDialog } from "./components/ConfirmDialog";

const KEYS = [
  { key: "registration", label: "Registration" },
  { key: "team_editing", label: "Team Editing" },
  { key: "submission", label: "Submission" },
];

export default function AdminDeadlines() {
  const [deadlines, setDeadlines] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [drafts, setDrafts] = useState<Record<string, string>>({});

  const [confirmKey, setConfirmKey] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

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

  function handleTriggerSet(key: string) {
    if (!drafts[key]) return;
    setConfirmKey(key);
  }

  async function handleConfirmSet() {
    if (!confirmKey) return;
    setBusyId(confirmKey);
    setError("");
    const value = drafts[confirmKey];
    try {
      const existing = findDeadline(confirmKey);
      if (existing) {
        await api.extendDeadline(confirmKey, new Date(value).toISOString());
      } else {
        await api.setDeadline(confirmKey, new Date(value).toISOString());
      }
      await load();
      setDrafts((prev) => ({ ...prev, [confirmKey]: "" }));
      setConfirmKey(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setBusyId(null);
    }
  }

  return (
    <AdminShell>
      <AdminPageHeader
        title="Event Deadlines"
        description="Set and extend critical event phases."
      />

      {error && <ErrorState error={error} />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {KEYS.map(({ key, label }) => {
          const current = findDeadline(key);
          const activeDate = current ? new Date(current.extendedTo || current.dueAt) : null;
          const isExpired = activeDate ? activeDate.getTime() < Date.now() : false;

          return (
            <div key={key} className="admin-card flex flex-col justify-between">
              <div>
                <h3 className="text-xl mb-4 font-bold text-[var(--admin-paper)] flex items-center justify-between">
                  {label}
                  {activeDate && (
                    <StatusBadge
                      status={isExpired ? "Expired" : "Active"}
                      variant={isExpired ? "danger" : "success"}
                    />
                  )}
                </h3>
                <p className="text-[var(--admin-muted)] text-sm mb-6">
                  {activeDate
                    ? `${activeDate.toLocaleString()}${current.extendedTo ? " (Extended)" : ""}`
                    : "Not configured yet"}
                </p>
              </div>

              <div className="border-t border-[var(--admin-line)] pt-4 mt-auto">
                <label className="admin-label mb-2 text-[0.6rem]">{current ? "Extend Deadline" : "Set Initial Deadline"}</label>
                <div className="flex flex-col gap-3">
                  <input
                    type="datetime-local"
                    className="admin-input !text-sm !px-2 !py-2"
                    value={drafts[key] || ""}
                    onChange={(e) => setDrafts({ ...drafts, [key]: e.target.value })}
                  />
                  <button
                    onClick={() => handleTriggerSet(key)}
                    disabled={!drafts[key] || busyId === key}
                    className="admin-primary-action !h-10 !text-xs w-full"
                  >
                    {current ? "Apply Extension" : "Set Deadline"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <ConfirmDialog
        isOpen={!!confirmKey}
        title="Confirm Deadline Change"
        message={
          <>
            Are you sure you want to change the deadline for <strong>{KEYS.find(k => k.key === confirmKey)?.label}</strong>?
            This will immediately affect participants attempting to perform related actions.
          </>
        }
        onConfirm={handleConfirmSet}
        onCancel={() => setConfirmKey(null)}
        isBusy={!!busyId}
      />
    </AdminShell>
  );
}
