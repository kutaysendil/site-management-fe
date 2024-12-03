// app/(auth)/login/index.tsx (login.tsx yerine)
import { useLogin } from "@/hooks/auth/useLogin";
import { Link } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useLogin();

  const handleLogin = () => {
    login.mutate({ email, password });
  };

  return (
    <View className="flex-1 justify-center px-4 bg-white">
      <View className="space-y-4">
        <Text variant="headlineMedium" className="text-center mb-6">
          Site Yönetim
        </Text>

        <TextInput
          label="E-posta"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          mode="outlined"
        />

        <TextInput
          label="Şifre"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          mode="outlined"
        />

        <Button
          mode="contained"
          onPress={handleLogin}
          loading={login.isPending}
        >
          Giriş Yap
        </Button>

        <View className="flex-row justify-center space-x-1 mt-4">
          <Text variant="bodyMedium" className="text-gray-600">
            Hesabınız yok mu?
          </Text>
          <Link href="/(auth)/register" asChild>
            <Text variant="bodyMedium" className="text-blue-600">
              Kayıt olun
            </Text>
          </Link>
        </View>
      </View>
    </View>
  );
}
