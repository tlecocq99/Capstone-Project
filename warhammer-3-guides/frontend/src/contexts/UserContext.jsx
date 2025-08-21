import React, { createContext, useState } from "react";

// Create the context
export const UserContext = createContext();

// Provider component
export function UserProvider({ children }) {
  const [user, setUser] = useState(null); // null means not logged in
  const [savedFactions, setSavedFactions] = useState([]);

  return (
    <UserContext.Provider
      value={{ user, setUser, savedFactions, setSavedFactions }}
    >
      {children}
    </UserContext.Provider>
  );
}
