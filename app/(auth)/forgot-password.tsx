// app/(auth)/forgot-password.tsx
import { api } from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { Link } from "expo-router";
import { useState } from "react";
import { Keyboard, View } from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState(false);

  const resetPassword = useMutation({
    mutationFn: async (email: string) => {
      await api.post("/auth/forgot-password", { email });
    },
    onSuccess: () => {
      setSuccess(true);
      setError(undefined);
    },
    onError: (error: any) => {
      setError(error.message || "Şifre sıfırlama işlemi başarısız oldu");
    },
  });

  const handleSubmit = async () => {
    Keyboard.dismiss();
    if (!email.trim()) {
      setError("E-posta adresi gerekli");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Geçerli bir e-posta adresi girin");
      return;
    }

    try {
      await resetPassword.mutateAsync(email);
    } catch (error) {
      // Error handling is done in mutation
    }
  };

  if (success) {
    return (
      <View className="flex-1 justify-center px-4 bg-white">
        <View className="bg-white p-6 rounded-lg space-y-4 max-w-md w-full mx-auto">
          <Text variant="headlineMedium" className="text-center">
            E-postanızı Kontrol Edin
          </Text>
          <Text className="text-center text-gray-600">
            Şifre sıfırlama talimatları e-posta adresinize gönderildi.
          </Text>
          <Link href="/(auth)/login" asChild>
            <Button mode="contained">Giriş Sayfasına Dön</Button>
          </Link>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center px-4 bg-white">
      <View className="bg-white p-6 rounded-lg space-y-4 max-w-md w-full mx-auto">
        <View className="mb-8">
          <Text variant="headlineMedium" className="text-center">
            Şifremi Unuttum
          </Text>
          <Text variant="bodyMedium" className="text-center text-gray-600 mt-2">
            Şifrenizi sıfırlamak için e-posta adresinizi girin
          </Text>
        </View>

        <View>
          <TextInput
            label="E-posta"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setError(undefined);
            }}
            autoCapitalize="none"
            keyboardType="email-address"
            mode="outlined"
            error={!!error}
            disabled={resetPassword.isPending}
            returnKeyType="done"
            onSubmitEditing={handleSubmit}
          />
          <HelperText type="error" visible={!!error}>
            {error}
          </HelperText>
        </View>

        <Button
          mode="contained"
          onPress={handleSubmit}
          loading={resetPassword.isPending}
          disabled={resetPassword.isPending}
        >
          Şifremi Sıfırla
        </Button>

        <Link href="/(auth)/login" asChild>
          <Text variant="bodyMedium" className="text-center text-blue-600">
            Giriş sayfasına dön
          </Text>
        </Link>
      </View>
    </View>
  );
}
