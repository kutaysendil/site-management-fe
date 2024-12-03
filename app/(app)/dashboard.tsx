// app/index.tsx
import { useAuthStore } from "@/stores/authStore";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";

export default function Dashboard() {
  const logout = useAuthStore((state) => state.logout);

  return (
    <View className="flex-1 p-4">
      <Text variant="headlineMedium" className="mb-4">
        Hoş Geldiniz
      </Text>

      <Button mode="contained" onPress={logout} className="mt-4">
        Çıkış Yap
      </Button>
    </View>
  );
}
