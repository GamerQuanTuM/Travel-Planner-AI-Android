import React from "react"
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ToastAndroid } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isAxiosError } from "axios";

import axiosInstance from "~/lib/axiosInstance";


enum Subscription {
  FREE = "FREE",
  BASIC = "BASIC",
  STANDARD = "STANDARD",
  PREMIUM = "PREMIUM",
}


interface User {
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  id: string;
  session: string;
  subscription: Subscription | null
}

interface AuthContextType {
  user: User | null;
  login: ({ email, password }: { email: string; password: string }) => Promise<void>;
  register: ({ email, password, name }: { email: string; password: string; name: string }) => Promise<void>;
  logout: () => void;
  isLoggedIn: boolean;
  isLoading: boolean;
}

// Create the context with an initial value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserFromStorage = async () => {
      try {
        const userJson = await AsyncStorage.getItem('session');
        if (userJson) {
          const storedUser = JSON.parse(userJson);
          setUser(storedUser);
          setIsLoggedIn(true);
        }
      } catch (error: any) {
        console.log(error)
        setIsLoading(false)
        if (isAxiosError(error) && error.response?.data) {
          ToastAndroid.show(error.response?.data?.message, ToastAndroid.SHORT);
        } else {
          ToastAndroid.show("Something went wrong", ToastAndroid.SHORT);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserFromStorage();
  }, []);

  const login = async ({ email, password }: { email: string; password: string }) => {
    try {
      setIsLoading(true);
      const { data } = await axiosInstance.post("/auth/login", { email, password });
      setUser(data?.message);
      setIsLoggedIn(true);
      const jsonValue = JSON.stringify(data?.message);
      await AsyncStorage.setItem('session', jsonValue);
    } catch (error: any) {
      console.error(error?.response);
      setIsLoading(false)
      if (isAxiosError(error) && error.response?.data) {
        ToastAndroid.show(error.response?.data?.message, ToastAndroid.SHORT);
      } else {
        ToastAndroid.show("Something went wrong", ToastAndroid.SHORT);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const register = async ({ email, password, name }: { email: string; password: string; name: string }) => {
    try {
      setIsLoading(true);
      const { data } = await axiosInstance.post("/auth/register", { email, password, name });
      const { subscription, ...rest } = data?.message
      setUser(data?.message);
      setIsLoggedIn(true);
      const jsonValue = JSON.stringify(data?.message);
      await AsyncStorage.setItem('session', jsonValue);
    } catch (error: any) {
      console.error(error?.response);
      setIsLoading(false)
      if (isAxiosError(error) && error.response?.data) {
        ToastAndroid.show(error.response?.data?.message, ToastAndroid.SHORT);
      } else {
        ToastAndroid.show("Something went wrong", ToastAndroid.SHORT);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get("/auth/logout");
      if (response.status === 200) {
        await AsyncStorage.removeItem('session');
        await AsyncStorage.removeItem('subscription');
        setIsLoading(false);
        setUser(null);
        setIsLoggedIn(false);
      }
    } catch (error: any) {
      console.error(error?.response);
      setIsLoading(false)
      if (isAxiosError(error) && error.response?.data) {
        ToastAndroid.show(error.response?.data?.message, ToastAndroid.SHORT);
      } else {
        ToastAndroid.show("Something went wrong", ToastAndroid.SHORT);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading, isLoggedIn }}>
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
