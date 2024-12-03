// stores/authStore.ts
import { AuthState } from "@/types/auth";
import * as SecureStore from "expo-secure-store";
import { create } from "zustand";

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isLoading: true,
  setToken: async (token) => {
    if (token) {
      await SecureStore.setItemAsync("token", token);
    } else {
      await SecureStore.deleteItemAsync("token");
    }
    set({ token });
  },
  setUser: (user) => set({ user }),
  setIsLoading: (isLoading) => set({ isLoading }),
  logout: async () => {
    await SecureStore.deleteItemAsync("token");
    set({ token: null, user: null });
  },
}));
