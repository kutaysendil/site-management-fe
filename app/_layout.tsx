import { useAppState } from "@/hooks/query/useAppState";
import { useOnlineManager } from "@/hooks/query/useOnlineManager";
import { useAuthStore } from "@/stores/authStore";
import {
  QueryClient,
  QueryClientProvider,
  focusManager,
} from "@tanstack/react-query";
import { Slot, SplashScreen } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";
import { AppStateStatus, Platform } from "react-native";
import { MD3LightTheme, PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Splash screen'i göster
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 60 * 5, // 5 dakika
    },
  },
});

const theme = {
  ...MD3LightTheme,
  // Tema özelleştirmeleri buraya eklenebilir
};

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

export default function RootLayout() {
  const { setToken, isLoading, setIsLoading, setUser } = useAuthStore();

  useEffect(() => {
    async function loadInitialData() {
      try {
        const savedToken = await SecureStore.getItemAsync("token");
        if (savedToken) {
          setToken(savedToken);
          // Token varsa kullanıcı bilgilerini çek
          // const userData = await fetchUserData(savedToken);
          // setUser(userData);
        }
      } catch (error) {
        console.error("Initial data loading error:", error);
      } finally {
        setIsLoading(false);
        SplashScreen.hideAsync();
      }
    }
    loadInitialData();
  }, []);

  useOnlineManager();
  useAppState(onAppStateChange);

  if (isLoading) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <PaperProvider theme={theme}>
          <Slot />
        </PaperProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
