import { createContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const StateContext = createContext({});
export const ContextProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);
  const [bookmark, setBookmark] = useLocalStorage("bookmark", []);
  const [changed, setChanged] = useState("");
  const [pageName, setPageName] = useState("Mosque Near By");
  return (
    <StateContext.Provider
      value={{
        auth,
        setAuth,
        activeMenu,
        setActiveMenu,
        screenSize,
        setScreenSize,
        bookmark,
        setBookmark,
        pageName,
        setPageName,
        changed,
        setChanged,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default StateContext;
