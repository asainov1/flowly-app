import { api } from "./client";
import type { User, AuthTokens, PaginatedResponse } from "./types";

export const authApi = {
  googleLogin: (idToken: string) =>
    api.post<AuthTokens>("/api/auth/google/", { id_token: idToken }),

  login: (email: string, password: string) =>
    api.post<AuthTokens>("/api/auth/login/", { email, password }),

  validate: () =>
    api.get<{ active: boolean; user: User }>("/api/auth/validate/"),

  me: () =>
    api.get<User>("/api/auth/me/"),

  updateMe: (data: Partial<User>) =>
    api.patch<User>("/api/auth/me/", data),

  changePassword: (old_password: string, new_password: string) =>
    api.post("/api/auth/password/", { old_password, new_password }),

  listUsers: (params?: { limit?: number; offset?: number; search?: string }) => {
    const q = new URLSearchParams();
    if (params?.limit) q.set("limit", String(params.limit));
    if (params?.offset) q.set("offset", String(params.offset));
    if (params?.search) q.set("search", params.search);
    return api.get<PaginatedResponse<User>>(`/api/auth/users/?${q}`);
  },

  getUser: (id: number) =>
    api.get<User>(`/api/auth/users/${id}/`),

  referral: () =>
    api.get<{ code: string; url: string }>("/api/auth/me/referral/"),
};
