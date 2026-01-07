// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { storage } from '../utils/storage';
import { authService, LoginPayload, RegisterPayload } from '../services/authService';
import { registerForPushToken } from '../utils/registerForPushToken';
import { api } from '../services/api';


export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (data: LoginPayload) => Promise<void>;
  register: (data: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // =========================
  // 🔔 SAVE PUSH TOKEN TO BACKEND
  // =========================
  const uploadPushToken = async () => {
    try {
      const token = await registerForPushToken();
      if (!token) return;

      await api.post("/users/save-push-token", { pushToken: token });
      console.log("Push token saved to backend");
    } catch (err) {
      console.log("Failed to upload push token", err);
    }
  };

  // =========================
  // 🔥 On App Start
  // =========================
  useEffect(() => {
    const init = async () => {
      try {
        const token = await storage.getToken();
        if (!token) {
          setLoading(false);
          return;
        }

        const res = await authService.getMe();
        setUser(res.user);

      } catch (err) {
        await storage.clearToken();
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  // =========================
  // 🔥 Whenever user becomes logged in
  // =========================
  useEffect(() => {
    if (user) uploadPushToken();
  }, [user]);

  const login = async (data: LoginPayload) => {
  const res = await authService.login(data);
  await storage.setToken(res.token);
  setUser(res.user);

  try {
    const pushToken = await registerForPushToken();
    if (pushToken) {
      await api.post("/users/push-token", {
        expoPushToken: pushToken,
      });
      console.log("Push token saved:", pushToken);
    }
  } catch (e) {
    console.log("Push token save failed", e);
  }
};


  const register = async (data: RegisterPayload) => {
  const res = await authService.register(data);
  await storage.setToken(res.token);
  setUser(res.user);

  const pushToken = await registerForPushToken();
  if (pushToken) {
    await api.post("/users/push-token", { expoPushToken: pushToken });
  }
};


  const logout = async () => {
    await storage.clearToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
