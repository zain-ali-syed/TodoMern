/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, type ReactNode, useContext } from "react";
import { BASE_URL } from "@/api/constants";

// Define types
type User = {
  id: string;
  email: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

type AuthContextType = {
  user: User | null;
  login: (user: User) => void;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (user: User) => {
    setUser(user);
  };

  const logout = async () => {
    await fetch(`${BASE_URL}/users/logout`, {
      method: "POST",
      credentials: "include",
    });

    setUser(null);
  };

  useEffect(() => {
    (async () => {
      const response = await fetch(`${BASE_URL}/users/check`, {
        credentials: "include",
      });
      const data = await response.json();

      if (!response.ok) {
        console.log("No user");
        setUser(null);
      } else {
        console.log("Yohooo set user ", data);
        setUser(data.user);
      }
    })();
  }, []);

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Auth context must be in Auth Provider");
  return context;
};

export { AuthProvider, useAuth };
