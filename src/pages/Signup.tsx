import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api";

export default function Signup() {
  const [form, setForm] = useState({ email: "", password: "", fullName: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      await api.register(form);
      navigate("/verify-email", { state: { email: form.email } });
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div className="max-w-sm mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold mb-6">Create account</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full border rounded px-3 py-2" placeholder="Full name"
          value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
        <input className="w-full border rounded px-3 py-2" placeholder="Email" type="email"
          value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input className="w-full border rounded px-3 py-2" placeholder="Password" type="password"
          value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <button className="w-full bg-slate-900 text-white rounded px-3 py-2">Sign up</button>
      </form>
    </div>
  );
}
