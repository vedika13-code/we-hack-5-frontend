import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../lib/api";

export function ProtectedRoute({ roles }: { roles?: string[] }) {
  const [status, setStatus] = useState<"loading" | "ok" | "denied">("loading");

  useEffect(() => {
    api
      .me()
      .then((user) => setStatus(!roles || roles.includes(user.role) ? "ok" : "denied"))
      .catch(() => setStatus("denied"));
  }, [roles]);

  if (status === "loading") return <div className="p-8 text-center text-slate-500">Loading…</div>;
  if (status === "denied") return <Navigate to="/login" replace />;
  return <Outlet />;
}