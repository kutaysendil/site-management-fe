import { InternalAxiosRequestConfig } from "axios";

export interface APIError {
  message: string;
  status: number;
  errors?: Record<string, string[]>;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  apartmentNo?: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  email: string;
  name: string;
  surname: string;
  roles: string[];
  permissions: string[];
  apartmentNumber?: string;
  phoneNumber?: string;
}
export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}
