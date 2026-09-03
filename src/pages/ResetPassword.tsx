import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { api } from "../lib/api";

function AuthCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="wh-card-accent">
          <div className="mb-8">
            <p className="text-xs tracking-widest uppercase font-semibold mb-2" style={{ color: "var(--wh-accent)" }}>
              WE HACK 5.0
            </p>
            <h1 className="text-2xl font-bold font-display uppercase" style={{ color: "var(--wh-text-heading)" }}>
              {title}
            </h1>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }
    try {
      await api.resetPassword(token, password);
      setDone(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err: any) {
      setError(err.message);
    }
  }

  if (!token) {
    return (
      <AuthCard title="Invalid link">
        <p className="text-sm mb-4" style={{ color: "var(--wh-text-muted)" }}>
          This reset link is missing or malformed.
        </p>
        <Link to="/forgot-password" className="font-semibold text-sm" style={{ color: "var(--wh-accent)" }}>
          Request a new one
        </Link>
      </AuthCard>
    );
  }

  if (done) {
    return (
      <AuthCard title="Password reset">
        <p className="text-sm" style={{ color: "var(--wh-text-muted)" }}>
          Redirecting you to log in…
        </p>
      </AuthCard>
    );
  }

  return (
    <AuthCard title="Set a new password">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
            style={{ color: "var(--wh-text-muted)" }}
          >
            New password
          </label>
          <input
            className="wh-input"
            placeholder="At least 8 characters"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label
            className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
            style={{ color: "var(--wh-text-muted)" }}
          >
            Confirm new password
          </label>
          <input
            className="wh-input"
            placeholder="Re-enter password"
            type="password"
            required
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>

        {error && (
          <div
            className="rounded-lg border px-3 py-2.5 text-sm"
            style={{
              background: "rgba(248,113,113,0.08)",
              borderColor: "rgba(248,113,113,0.25)",
              color: "var(--wh-error)",
            }}
          >
            {error}
          </div>
        )}

        <button type="submit" className="wh-btn w-full justify-center py-2.5 mt-2">
          Reset password
        </button>
      </form>
    </AuthCard>
  );
}
