// hooks/auth/useLogin.ts
import { authAPI } from "@/services/api";
import { useAuthStore } from "@/stores/authStore";
import { APIError, LoginCredentials, LoginResponse } from "@/types/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";

export const useLogin = () => {
  const { setUser } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation<LoginResponse, APIError, LoginCredentials>({
    mutationFn: authAPI.login,
    onSuccess: (data) => {
      setUser(data);
      queryClient.clear(); // Önbellekteki eski verileri temizle
      router.replace("/(app)/dashboard");
    },
    onError: (error) => {
      console.error("Login error:", error.message);
      // Burada hata yönetimi yapılabilir (örn: toast gösterimi)
    },
  });
};
