import { InternalAxiosRequestConfig } from 'axios';

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
  user: {
    id: string;
    email: string;
    name: string;
    roles: string[];
    apartmentNo?: string;
  };
}
export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
	_retry?: boolean;
  }