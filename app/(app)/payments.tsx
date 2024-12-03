// app/(app)/payments.tsx
import { Stack } from "expo-router";
import { View } from "react-native";
import { Button, List } from "react-native-paper";

export default function PaymentsScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Ödemeler",
        }}
      />
      <View className="flex-1">
        <List.Section>
          <List.Subheader>Mart 2024</List.Subheader>
          <List.Item
            title="Aidat"
            description="Son Ödeme: 15 Mart 2024"
            left={(props) => <List.Icon {...props} icon="home" />}
            right={() => <Button mode="contained-tonal">₺500 Öde</Button>}
          />
          <List.Item
            title="Su Faturası"
            description="Son Ödeme: 20 Mart 2024"
            left={(props) => <List.Icon {...props} icon="water" />}
            right={() => <Button mode="contained-tonal">₺120 Öde</Button>}
          />
        </List.Section>
      </View>
    </>
  );
}
