import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { NotificationBell } from "./NotificationBell";
import { Dropdown } from "./Dropdown";
import { api } from "../lib/api";

export function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    api
      .me()
      .then(setUser)
      .catch(() => setUser(null));
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  async function handleLogout() {
    await api.logout();
    setUser(null);
    navigate("/");
  }

  const isAdmin = user?.role === "ADMIN" || user?.role === "SUPER_ADMIN";
  const isSuperAdmin = user?.role === "SUPER_ADMIN";

  return (
    <nav className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-slate-200 text-sm relative z-50 bg-white">
      <Link to="/" className="flex items-center gap-2">
        <img src="/brand/wehack-logo.webp" alt="WE HACK 5.0 Logo" className="h-8 object-contain" />
        <span className="font-bold text-lg hidden sm:inline-block">WE HACK 5.0</span>
      </Link>

      {/* Mobile menu button */}
      <button 
        className="md:hidden p-2 text-slate-600 focus:outline-none" 
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {mobileMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Desktop & Mobile Menu */}
      <div className={`${mobileMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row absolute md:static top-full left-0 w-full md:w-auto bg-white md:bg-transparent border-b md:border-b-0 border-slate-200 md:border-none p-4 md:p-0 items-start md:items-center gap-5 text-slate-600 shadow-lg md:shadow-none`}>
        <Dropdown label="Explore">
          <Link to="/about" className="block px-4 py-2 hover:bg-slate-50">About</Link>
          <Link to="/timeline" className="block px-4 py-2 hover:bg-slate-50">Timeline</Link>
          <Link to="/problem-statements" className="block px-4 py-2 hover:bg-slate-50">Problem Statements</Link>
          <Link to="/judges" className="block px-4 py-2 hover:bg-slate-50">Judges</Link>
          <Link to="/mentors" className="block px-4 py-2 hover:bg-slate-50">Mentors</Link>
          <Link to="/sponsors" className="block px-4 py-2 hover:bg-slate-50">Sponsors</Link>
          <Link to="/leaderboard" className="block px-4 py-2 hover:bg-slate-50">Leaderboard</Link>
        </Dropdown>

        {user && !isAdmin && !user.teamId && (
          <Link to="/registration" className="font-semibold text-slate-900">Register Team</Link>
        )}

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
          <div className="flex items-center gap-4">
            <Link to={isAdmin ? "/admin" : "/dashboard"}>Dashboard</Link>
            <button onClick={handleLogout} className="text-slate-500">Log out</button>
          </div>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}