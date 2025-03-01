/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Cookies from "js-cookie";
import { createContext, useContext, useState } from "react";

interface AuthContextType {
  userToken: string | null;
  login: (authToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: any) => {
  const [userToken, setUserToken] = useState<string | null>(
    Cookies.get("authToken") || null
  );

  const login = (authToken: string) => {
    setUserToken(authToken);
    Cookies.set("authToken", authToken, { expires: 30 });
  };

  const logout = () => {
    Cookies.remove("authToken", {
      path: "",
    });
    setUserToken(null);
  };

  return (
    <AuthContext.Provider value={{ userToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");

  return context;
};
