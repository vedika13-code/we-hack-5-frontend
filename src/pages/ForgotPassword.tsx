import { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../lib/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      await api.forgotPassword(email);
      setSent(true);
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="wh-card-accent">
          <div className="mb-8">
            <p className="text-xs tracking-widest uppercase font-semibold mb-2" style={{ color: "var(--wh-accent)" }}>
              WE HACK 5.0
            </p>
            <h1 className="text-2xl font-bold font-display uppercase" style={{ color: "var(--wh-text-heading)" }}>
              {sent ? "Check your email" : "Forgot password"}
            </h1>
          </div>

          {sent ? (
            <p className="text-sm leading-relaxed" style={{ color: "var(--wh-text-muted)" }}>
              If an account exists for <strong style={{ color: "var(--wh-text)" }}>{email}</strong>, a password reset
              link has been sent. It expires in 1 hour.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
                  style={{ color: "var(--wh-text-muted)" }}
                >
                  Email
                </label>
                <input
                  className="wh-input"
                  placeholder="you@college.edu"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                Send reset link
              </button>
            </form>
          )}

          <div className="mt-5 pt-5 border-t" style={{ borderColor: "var(--wh-border-muted)" }}>
            <p className="text-sm" style={{ color: "var(--wh-text-muted)" }}>
              <Link to="/login" className="font-semibold" style={{ color: "var(--wh-accent)" }}>
                Back to log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
