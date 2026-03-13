"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { authApi, removeToken } from "@/lib/api";
import type { User } from "@/lib/api";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  logout: () => {},
  refreshUser: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      // Try to parse demo token first
      const match = document.cookie.match(/(?:^|; )flowly_token=([^;]*)/);
      const token = match ? match[1] : null;
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          if (payload.email === "demo@flowlyai.kz") {
            setUser({
              id: 1,
              email: "demo@flowlyai.kz",
              first_name: "Demo",
              last_name: "User",
              phone_number: null,
              is_active: true,
              is_staff: false,
              is_superuser: false,
              email_verified: true,
              locale: "ru",
              timezone: "Asia/Almaty",
              theme: "dark",
              date_joined: new Date().toISOString(),
              last_login: new Date().toISOString(),
              organization_ids: [1],
            });
            return;
          }
        } catch {
          // Not a demo token, proceed to API
        }
      }
      const u = await authApi.me();
      setUser(u);
    } catch {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    refreshUser().finally(() => setLoading(false));
  }, [refreshUser]);

  const logout = useCallback(() => {
    removeToken();
    setUser(null);
    window.location.href = "/login";
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
