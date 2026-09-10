"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import AuthModal from "@/components/AuthModal";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("signin");

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => {
        if (d.user) setUser(d.user);
      })
      .catch(() => {})
      .finally(() => setReady(true));
  }, []);

  const openAuth = useCallback((mode = "signin") => {
    setModalMode(mode);
    setModalOpen(true);
  }, []);

  const closeAuth = useCallback(() => setModalOpen(false), []);

  const login = useCallback((profile) => {
    setUser(profile);
    setModalOpen(false);
  }, []);

  const logout = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, ready, openAuth, closeAuth, login, logout }),
    [user, ready, openAuth, closeAuth, login, logout]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
      <AuthModal
        open={modalOpen}
        mode={modalMode}
        onClose={closeAuth}
        onLogin={login}
        onSwitchMode={setModalMode}
      />
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
