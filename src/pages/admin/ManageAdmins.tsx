import { useEffect, useState } from "react";
import { api } from "../../lib/api";

export default function ManageAdmins() {
  const [admins, setAdmins] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [currentUserId, setCurrentUserId] = useState("");

  async function load() {
    try {
      const [adminList, me] = await Promise.all([api.getAdmins(), api.me()]);
      setAdmins(adminList);
      setCurrentUserId(me.id);
    } catch (err: any) {
      setError(err.message);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handlePromote(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    try {
      await api.promoteToAdmin(email);
      setEmail("");
      await load();
    } catch (err: any) {
      setError(err.message);
    }
  }

  async function handleDemote(id: string) {
    setError("");
    try {
      await api.demoteAdmin(id);
      await load();
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-2">Manage Admins</h1>
      <p className="text-slate-600 text-sm mb-6">
        Only super admins can promote or demote other admins. This is separate from the general admin permissions.
      </p>

      {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

      <form onSubmit={handlePromote} className="flex gap-2 mb-6">
        <input
          className="flex-1 border rounded px-3 py-2"
          placeholder="Email of an existing, registered user"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className="bg-slate-900 text-white rounded px-4 py-2">Make admin</button>
      </form>

      <div className="border rounded divide-y">
        {admins.length === 0 && <p className="p-4 text-sm text-slate-500">No admins yet.</p>}
        {admins.map((a) => (
          <div key={a.id} className="flex items-center justify-between p-4">
            <div>
              <p className="font-medium">{a.fullName || a.email}</p>
              <p className="text-sm text-slate-500">
                {a.email} · {a.role}
              </p>
            </div>
            {a.role === "ADMIN" && a.id !== currentUserId && (
              <button onClick={() => handleDemote(a.id)} className="text-red-600 text-sm underline">
                Remove admin access
              </button>
            )}
            {a.role === "SUPER_ADMIN" && <span className="text-xs text-slate-400">Super admin</span>}
          </div>
        ))}
      </div>
    </div>
  );
}