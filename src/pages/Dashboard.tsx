import { useEffect, useState } from "react";
import { api } from "../lib/api";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    api.me().then(setUser).catch(() => {});
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {user ? (
        <div className="space-y-2 text-slate-700">
          <p>Welcome, {user.fullName}.</p>
          <p>Registration status: {user.team?.registrationStatus ?? "No team yet"}</p>
        </div>
      ) : (
        <p className="text-slate-500">Loading…</p>
      )}
    </div>
  );
}
