import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NotificationBell } from "./NotificationBell";
import { Dropdown } from "./Dropdown";
import { api } from "../lib/api";

export function Navbar() {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .me()
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  async function handleLogout() {
    await api.logout();
    setUser(null);
    navigate("/");
  }

  const isAdmin = user?.role === "ADMIN" || user?.role === "SUPER_ADMIN";
  const isSuperAdmin = user?.role === "SUPER_ADMIN";

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-slate-200 text-sm">
      <Link to="/" className="font-bold text-lg">WE HACK 5.0</Link>

      <div className="flex items-center gap-5 text-slate-600">
        <Dropdown label="Explore">
          <Link to="/about" className="block px-4 py-2 hover:bg-slate-50">About</Link>
          <Link to="/timeline" className="block px-4 py-2 hover:bg-slate-50">Timeline</Link>
          <Link to="/problem-statements" className="block px-4 py-2 hover:bg-slate-50">Problem Statements</Link>
          <Link to="/judges" className="block px-4 py-2 hover:bg-slate-50">Judges</Link>
          <Link to="/mentors" className="block px-4 py-2 hover:bg-slate-50">Mentors</Link>
          <Link to="/leaderboard" className="block px-4 py-2 hover:bg-slate-50">Leaderboard</Link>
        </Dropdown>

        {user && !isAdmin && (
          <>
            <Link to="/team">Team</Link>
            <Link to="/submission">Submission</Link>
          </>
        )}

        {isAdmin && (
          <Dropdown label="Admin">
            <Link to="/admin" className="block px-4 py-2 hover:bg-slate-50">Dashboard</Link>
            <Link to="/admin/teams" className="block px-4 py-2 hover:bg-slate-50">Teams</Link>
            <Link to="/admin/participants" className="block px-4 py-2 hover:bg-slate-50">Participants</Link>
            <Link to="/admin/submissions" className="block px-4 py-2 hover:bg-slate-50">Submissions</Link>
            <Link to="/admin/announcements" className="block px-4 py-2 hover:bg-slate-50">Announcements</Link>
            <Link to="/admin/deadlines" className="block px-4 py-2 hover:bg-slate-50">Deadlines</Link>
            <Link to="/admin/sponsors" className="block px-4 py-2 hover:bg-slate-50">Sponsors</Link>
            <Link to="/admin/judges" className="block px-4 py-2 hover:bg-slate-50">Judges</Link>
            <Link to="/admin/mentors" className="block px-4 py-2 hover:bg-slate-50">Mentors</Link>
            {isSuperAdmin && (
              <>
                <div className="border-t my-1" />
                <Link to="/admin/manage-admins" className="block px-4 py-2 hover:bg-slate-50 font-medium">
                  Manage Admins
                </Link>
              </>
            )}
          </Dropdown>
        )}

        {user && <NotificationBell />}

        {user ? (
          <>
            <Link to={isAdmin ? "/admin" : "/dashboard"}>Dashboard</Link>
            <button onClick={handleLogout} className="text-slate-500">Log out</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}