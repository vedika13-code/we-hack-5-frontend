import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
      <Link to="/" className="font-bold text-lg">WE HACK 5.0</Link>
      <div className="flex gap-4 text-sm text-slate-600">
        <Link to="/about">About</Link>
        <Link to="/timeline">Timeline</Link>
        <Link to="/problem-statements">Problem Statements</Link>
        <Link to="/judges">Judges</Link>
        <Link to="/mentors">Mentors</Link>
        <Link to="/leaderboard">Leaderboard</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}
