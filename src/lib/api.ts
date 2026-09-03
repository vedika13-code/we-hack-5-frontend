const API_URL = import.meta.env.VITE_API_URL;

let authToken: string | null = localStorage.getItem("authToken");

export function setAuthToken(token: string | null) {
  authToken = token;
  if (token) localStorage.setItem("authToken", token);
  else localStorage.removeItem("authToken");
}

async function request(path: string, options: RequestInit = {}) {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (authToken) headers["Authorization"] = `Bearer ${authToken}`;

  const res = await fetch(`${API_URL}${path}`, {
    credentials: "include",
    headers: { ...headers, ...(options.headers as Record<string, string>) },
    ...options,
  });
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error || "Request failed");
  return data;
}

export const api = {
  register: (body: { email: string; password: string; fullName: string }) =>
    request("/auth/register", { method: "POST", body: JSON.stringify(body) }),
  verifyOtp: async (body: { email: string; otp: string }) => {
    const result = await request("/auth/verify-otp", { method: "POST", body: JSON.stringify(body) });
    if (result.token) setAuthToken(result.token);
    return result;
  },
  resendOtp: (email: string) =>
    request("/auth/resend-otp", { method: "POST", body: JSON.stringify({ email }) }),
  login: async (body: { email: string; password: string }) => {
    const result = await request("/auth/login", { method: "POST", body: JSON.stringify(body) });
    if (result.token) setAuthToken(result.token);
    return result;
  },
  logout: async () => {
    const result = await request("/auth/logout", { method: "POST" });
    setAuthToken(null);
    return result;
  },
  me: () => request("/auth/me"),

  createTeam: (body: {
    name: string;
    college: string;
    track?: string;
    problemStatement?: string;
    ideaTitle?: string;
    ideaDescription?: string;
    hardwareNeeded?: boolean;
    hardwareDetails?: string;
  }) => request("/teams", { method: "POST", body: JSON.stringify(body) }),
  joinTeam: (teamCode: string) =>
    request("/teams/join", { method: "POST", body: JSON.stringify({ teamCode }) }),
  getTeam: (teamId: string) => request(`/teams/${teamId}`),
  updateTeam: (teamId: string, body: Record<string, unknown>) =>
    request(`/teams/${teamId}`, { method: "PUT", body: JSON.stringify(body) }),
  removeMember: (teamId: string, memberId: string) =>
    request(`/teams/${teamId}/members/${memberId}`, { method: "DELETE" }),
  deleteTeam: (teamId: string) => request(`/teams/${teamId}`, { method: "DELETE" }),
  finalizeTeam: (teamId: string) => request(`/teams/${teamId}/finalize`, { method: "POST" }),
  registrationStatus: () => request("/registration/status"),

  getMySubmission: () => request("/submissions/me"),
  submitLink: (projectLink: string) =>
    request("/submissions/link", { method: "POST", body: JSON.stringify({ projectLink }) }),
  updateChecklist: (checklist: Record<string, boolean>) =>
    request("/submissions/checklist", { method: "PUT", body: JSON.stringify(checklist) }),
  // Direct-to-storage upload: ask the API for a presigned URL, PUT the file
  // straight to Supabase, then tell the API it landed. The file never goes
  // through our server.
  uploadSubmissionFile: async (file: File) => {
    // Some browsers/OSes leave file.type empty for .zip/.pptx — fall back to the
    // extension so the backend MIME check doesn't reject a valid file.
    const byExt: Record<string, string> = {
      pdf: "application/pdf",
      ppt: "application/vnd.ms-powerpoint",
      pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      zip: "application/zip",
    };
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
    const contentType = file.type || byExt[ext] || "application/octet-stream";
    const ticket = await request("/submissions/file/presign", {
      method: "POST",
      body: JSON.stringify({ filename: file.name, contentType }),
    });

    const putRes = await fetch(ticket.uploadUrl, {
      method: "PUT",
      headers: { "Content-Type": contentType },
      body: file,
    });
    if (!putRes.ok) throw new Error("Upload to storage failed — please try again.");

    return request("/submissions/file/confirm", {
      method: "POST",
      body: JSON.stringify({ key: ticket.key, contentType }),
    });
  },

  getNotifications: () => request("/notifications"),
  markNotificationRead: (id: string) => request(`/notifications/${id}/read`, { method: "PUT" }),
  markAllNotificationsRead: () => request("/notifications/read-all", { method: "PUT" }),

  getAdminDashboard: () => request("/admin/dashboard"),
  getAdminTeams: (params: { search?: string; page?: number } = {}) => {
    const qs = new URLSearchParams();
    if (params.search) qs.set("search", params.search);
    if (params.page) qs.set("page", String(params.page));
    return request(`/admin/teams?${qs.toString()}`);
  },
  getAdminTeamDetail: (teamId: string) => request(`/admin/teams/${teamId}`),
  setTeamStatus: (teamId: string, status: "SUBMITTED" | "APPROVED" | "REJECTED") =>
    request(`/admin/teams/${teamId}/status`, { method: "PUT", body: JSON.stringify({ status }) }),
  setTeamShortlist: (teamId: string, shortlisted: boolean) =>
    request(`/admin/teams/${teamId}/shortlist`, { method: "PUT", body: JSON.stringify({ shortlisted }) }),
  emailTeam: (teamId: string, subject: string, message: string) =>
    request(`/admin/teams/${teamId}/email`, { method: "POST", body: JSON.stringify({ subject, message }) }),
  deleteAdminTeam: (teamId: string) => request(`/admin/teams/${teamId}`, { method: "DELETE" }),

  getSponsors: () => request("/sponsors"),
  getJudges: () => request("/judges"),
  getMentors: () => request("/mentors"),
  getLeaderboard: () => request("/leaderboard"),
  getDeadlines: () => request("/deadlines"),
  getAnnouncements: () => request("/announcements"),

  getAdminSponsors: () => request("/admin/sponsors"),
  createSponsor: (body: { name: string; logoUrl: string; tier: string; link: string; order?: number }) =>
    request("/admin/sponsors", { method: "POST", body: JSON.stringify(body) }),
  updateSponsor: (id: string, body: Partial<{ name: string; logoUrl: string; tier: string; link: string; order: number }>) =>
    request(`/admin/sponsors/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  deleteSponsor: (id: string) => request(`/admin/sponsors/${id}`, { method: "DELETE" }),

  setDeadline: (key: string, dueAt: string) =>
    request("/deadlines", { method: "PUT", body: JSON.stringify({ key, dueAt }) }),
  extendDeadline: (key: string, extendedTo: string) =>
    request(`/deadlines/${key}/extend`, { method: "PUT", body: JSON.stringify({ extendedTo }) }),

  createAnnouncement: (title: string, body: string) =>
    request("/announcements", { method: "POST", body: JSON.stringify({ title, body }) }),

  getAdmins: () => request("/admin/admins"),
  promoteToAdmin: (email: string) =>
    request("/admin/admins", { method: "POST", body: JSON.stringify({ email }) }),
  demoteAdmin: (userId: string) => request(`/admin/admins/${userId}`, { method: "DELETE" }),

  getAdminSubmissions: (params: { search?: string; page?: number } = {}) => {
    const qs = new URLSearchParams();
    if (params.search) qs.set("search", params.search);
    if (params.page) qs.set("page", String(params.page));
    return request(`/admin/submissions?${qs.toString()}`);
  },

  forgotPassword: (email: string) =>
    request("/auth/forgot-password", { method: "POST", body: JSON.stringify({ email }) }),
  resetPassword: (token: string, newPassword: string) =>
    request("/auth/reset-password", { method: "POST", body: JSON.stringify({ token, newPassword }) }),

  createJudge: (body: { name: string; photoUrl: string; designation: string; company: string; linkedin?: string; expertise: string; bio: string }) =>
    request("/admin/judges", { method: "POST", body: JSON.stringify(body) }),
  deleteJudge: (id: string) => request(`/admin/judges/${id}`, { method: "DELETE" }),

  createMentor: (body: { name: string; photoUrl: string; expertise: string }) =>
    request("/admin/mentors", { method: "POST", body: JSON.stringify(body) }),
  deleteMentor: (id: string) => request(`/admin/mentors/${id}`, { method: "DELETE" }),
};