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
    <div className="max-w-sm mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold mb-6">Verify your email</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full border rounded px-3 py-2" placeholder="Email"
          value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full border rounded px-3 py-2" placeholder="6-digit OTP"
          value={otp} onChange={(e) => setOtp(e.target.value)} />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        {notice && <p className="text-green-700 text-sm">{notice}</p>}
        <button className="w-full bg-slate-900 text-white rounded px-3 py-2">Verify</button>
      </form>
      <div className="text-xs text-slate-500 mt-4 text-center space-y-2">
        <p>Didn't get the code? Check your spam/junk folder — it can take a minute to arrive.</p>
        <button
          type="button"
          onClick={handleResend}
          disabled={cooldown > 0}
          className="underline disabled:no-underline disabled:opacity-60"
        >
          {cooldown > 0 ? `Resend code in ${cooldown}s` : "Resend code"}
        </button>
      </div>
    </div>
  );
}
