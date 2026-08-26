import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../lib/api";

export default function Signup() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.register(form);
      navigate("/verify-email", { state: { email: form.email } });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="wh-card-accent">
          <div className="mb-8">
            <p
              className="text-xs tracking-widest uppercase font-semibold mb-2"
              style={{ color: "var(--wh-accent)" }}
            >
              WE HACK 5.0
            </p>
            <h1
              className="text-2xl font-bold"
              style={{ color: "var(--wh-text-heading)" }}
            >
              Create account
            </h1>
            <p className="text-sm mt-1" style={{ color: "var(--wh-text-muted)" }}>
              Build your team. Ship something brilliant. ⚡
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
                style={{ color: "var(--wh-text-muted)" }}
              >
                Full name
              </label>
              <input
                required
                className="wh-input"
                placeholder="Ada Lovelace"
                autoComplete="name"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              />
            </div>

            <div>
              <label
                className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
                style={{ color: "var(--wh-text-muted)" }}
              >
                Email
              </label>
              <input
                required
                className="wh-input"
                type="email"
                placeholder="you@college.edu"
                autoComplete="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div>
              <label
                className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
                style={{ color: "var(--wh-text-muted)" }}
              >
                Password
              </label>
              <input
                required
                minLength={8}
                className="wh-input"
                type="password"
                placeholder="At least 8 characters"
                autoComplete="new-password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
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

            <button
              type="submit"
              disabled={loading}
              className="wh-btn w-full justify-center py-2.5 mt-2"
            >
              {loading ? "Creating account…" : "Create account ↗"}
            </button>
          </form>

          <div
            className="mt-5 pt-5 border-t"
            style={{ borderColor: "var(--wh-border-muted)" }}
          >
            <p className="text-sm" style={{ color: "var(--wh-text-muted)" }}>
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold"
                style={{ color: "var(--wh-accent)" }}
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}