// app/(auth)/register.tsx
import { useRegister } from "@/hooks/auth/useRegister";
import { RegisterData } from "@/types/api";
import { Link } from "expo-router";
import { useRef, useState } from "react";
import { Keyboard, TextInput as RNTextInput, View } from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  apartmentNo?: string;
}

export default function RegisterScreen() {
  const [formData, setFormData] = useState<RegisterData>({
    name: "",
    email: "",
    password: "",
    apartmentNo: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);

  const emailRef = useRef<RNTextInput>(null);
  const passwordRef = useRef<RNTextInput>(null);
  const apartmentNoRef = useRef<RNTextInput>(null);

  const register = useRegister();

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Ad Soyad gerekli";
    }

    if (!formData.email) {
      newErrors.email = "E-posta adresi gerekli";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Geçerli bir e-posta adresi girin";
    }

    if (!formData.password) {
      newErrors.password = "Şifre gerekli";
    } else if (formData.password.length < 6) {
      newErrors.password = "Şifre en az 6 karakter olmalı";
    }

    if (!formData.apartmentNo?.trim()) {
      newErrors.apartmentNo = "Daire numarası gerekli";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    Keyboard.dismiss();
    if (!validateForm()) return;

    try {
      await register.mutateAsync(formData);
    } catch (error) {
      // Error handling is done in useRegister hook
    }
  };

  return (
    <View className="flex-1 justify-center px-4 bg-white">
      <View className="bg-white p-6 rounded-lg space-y-4 max-w-md w-full mx-auto">
        <View className="mb-8">
          <Text variant="headlineMedium" className="text-center">
            Hesap Oluştur
          </Text>
          <Text variant="bodyMedium" className="text-center text-gray-600 mt-2">
            Site yönetim sistemine kayıt olun
          </Text>
        </View>

        <View>
          <TextInput
            label="Ad Soyad"
            value={formData.name}
            onChangeText={(text) => {
              setFormData((prev) => ({ ...prev, name: text }));
              if (errors.name)
                setErrors((prev) => ({ ...prev, name: undefined }));
            }}
            mode="outlined"
            error={!!errors.name}
            disabled={register.isPending}
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current?.focus()}
            blurOnSubmit={false}
          />
          <HelperText type="error" visible={!!errors.name}>
            {errors.name}
          </HelperText>
        </View>

        <View>
          <TextInput
            ref={emailRef}
            label="E-posta"
            value={formData.email}
            onChangeText={(text) => {
              setFormData((prev) => ({ ...prev, email: text }));
              if (errors.email)
                setErrors((prev) => ({ ...prev, email: undefined }));
            }}
            autoCapitalize="none"
            keyboardType="email-address"
            mode="outlined"
            error={!!errors.email}
            disabled={register.isPending}
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
            value={formData.password}
            onChangeText={(text) => {
              setFormData((prev) => ({ ...prev, password: text }));
              if (errors.password)
                setErrors((prev) => ({ ...prev, password: undefined }));
            }}
            secureTextEntry={!showPassword}
            mode="outlined"
            error={!!errors.password}
            disabled={register.isPending}
            right={
              <TextInput.Icon
                icon={showPassword ? "eye-off" : "eye"}
                onPress={() => setShowPassword(!showPassword)}
              />
            }
            returnKeyType="next"
            onSubmitEditing={() => apartmentNoRef.current?.focus()}
            blurOnSubmit={false}
          />
          <HelperText type="error" visible={!!errors.password}>
            {errors.password}
          </HelperText>
        </View>

        <View>
          <TextInput
            ref={apartmentNoRef}
            label="Daire No"
            value={formData.apartmentNo}
            onChangeText={(text) => {
              setFormData((prev) => ({ ...prev, apartmentNo: text }));
              if (errors.apartmentNo)
                setErrors((prev) => ({ ...prev, apartmentNo: undefined }));
            }}
            mode="outlined"
            error={!!errors.apartmentNo}
            disabled={register.isPending}
            keyboardType="number-pad"
            returnKeyType="done"
            onSubmitEditing={handleRegister}
          />
          <HelperText type="error" visible={!!errors.apartmentNo}>
            {errors.apartmentNo}
          </HelperText>
        </View>

        {register.error && (
          <Text className="text-red-500 text-center">
            {register.error.message}
          </Text>
        )}

        <Button
          mode="contained"
          onPress={handleRegister}
          loading={register.isPending}
          disabled={register.isPending}
        >
          Kayıt Ol
        </Button>

        <View className="flex-row justify-center space-x-1 mt-4">
          <Text variant="bodyMedium" className="text-gray-600">
            Zaten hesabınız var mı?
          </Text>
          <Link href="/(auth)/login" asChild>
            <Text variant="bodyMedium" className="text-blue-600">
              Giriş yapın
            </Text>
          </Link>
        </View>
      </View>
    </View>
  );
}
