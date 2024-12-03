// app/(app)/profile.tsx
import { Stack } from "expo-router";
import { View } from "react-native";
import { Button, TextInput } from "react-native-paper";

export default function ProfileScreen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Profil",
        }}
      />
      <View className="flex-1 p-4">
        <View className="space-y-4">
          <TextInput
            label="Ad Soyad"
            mode="outlined"
            value="John Doe"
            disabled
          />
          <TextInput label="Daire No" mode="outlined" value="12" disabled />
          <TextInput
            label="E-posta"
            mode="outlined"
            value="john@example.com"
            disabled
          />
          <Button mode="contained">Şifre Değiştir</Button>
        </View>
      </View>
    </>
  );
}
