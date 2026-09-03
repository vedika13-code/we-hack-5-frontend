import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import { useAuth } from "../context/AuthContext";

export default function VerifyEmail() {
  const location = useLocation() as { state?: { email?: string } };
  const [email, setEmail] = useState(location.state?.email || "");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const navigate = useNavigate();
  const { refreshUser } = useAuth();

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setNotice("");
    try {
      await api.verifyOtp({ email, otp });
      await refreshUser();
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function handleResend() {
    setError("");
    setNotice("");
    if (!email) {
      setError("Enter your email first.");
      return;
    }
    try {
      const res = await api.resendOtp(email);
      setNotice(res?.message || "If that account isn't verified yet, a new code is on its way.");
      setCooldown(30);
    } catch (err: any) {
      setError(err.message || "Couldn't resend the code. Try again in a moment.");
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
              Verify your email
            </h1>
          </div>

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
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label
                className="block text-xs font-semibold uppercase tracking-wider mb-1.5"
                style={{ color: "var(--wh-text-muted)" }}
              >
                6-digit code
              </label>
              <input
                className="wh-input tracking-[0.3em]"
                placeholder="000000"
                inputMode="numeric"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
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
            {notice && (
              <div
                className="rounded-lg border px-3 py-2.5 text-sm"
                style={{
                  background: "var(--wh-accent-dim)",
                  borderColor: "var(--wh-border)",
                  color: "var(--wh-accent)",
                }}
              >
                {notice}
              </div>
            )}

            <button type="submit" className="wh-btn w-full justify-center py-2.5 mt-2">
              Verify
            </button>
          </form>

          <div
            className="mt-5 pt-5 border-t text-sm space-y-2"
            style={{ borderColor: "var(--wh-border-muted)", color: "var(--wh-text-muted)" }}
          >
            <p>Didn't get the code? Check your spam/junk folder — it can take a minute.</p>
            <button
              type="button"
              onClick={handleResend}
              disabled={cooldown > 0}
              className="font-semibold disabled:opacity-60"
              style={{ color: "var(--wh-accent)" }}
            >
              {cooldown > 0 ? `Resend code in ${cooldown}s` : "Resend code"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
