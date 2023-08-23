import { api } from "@/services/api";
import jwtDecode from "jwt-decode";
import * as React from "react";

export interface User {
  _id: string;
  username: string;
  password: string;
  firstname: string;
  surname: string;
  role: string;
  created_at: Date;
}

interface AuthContextType {
  user: User;
  isAuthenticated: boolean;
  logInWithUsername: (username: string, password: string) => Promise<object>;
  logOut: () => void;
}

const AuthContext = React.createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User>();
  const [isAuthenticated, setIsAuthenticated] = React.useState(() => {
    return !!localStorage.getItem("access_token"); // Convertir en booléen pour obtenir true ou false
  });

  const logInWithUsername = async (username: string, password: string) => {
    const { user, token } = await api.logInWithUsername(username, password);
    localStorage.setItem("access_token", token);
    setIsAuthenticated(true);
    setUser(user as User);
  };

  const logOut = () => {
    localStorage.removeItem("access_token");
    setIsAuthenticated(false);
    setUser(null!);
  };

  React.useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    if (storedToken) {
      setUser(jwtDecode(storedToken) as User);
    }
  }, []);

  const value = { isAuthenticated, user, logInWithUsername, logOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}
