// app/(auth)/_layout.tsx
import { useAuthStore } from "@/stores/authStore";
import { Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

export default function AuthLayout() {
  const { token, isLoading } = useAuthStore();

  if (isLoading) {
    return (
      <View className="flex-1 bg-white">
        <StatusBar style="dark" />
      </View>
    );
  }

  if (token) {
    return <Redirect href="/(app)/dashboard" />;
  }

  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "white" },
        }}
      />
    </>
  );
}
