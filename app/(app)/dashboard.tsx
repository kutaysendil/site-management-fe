// app/(app)/dashboard.tsx
import { useAuthStore } from "@/stores/authStore";
import { Stack, useRouter } from "expo-router";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";

export default function DashboardScreen() {
  const { logout } = useAuthStore();
  const router = useRouter();
  return (
    <>
      <Stack.Screen
        options={{
          title: "Ana Sayfa",
          headerRight: () => (
            <Button
              onPress={() => {
                logout();
                router.push("/(auth)/login");
              }}
            >
              Çıkış
            </Button>
          ),
        }}
      />
      <View className="flex-1 p-4">
        <Text variant="titleLarge" className="mb-4">
          Hoş Geldiniz
        </Text>
        <View className="flex-row flex-wrap gap-4">
          <DashboardCard
            title="Ödenecek Aidat"
            value="₺500"
            icon="currency-try"
          />
          <DashboardCard title="Son Ödeme" value="15 Mart" icon="calendar" />
          <DashboardCard title="Su Tüketimi" value="12 m³" icon="water" />
          <DashboardCard title="Duyurular" value="3 Yeni" icon="bell" />
        </View>
      </View>
    </>
  );
}

interface DashboardCardProps {
  title: string;
  value: string;
  icon: string;
}

function DashboardCard({ title, value, icon }: DashboardCardProps) {
  return (
    <View className="bg-white p-4 rounded-lg shadow-sm flex-1 min-w-[45%]">
      <View className="flex-row items-center mb-2">
        <Text className="text-gray-600">{title}</Text>
      </View>
      <Text variant="headlineSmall" className="font-bold">
        {value}
      </Text>
    </View>
  );
}
