// src/context/authContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface AuthState {
  userToken: string | null;
  adminToken: string | null;
  isLoading: boolean;
  setUserToken: (token: string | null) => void;
  setAdminToken: (token: string | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthState>({
  userToken: null,
  adminToken: null,
  isLoading: true,
  setUserToken: () => {},
  setAdminToken: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userToken, _setUserToken] = useState<string | null>(null);
  const [adminToken, _setAdminToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const setUserToken = (token: string | null) => {
    _setUserToken(token);
    token
      ? localStorage.setItem("userToken", token)
      : localStorage.removeItem("userToken");
  };

  const setAdminToken = (token: string | null) => {
    _setAdminToken(token);
    token
      ? localStorage.setItem("adminToken", token)
      : localStorage.removeItem("adminToken");
  };

  const logout = () => {
    setUserToken(null);
    setAdminToken(null);
    localStorage.removeItem("userData");
    localStorage.removeItem("adminData");
  };

  useEffect(() => {
    // Hydrate from localStorage on app bootstrap
    const storedUser = localStorage.getItem("userToken");
    const storedAdmin = localStorage.getItem("adminToken");
    _setUserToken(storedUser);
    _setAdminToken(storedAdmin);
    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        userToken,
        adminToken,
        isLoading,
        setUserToken,
        setAdminToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
