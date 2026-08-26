import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ProtectedRoute } from "./components/ProtectedRoute";

import Home from "./pages/Home";
import About from "./pages/About";
import Timeline from "./pages/Timeline";
import ProblemStatements from "./pages/ProblemStatements";
import Judges from "./pages/Judges";
import Mentors from "./pages/Mentors";
import Leaderboard from "./pages/Leaderboard";

import Signup from "./pages/Signup";
import VerifyEmail from "./pages/VerifyEmail";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import Sponsors from "./pages/Sponsors";

import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Registration from "./pages/Registration";
import Team from "./pages/Team";
import Submission from "./pages/Submission";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminTeams from "./pages/admin/Teams";
import AdminParticipants from "./pages/admin/Participants";
import AdminSubmissions from "./pages/admin/Submissions";
import AdminAnnouncements from "./pages/admin/Announcements";
import AdminDeadlines from "./pages/admin/Deadlines";
import AdminShortlist from "./pages/admin/Shortlist";
import AdminSponsors from "./pages/admin/Sponsors";
import ManageAdmins from "./pages/admin/ManageAdmins";
import JudgesAdmin from "./pages/admin/JudgesAdmin";
import MentorsAdmin from "./pages/admin/MentorsAdmin";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/problem-statements" element={<ProblemStatements />} />
        <Route path="/judges" element={<Judges />} />
        <Route path="/mentors" element={<Mentors />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/sponsors" element={<Sponsors />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/team" element={<Team />} />
          <Route path="/submission" element={<Submission />} />
        </Route>

        <Route element={<ProtectedRoute roles={["ADMIN", "SUPER_ADMIN"]} />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/teams" element={<AdminTeams />} />
          <Route path="/admin/participants" element={<AdminParticipants />} />
          <Route path="/admin/submissions" element={<AdminSubmissions />} />
          <Route path="/admin/announcements" element={<AdminAnnouncements />} />
          <Route path="/admin/deadlines" element={<AdminDeadlines />} />
          <Route path="/admin/shortlist" element={<AdminShortlist />} />
          <Route path="/admin/sponsors" element={<AdminSponsors />} />
          <Route path="/admin/judges" element={<JudgesAdmin />} />
          <Route path="/admin/mentors" element={<MentorsAdmin />} />
        </Route>

        <Route element={<ProtectedRoute roles={["SUPER_ADMIN"]} />}>
          <Route path="/admin/manage-admins" element={<ManageAdmins />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}