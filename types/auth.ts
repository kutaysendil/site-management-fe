export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  apartmentNo?: string;
}

export interface AuthState {
  token: string | null;
  user: User | null;
  isLoading: boolean;
  setToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  setIsLoading: (loading: boolean) => void;
  logout: () => void;
}
