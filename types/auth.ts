import { LoginResponse } from "./api";

export interface AuthState {
  token: string | null;
  user: LoginResponse | null;
  isLoading: boolean;
  setToken: (token: string | null) => void;
  setUser: (user: LoginResponse | null) => void;
  setIsLoading: (loading: boolean) => void;
  logout: () => void;
}
