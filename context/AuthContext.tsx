"use client";

import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@/types/User";
import { ENDPOINTS } from "@/utilities/endpoints";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // true only until the first check finishes

  const refreshUser = useCallback(async () => {
    try {
      const res = await fetch(ENDPOINTS.ME, { credentials: "include" });
      if (res.status === 401) {
        setUser(null);
      } else if (res.ok) {
        setUser((await res.json()) as User);
      } else {
        console.error("Auth check failed:", res.status); // keep current user on 5xx
      }
    } catch (e) {
      console.error("Auth check failed:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refreshUser(); }, [refreshUser]);

  const logout = useCallback(async () => {
    await fetch(ENDPOINTS.LOGOUT, { method: "POST", credentials: "include" });
    setUser(null);
    router.replace("/auth/login");
  }, [router]);

  return (
    <AuthContext.Provider
      value={{ user, loading, isAuthenticated: !!user, refreshUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};