import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar, View, ActivityIndicator } from "react-native";

import { useAuthStore } from "@/src/entities/registration/api/use-auth-store";

// stacks
import { AuthStack } from "./stacks/AuthStack";
import { MainStack } from "./stacks/MainStack";

export const RootNavigator = () => {
  const {
    token,
    loadToken,
    loadId,
    id,
    isRegistrationComplete,
    isOnboardingComplete,
    shouldNavigateToMain,
    resetNavigationFlag,
    loadRegistrationStatus,
    loadOnboardingStatus,
  } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      await loadToken();
      await loadRegistrationStatus();
      await loadOnboardingStatus();
      loadId();
      setIsLoading(false);
    };
    checkToken();
  }, []);

  useEffect(() => {
    console.log("🔍 Состояние изменилось:");
    console.log("  Token:", token);
    console.log("  ID:", id);
    console.log("  Registration complete:", isRegistrationComplete);
    console.log("  Onboarding complete:", isOnboardingComplete);
    console.log("  Should navigate to main:", shouldNavigateToMain);
    console.log(
      "  Должен показывать MainStack:",
      !!(token && isRegistrationComplete && isOnboardingComplete)
    );
  }, [
    token,
    id,
    isRegistrationComplete,
    isOnboardingComplete,
    shouldNavigateToMain,
  ]);

  // Отдельный
  //  useEffect для отслеживания флага навигации
  useEffect(() => {
    if (shouldNavigateToMain) {
      console.log(
        "🎯 shouldNavigateToMain = true, принудительно перерендериваем..."
      );
      // Сбрасываем флаг после обработки
      setTimeout(() => {
        resetNavigationFlag();
      }, 1000);
    }
  }, [shouldNavigateToMain, resetNavigationFlag]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  const shouldShowMainStack =
    token && isRegistrationComplete && isOnboardingComplete;

  return (
    <NavigationContainer>
      <StatusBar translucent backgroundColor="transparent" />
      {shouldShowMainStack ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
