// app/(app)/_layout.tsx
import { useAuthStore } from "@/stores/authStore";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function AppLayout() {
  const { token } = useAuthStore();

  // Token yoksa login'e yönlendir
  console.log(token);

  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerShadowVisible: false,
          animation: "fade",
        }}
      />
    </>
  );
}
