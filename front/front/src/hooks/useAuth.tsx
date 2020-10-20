import React, { createContext, useCallback, useState, useContext } from "react";
import Login from "../pages/index";
import api from "../services/api";

interface User {
  id: number;
  first_name: string;
  last_name: string;
}

interface signInCredentials {
  username: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn(credentials: signInCredentials): Promise<void>;
  signOut(): void;
}

interface AuthState {
  token: string;
  user: User;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    if (process.browser) {
      const token = localStorage.getItem("@Chat:token");
      const user = localStorage.getItem("@Chat:user");

      if (token && user) {
        api.defaults.headers.authorization = `Token ${token}`;

        return { token, user: JSON.parse(user) };
      }
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ username, password }) => {
    const response = await api.post("/api/users/login/", {
      username,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem("@Chat:token", token);
    localStorage.setItem("@Chat:user", JSON.stringify(user));

    api.defaults.headers.authorization = `Token ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem("@Chat:token");
    localStorage.removeItem("@Chat:user");

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  return useContext(AuthContext);
}

export const ProtectRoute = ({ children }) => {
  const { user } = useAuth();
  if (
    process.browser &&
    !user &&
    window.location.pathname !== "/" &&
    window.location.pathname !== "/signup"
  ) {
    return <Login />;
  }

  return children;
};
