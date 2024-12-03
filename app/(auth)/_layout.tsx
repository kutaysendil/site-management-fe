// app/(auth)/_layout.tsx
import { useAuthStore } from "@/stores/authStore";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function AuthLayout() {
  const { token } = useAuthStore();

  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </>
  );
}
