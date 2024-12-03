// services/api.ts
import { useAuthStore } from "@/stores/authStore";
import {
  APIError,
  CustomAxiosRequestConfig,
  LoginCredentials,
  LoginResponse,
  RegisterData,
} from "@/types/api";
import axios, { AxiosError } from "axios";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
const getBaseUrl = () => {
  if (__DEV__) {
    if (Platform.OS === "android") {
      // Android emulator için 10.0.2.2 kullan
      return "http://10.0.2.2:8080/api/v1";
    } else if (Platform.OS === "ios") {
      // iOS simulator için localhost
      return "http://localhost:8080/api/v1";
    }
  }
  // Production URL'i
  return "http://localhost:8080/api/v1";
};
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token!);
    }
  });
  failedQueue = [];
};

export const api = axios.create({
  baseURL: getBaseUrl(),
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<APIError>) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;
    const authStore = useAuthStore.getState();
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = await SecureStore.getItemAsync("refreshToken");
        if (!refreshToken) {
          throw new Error("No refresh token found");
        }

        const response = await api.post<{ accessToken: string }>(
          "/auth/refresh",
          {
            refreshToken,
          }
        );

        const newAccessToken = response.data.accessToken;
        await authStore.setToken(newAccessToken);

        processQueue(null, newAccessToken);
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        await authStore.logout();
        throw refreshError;
      } finally {
        isRefreshing = false;
      }
    }
    // API error handling
    const errorMessage = error.response?.data?.message || "Bir hata oluştu";
    return Promise.reject({
      message: errorMessage,
      status: error.response?.status,
      errors: error.response?.data?.errors,
    } as APIError);
  }
);
export const authAPI = {
  login: async (credentials: LoginCredentials) => {
    const { data } = await api.post<LoginResponse>("/auth/login", credentials);
    await SecureStore.setItemAsync("refreshToken", data.refreshToken);
    return data;
  },

  register: async (userData: RegisterData) => {
    const { data } = await api.post<LoginResponse>("/auth/register", userData);
    await SecureStore.setItemAsync("refreshToken", data.refreshToken);
    return data;
  },

  logout: async () => {
    const refreshToken = await SecureStore.getItemAsync("refreshToken");
    if (refreshToken) {
      await api.post("/auth/logout", { refreshToken });
      await SecureStore.deleteItemAsync("refreshToken");
    }
  },
};
