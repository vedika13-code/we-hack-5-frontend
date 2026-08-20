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
  verifyOtp: (body: { email: string; otp: string }) =>
    request("/auth/verify-otp", { method: "POST", body: JSON.stringify(body) }),
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
  uploadSubmissionFile: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const headers: Record<string, string> = {};
    if (authToken) headers["Authorization"] = `Bearer ${authToken}`;
    const res = await fetch(`${API_URL}/submissions/file`, {
      method: "POST",
      credentials: "include",
      headers,
      body: formData,
    });
    const data = await res.json().catch(() => null);
    if (!res.ok) throw new Error(data?.error || "Upload failed");
    return data;
  },

  getNotifications: () => request("/notifications"),
  markNotificationRead: (id: string) => request(`/notifications/${id}/read`, { method: "PUT" }),
  markAllNotificationsRead: () => request("/notifications/read-all", { method: "PUT" }),
};