import axios from "axios";

type AuthGetter = () => Promise<{
  token: string | null;
  clerkUserId: string | null;
  email: string | null;
  name: string | null;
  avatarUrl: string | null;
}>;

let authGetter: AuthGetter | null = null;

export function setApiAuthGetter(getter: AuthGetter | null) {
  authGetter = getter;
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3001/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  if (!authGetter) return config;

  const { token, clerkUserId, email, name, avatarUrl } = await authGetter();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  if (clerkUserId) {
    config.headers["x-clerk-user-id"] = clerkUserId;
  }

  if (email) {
    config.headers["x-clerk-user-email"] = email;
  }

  if (name) {
    config.headers["x-clerk-user-name"] = name;
  }

  if (avatarUrl) {
    config.headers["x-clerk-user-avatar"] = avatarUrl;
  }

  return config;
});