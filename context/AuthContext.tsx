import { createContext, ReactNode, useContext, useState } from "react";
import axiosInstance from "~/lib/axiosInstance";

interface User {
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  id: string;
  session: string;
}

interface AuthContextType {
  user: User | null;
  login: ({ email, password }: { email: string; password: string }) => Promise<void>;
  register: ({ email, password, name }: { email: string; password: string; name: string }) => Promise<void>;
  logout: () => void;
}

// Create the context with an initial value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async ({ email, password }: { email: string; password: string }) => {
    try {
      const { data } = await axiosInstance.post("/auth/login", { email, password });
      console.log(data.message);
      setUser(data?.message);
    } catch (err: any) {
      console.error(err?.response);
    }
  };

  const register = async ({ email, password, name }: { email: string; password: string; name: string }) => {
    try {
      const { data } = await axiosInstance.post("/auth/register", { email, password, name });
      console.log(data.message);
      setUser(data?.message);
    } catch (err: any) {
      console.error(err?.response);
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      setUser(null);
    } catch (err: any) {
      console.error(err?.response);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export default useAuthContext;
