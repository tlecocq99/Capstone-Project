import React, { createContext, useState, useEffect } from "react";

// Create the context
export const UserContext = createContext();

// Provider component
export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem("wh3_user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [savedFactions, setSavedFactions] = useState(() => {
    try {
      const stored = localStorage.getItem("wh3_saved_factions");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Persist changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("wh3_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("wh3_user");
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("wh3_saved_factions", JSON.stringify(savedFactions));
  }, [savedFactions]);

  // Hydrate savedFactions from server on mount / user change (authoritative sync)
  useEffect(() => {
    if (!user?.username) return;
    fetch(
      `http://localhost:3001/api/auth/user/${encodeURIComponent(user.username)}`
    )
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.success && Array.isArray(data.user?.savedFactions)) {
          setSavedFactions(data.user.savedFactions);
        }
      })
      .catch(() => {});
  }, [user?.username]);

  return (
    <UserContext.Provider
      value={{ user, setUser, savedFactions, setSavedFactions }}
    >
      {children}
    </UserContext.Provider>
  );
}
