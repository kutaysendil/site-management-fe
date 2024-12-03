// app/(auth)/login.tsx
import { useLogin } from "@/hooks/auth/useLogin";
import { LoginCredentials } from "@/types/api";
import { Link } from "expo-router";
import { useRef, useState } from "react";
import { Keyboard, TextInput as RNTextInput, View } from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FormErrors {
  email?: string;
  password?: string;
}

export default function LoginScreen() {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);

  const passwordRef = useRef<RNTextInput>(null);
  const login = useLogin();

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!credentials.email) {
      newErrors.email = "E-posta adresi gerekli";
    } else if (!EMAIL_REGEX.test(credentials.email)) {
      newErrors.email = "Geçerli bir e-posta adresi girin";
    }

    if (!credentials.password) {
      newErrors.password = "Şifre gerekli";
    } else if (credentials.password.length < 6) {
      newErrors.password = "Şifre en az 6 karakter olmalı";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    Keyboard.dismiss();
    if (!validateForm()) return;

    try {
      await login.mutateAsync(credentials);
    } catch (error) {
      // Error handling is done in useLogin hook
    }
  };

  return (
    <View className="flex-1 justify-center px-4 bg-white">
      <View className="bg-white p-6 rounded-lg space-y-4 max-w-md w-full mx-auto">
        <View className="mb-8">
          <Text variant="headlineMedium" className="text-center">
            Site Yönetim
          </Text>
          <Text variant="bodyMedium" className="text-center text-gray-600 mt-2">
            Hesabınıza giriş yapın
          </Text>
        </View>

        <View>
          <TextInput
            label="E-posta"
            value={credentials.email}
            onChangeText={(text) => {
              setCredentials((prev) => ({ ...prev, email: text }));
              if (errors.email)
                setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            autoCapitalize="none"
            keyboardType="email-address"
            mode="outlined"
            error={!!errors.email}
            disabled={login.isPending}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current?.focus()}
            blurOnSubmit={false}
          />
          <HelperText type="error" visible={!!errors.email}>
            {errors.email}
          </HelperText>
        </View>

        <View>
          <TextInput
            ref={passwordRef}
            label="Şifre"
            value={credentials.password}
            onChangeText={(text) => {
              setCredentials((prev) => ({ ...prev, password: text }));
              if (errors.password)
                setErrors((prev) => ({ ...prev, password: undefined }));
            }}
            secureTextEntry={!showPassword}
            mode="outlined"
            error={!!errors.password}
            disabled={login.isPending}
            right={
              <TextInput.Icon
                icon={showPassword ? "eye-off" : "eye"}
                onPress={() => setShowPassword(!showPassword)}
              />
            }
            returnKeyType="done"
            onSubmitEditing={handleLogin}
          />
          <HelperText type="error" visible={!!errors.password}>
            {errors.password}
          </HelperText>
        </View>

        {login.error && (
          <Text className="text-red-500 text-center">
            {login.error.message}
          </Text>
        )}

        <Button
          mode="contained"
          onPress={handleLogin}
          loading={login.isPending}
          disabled={login.isPending}
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

        <Link href="forgot-password" asChild>
          <Text
            variant="bodyMedium"
            className="text-center text-blue-600 underline"
          >
            Şifremi unuttum
          </Text>
        </Link>
      </View>
    </View>
  );
}
