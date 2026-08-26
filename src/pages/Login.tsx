import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../lib/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = await api.login(form);
      await refreshUser();
      if (user.role === "ADMIN" || user.role === "SUPER_ADMIN") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Card */}
        <div className="wh-card-accent">
          {/* Header */}
          <div className="mb-8">
            <p className="text-xs tracking-widest uppercase font-semibold mb-2"
               style={{ color: "var(--wh-accent)" }}>
              WE HACK 5.0
            </p>
            <h1 className="text-2xl font-bold" style={{ color: "var(--wh-text-heading)" }}>
              Log in
            </h1>
            <p className="text-sm mt-1" style={{ color: "var(--wh-text-muted)" }}>
              Welcome back, hacker 👾
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
                     style={{ color: "var(--wh-text-muted)" }}>
                Email
              </label>
              <input
                className="wh-input"
                type="email"
                placeholder="you@college.edu"
                autoComplete="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
                     style={{ color: "var(--wh-text-muted)" }}>
                Password
              </label>
              <input
                className="wh-input"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            {error && (
              <div className="px-3 py-2.5 rounded-lg border text-sm"
                   style={{ background: "rgba(248,113,113,0.08)", borderColor: "rgba(248,113,113,0.25)", color: "var(--wh-error)" }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="wh-btn w-full justify-center py-2.5 mt-2"
            >
              {loading ? "Logging in…" : "Log in ↗"}
            </button>
          </form>

          {/* Footer links */}
          <div className="mt-5 pt-5 border-t space-y-2" style={{ borderColor: "var(--wh-border-muted)" }}>
            <p className="text-sm" style={{ color: "var(--wh-text-muted)" }}>
              <Link
                to="/forgot-password"
                className="hover:underline transition-colors"
                style={{ color: "var(--wh-text-muted)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--wh-accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--wh-text-muted)")}
              >
                Forgot password?
              </Link>
            </p>
            <p className="text-sm" style={{ color: "var(--wh-text-muted)" }}>
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold transition-colors"
                style={{ color: "var(--wh-accent)" }}
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}