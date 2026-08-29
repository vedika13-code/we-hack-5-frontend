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
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 bg-[#0a0b0a]">
      <div className="w-full max-w-sm">
        <div className="bg-[#171814] border border-[#f2eee526] p-6">
          <div className="mb-8">
            <p className="text-xs tracking-widest uppercase font-extrabold mb-2 text-[#dcff91]">
              WE HACK 5.0
            </p>
            <h1 className="font-display uppercase text-2xl font-bold text-[#f2eee5]">
              Log in
            </h1>
            <p className="text-sm mt-1 font-serif italic text-[#d4cec2]">
              Welcome back, hacker
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-[#8f8b82]">
                Email
              </label>
              <input
                className="w-full bg-[#0a0b0a] border border-[#f2eee526] px-3 py-2.5 text-[#f2eee5] outline-none focus:border-[#dcff91] transition-colors"
                type="email"
                placeholder="youremail@gmail.com"
                autoComplete="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 text-[#8f8b82]">
                Password
              </label>
              <input
                className="w-full bg-[#0a0b0a] border border-[#f2eee526] px-3 py-2.5 text-[#f2eee5] outline-none focus:border-[#dcff91] transition-colors"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            {error && (
              <div className="px-3 py-2.5 border text-sm" style={{ background: "rgba(238,154,182,0.08)", borderColor: "rgba(238,154,182,0.3)", color: "#ee9ab6" }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#dcff91] text-[#0a0b0a] font-bold uppercase text-xs tracking-wider py-3 mt-2 hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? "Logging in…" : "Log in →"}
            </button>
          </form>

          <div className="mt-5 pt-5 border-t border-[#f2eee526] space-y-2">
            <p className="text-sm text-[#8f8b82]">
              <Link to="/forgot-password" className="hover:text-[#dcff91] transition-colors">
                Forgot password?
              </Link>
            </p>
            <p className="text-sm text-[#8f8b82]">
              Don't have an account?{" "}
              <Link to="/signup" className="font-bold text-[#ee9ab6] hover:text-[#dcff91] transition-colors">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
