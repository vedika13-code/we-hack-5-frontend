const API_URL = import.meta.env.VITE_API_URL;

async function request(path: string, options: RequestInit = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json" },
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
  login: (body: { email: string; password: string }) =>
    request("/auth/login", { method: "POST", body: JSON.stringify(body) }),
  logout: () => request("/auth/logout", { method: "POST" }),
  me: () => request("/auth/me"),
};
