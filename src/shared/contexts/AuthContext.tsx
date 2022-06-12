import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { AuthService } from "../services/api/auth/AuthService";

interface IAuthContextData {
  isAuthencicated: boolean;
  logout: () => void;
  login: (email: string, password: string) => Promise<string | void>
}

const AuthContext = createContext({} as IAuthContextData)

interface IAuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<IAuthProviderProps> = ({ children }) => {

  const LOCAL_STORAGE_KEY__ACCESS_TOKEN = 'APP_ACCESS_TOKEN';

  const [accessToken, setAccessToken] = useState<string>();

  useEffect(() => {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);

    if(accessToken) {
      setAccessToken(JSON.parse(accessToken));
      return;
    }
    setAccessToken(undefined);
  }, []);

  const handleLogin = useCallback(async (email: string, password: string) => {
    const result = await AuthService.auth(email, password);
    if(result instanceof Error) {
      return result.message;
    }
    localStorage.setItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN, JSON.stringify(result.accessToken));
    setAccessToken(result.accessToken);

  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEY__ACCESS_TOKEN);
    setAccessToken(undefined);

  }, []);

  const isAuthencicated = useMemo(() => !!accessToken, [accessToken]);

  return (
    <AuthContext.Provider value={{ isAuthencicated, login: handleLogin, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}