import { Link, Stack } from "expo-router";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Sayfa Bulunamadı",
          headerShown: true,
        }}
      />
      <View className="flex-1 items-center justify-center p-5 bg-white">
        <Text variant="headlineMedium" className="mb-4 text-center">
          404
        </Text>
        <Text variant="titleMedium" className="mb-2 text-center">
          Sayfa bulunamadı!
        </Text>
        <Text className="mb-6 text-center text-gray-600">
          Aradığınız sayfaya ulaşılamıyor. Lütfen URL'i kontrol edin veya ana
          sayfaya dönün.
        </Text>
        <Link href="/(app)/dashboard" asChild>
          <Button mode="contained" icon="home">
            Ana Sayfaya Dön
          </Button>
        </Link>
      </View>
    </>
  );
}
