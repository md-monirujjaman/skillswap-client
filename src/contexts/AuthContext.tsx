import { createContext, useContext, useState, useEffect, useCallback, ReactNode, Dispatch, SetStateAction } from "react";
import api from "@/lib/api";
import { User } from "@/types";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  setUser: Dispatch<SetStateAction<User | null>>;
  checkAuth: () => Promise<User | null>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const USER_STORAGE_KEY = "skillswap_user";

export function normalizeUser(user: User | null | undefined): User | null {
  if (!user) return null;

  const role = String(user.role || "Client").toLowerCase();
  return {
    ...user,
    role: role === "admin" ? "Admin" : role === "freelancer" ? "Freelancer" : "Client",
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY);
      return saved ? normalizeUser(JSON.parse(saved)) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async (): Promise<User | null> => {
    try {
      const res = await api.get("/api/auth/me");
      const currentUser = normalizeUser(res.data?.user || res.data?.data?.user || null);
      setUser(currentUser);
      if (currentUser) {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(USER_STORAGE_KEY);
      }
      return currentUser;
    } catch (error) {
      setUser(null);
      localStorage.removeItem(USER_STORAGE_KEY);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.post("/api/auth/logout");
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      setUser(null);
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, setUser, checkAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
