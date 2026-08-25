import { useState } from "react";
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

  if (sent) {
    return (
      <div className="max-w-sm mx-auto px-6 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Check your email</h1>
        <p className="text-slate-600">
          If an account exists for <strong>{email}</strong>, a password reset link has been sent. It expires in 1 hour.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-sm mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold mb-6">Forgot password</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border rounded px-3 py-2"
          placeholder="Email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button className="w-full bg-slate-900 text-white rounded px-3 py-2">Send reset link</button>
      </form>
    </div>
  );
}