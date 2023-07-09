import { createContext } from "react";
import { useLocalStorage } from "@hooks/useLocalStorage";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [mode, setMode] = useLocalStorage("mode", "seller");

  const userStore = {
    state: { mode },
    action: { setMode },
  };

  return (
    <UserContext.Provider value={userStore}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
