import { useContext, createContext, useState } from "react";
import { request } from "../services";
import Auth from "../services/Auth";
const AuthContext = createContext();
let intevalRefresToken = null;

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

const getUserAuth = () => {
  const access_token = localStorage.getItem("access_token");
  if (access_token === null) {
    return null;
  }
  const userToken = parseJwt(access_token);
  return userToken;
};

export const AuthProvider = ({ children }) => {
  const [userAuth, setUserAuth] = useState(getUserAuth());
  //list themes "white" | "g10" | "g90" | "g100"
  const [theme, setTheme] = useState("g10");

  if (intevalRefresToken === null) {
    Auth.refresh();
    intevalRefresToken = setInterval(function () {
      if (!Auth.refresh()) {
        clearInterval(intevalRefresToken);
        return;
      }
    }, 350000);
  }

  window.ononline = () => {
    //refresh();
    location.reload();
  };
  

  const value = {
    userAuth,
    setUserAuth,
    getUserAuth,
    theme,
    setTheme,
    intevalRefresToken,
    request,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthProvider = () => {
  return useContext(AuthContext);
};
