import { Link, useNavigate } from "react-router-dom";
import { NotificationBell } from "./NotificationBell";
import { Dropdown } from "./Dropdown";
import { useAuth } from "../context/AuthContext";

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  const isAdmin = user?.role === "ADMIN" || user?.role === "SUPER_ADMIN";
  const isSuperAdmin = user?.role === "SUPER_ADMIN";

  const linkClass = "text-[#8f8b82] hover:text-[#dcff91] transition-colors";

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-[#0a0b0a] border-b border-[#f2eee526] text-sm font-ui">
      <Link to="/" className="font-display uppercase font-bold tracking-tight text-lg text-[#f2eee5]">
        WE HACK 5.0
      </Link>

      <div className="flex items-center gap-5">
        <Link to="/problem-statements" className={linkClass}>Problem Statements</Link>
        <Link to="/leaderboard" className={linkClass}>Leaderboard</Link>
        <Link to="/sponsors" className={linkClass}>Sponsors</Link>

        <Dropdown label="Explore">
          <Link to="/about" className="block px-4 py-2 text-[#d4cec2] hover:bg-[#171814] hover:text-[#dcff91]">About</Link>
          <Link to="/timeline" className="block px-4 py-2 text-[#d4cec2] hover:bg-[#171814] hover:text-[#dcff91]">Timeline</Link>
          <Link to="/judges" className="block px-4 py-2 text-[#d4cec2] hover:bg-[#171814] hover:text-[#dcff91]">Judges</Link>
          <Link to="/mentors" className="block px-4 py-2 text-[#d4cec2] hover:bg-[#171814] hover:text-[#dcff91]">Mentors</Link>
        </Dropdown>

        {user && !isAdmin && !user.teamId && (
          <Link to="/registration" className="font-bold text-[#ee9ab6] hover:text-[#dcff91] transition-colors">
            Register Team
          </Link>
        )}

        {user && !isAdmin && (
          <>
            <Link to="/team" className={linkClass}>Team</Link>
            <Link to="/submission" className={linkClass}>Submission</Link>
          </>
        )}

        {isAdmin && (
          <Dropdown label="Admin">
            <Link to="/admin" className="block px-4 py-2 text-[#d4cec2] hover:bg-[#171814] hover:text-[#dcff91]">Dashboard</Link>
            <Link to="/admin/teams" className="block px-4 py-2 text-[#d4cec2] hover:bg-[#171814] hover:text-[#dcff91]">Teams</Link>
            <Link to="/admin/participants" className="block px-4 py-2 text-[#d4cec2] hover:bg-[#171814] hover:text-[#dcff91]">Participants</Link>
            <Link to="/admin/submissions" className="block px-4 py-2 text-[#d4cec2] hover:bg-[#171814] hover:text-[#dcff91]">Submissions</Link>
            <Link to="/admin/announcements" className="block px-4 py-2 text-[#d4cec2] hover:bg-[#171814] hover:text-[#dcff91]">Announcements</Link>
            <Link to="/admin/deadlines" className="block px-4 py-2 text-[#d4cec2] hover:bg-[#171814] hover:text-[#dcff91]">Deadlines</Link>
            <Link to="/admin/sponsors" className="block px-4 py-2 text-[#d4cec2] hover:bg-[#171814] hover:text-[#dcff91]">Sponsors</Link>
            <Link to="/admin/judges" className="block px-4 py-2 text-[#d4cec2] hover:bg-[#171814] hover:text-[#dcff91]">Judges</Link>
            <Link to="/admin/mentors" className="block px-4 py-2 text-[#d4cec2] hover:bg-[#171814] hover:text-[#dcff91]">Mentors</Link>
            {isSuperAdmin && (
              <>
                <div className="border-t border-[#f2eee526] my-1" />
                <Link to="/admin/manage-admins" className="block px-4 py-2 text-[#dcff91] font-bold hover:bg-[#171814]">
                  Manage Admins
                </Link>
              </>
            )}
          </Dropdown>
        )}

        {user && <NotificationBell />}

        {user ? (
          <>
            <Link to={isAdmin ? "/admin" : "/dashboard"} className={linkClass}>Dashboard</Link>
            <button onClick={handleLogout} className="text-[#8f8b82] hover:text-[#ee9ab6] transition-colors">
              Log out
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="bg-[#dcff91] text-[#0a0b0a] font-bold uppercase text-xs tracking-wider px-4 py-2 hover:opacity-90 transition-opacity"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}