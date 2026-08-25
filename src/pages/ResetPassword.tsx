import { useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { api } from "../lib/api";

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
      <div className="max-w-sm mx-auto px-6 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Invalid link</h1>
        <p className="text-slate-600 mb-4">This reset link is missing or malformed.</p>
        <Link to="/forgot-password" className="underline">Request a new one</Link>
      </div>
    );
  }

  if (done) {
    return (
      <div className="max-w-sm mx-auto px-6 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Password reset</h1>
        <p className="text-slate-600">Redirecting you to login…</p>
      </div>
    );
  }

  return (
    <div className="max-w-sm mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold mb-6">Set a new password</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border rounded px-3 py-2"
          placeholder="New password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          className="w-full border rounded px-3 py-2"
          placeholder="Confirm new password"
          type="password"
          required
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button className="w-full bg-slate-900 text-white rounded px-3 py-2">Reset password</button>
      </form>
    </div>
  );
}