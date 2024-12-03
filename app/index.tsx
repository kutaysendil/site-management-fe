// app/index.tsx
import { useAuthStore } from "@/stores/authStore";
import { Redirect } from "expo-router";

export default function Index() {
  const { token } = useAuthStore();

  if (!token) {
    return <Redirect href="/(auth)/login" />;
  }

  return <Redirect href="/(app)/dashboard" />;
}
