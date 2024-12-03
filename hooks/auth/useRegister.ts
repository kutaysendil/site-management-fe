// hooks/auth/useRegister.ts
import { authAPI } from "@/services/api";
import { useAuthStore } from "@/stores/authStore";
import { APIError, LoginResponse, RegisterData } from "@/types/api";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";

export const useRegister = () => {
  const { setToken, setUser } = useAuthStore();

  return useMutation<LoginResponse, APIError, RegisterData>({
    mutationFn: authAPI.register,
    onSuccess: (data) => {
      setToken(data.accessToken);
      setUser(data.user);
      router.replace("/(app)/dashboard");
    },
    onError: (error) => {
      console.error("Register error:", error.message);
      // Burada hata yönetimi yapılabilir
    },
  });
};
