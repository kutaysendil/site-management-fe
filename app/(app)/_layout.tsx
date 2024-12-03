// app/(app)/_layout.tsx
import { useAuthStore } from "@/stores/authStore";
import { Redirect, Stack } from "expo-router";

export default function AppLayout() {
  const { token } = useAuthStore();

  // Token yoksa login sayfasına yönlendir
  if (!token) {
    return <Redirect href="/(auth)/login" />;
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#2196F3",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Site Yönetim",
        }}
      />
    </Stack>
  );
}
