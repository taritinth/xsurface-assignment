import { createContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [mode, setMode] = useState("seller");

  const userStore = {
    state: { mode },
    action: { setMode },
  };

  return (
    <UserContext.Provider value={userStore}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
