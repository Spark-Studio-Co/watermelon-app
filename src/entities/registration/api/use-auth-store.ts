import reactQueryClient from "@/src/app/config/queryClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { clearAllSwitchStores } from "@/src/shared/model/use-switch-store";

interface IAuthStore {
  token: string | null | undefined;
  tempToken: string | null; // Временный токен до завершения флоу
  id: string | null;
  isNewLogin: boolean;
  isRegistrationComplete: boolean;
  isOnboardingComplete: boolean;
  shouldNavigateToMain: boolean;
  setToken: (token: string | null) => void;
  setTempToken: (token: string | null) => void;
  setIsNewLogin: (value: boolean) => void;
  setRegistrationComplete: (value: boolean) => void;
  setOnboardingComplete: (value: boolean) => void;
  completeAuthFlow: () => Promise<void>;
  resetNavigationFlag: () => void;
  logout: () => void;
  loadToken: () => Promise<void>;
  setId: (id: string) => void;
  loadId: () => void;
  loadRegistrationStatus: () => Promise<void>;
  loadOnboardingStatus: () => Promise<void>;
}

export const useAuthStore = create<IAuthStore>((set, get) => ({
  id: null,
  token: undefined,
  tempToken: null,
  isNewLogin: false,
  isRegistrationComplete: false,
  isOnboardingComplete: false,
  shouldNavigateToMain: false,

  setId: async (id) => {
    await AsyncStorage.setItem("userId", id);
    set({ id: id });
  },

  loadId: async () => {
    const id = await AsyncStorage.getItem("userId");
    set({ id: id || null });
  },

  setIsNewLogin: (value: boolean) => set({ isNewLogin: value }),

  setToken: async (token) => {
    if (!token) {
      await AsyncStorage.removeItem("authToken");
      return set({ token: null });
    }
    await AsyncStorage.setItem("authToken", token);
    set({ token });
  },

  setTempToken: (token) => {
    console.log("🔧 setTempToken вызван с:", token);
    set({ tempToken: token });
  },

  logout: async () => {
    try {
      // Clear the entire AsyncStorage
      await AsyncStorage.clear();
      console.log("✅ Successfully cleared all AsyncStorage data");
    } catch (error) {
      console.error("❌ Error clearing AsyncStorage:", error);

      // Fallback: try to remove critical items individually
      try {
        await AsyncStorage.removeItem("authToken");
        await AsyncStorage.removeItem("userId");
        console.log("✅ Cleared critical auth items from AsyncStorage");
      } catch (fallbackError) {
        console.error("❌ Error clearing critical auth items:", fallbackError);
      }
    }

    // Reset query client
    reactQueryClient.resetQueries();
    reactQueryClient.clear();

    // Clear all switch stores when logging out
    clearAllSwitchStores();

    // Reset state
    set({
      token: null,
      tempToken: null,
      isNewLogin: false,
      id: null,
      isRegistrationComplete: false,
      isOnboardingComplete: false,
      shouldNavigateToMain: false,
    });
  },

  loadToken: async () => {
    const token = await AsyncStorage.getItem("authToken");
    set({ token: token || null });
  },

  setRegistrationComplete: async (value: boolean) => {
    console.log("🔧 setRegistrationComplete вызван с:", value);
    await AsyncStorage.setItem("registrationComplete", value.toString());
    set({ isRegistrationComplete: value });
    console.log(
      "✅ setRegistrationComplete завершен, значение в AsyncStorage:",
      await AsyncStorage.getItem("registrationComplete")
    );
  },

  loadRegistrationStatus: async () => {
    const status = await AsyncStorage.getItem("registrationComplete");
    set({ isRegistrationComplete: status === "true" });
  },

  setOnboardingComplete: async (value: boolean) => {
    console.log("🔧 setOnboardingComplete вызван с:", value);
    await AsyncStorage.setItem("onboardingComplete", value.toString());
    set({ isOnboardingComplete: value });
    console.log(
      "✅ setOnboardingComplete завершен, значение в AsyncStorage:",
      await AsyncStorage.getItem("onboardingComplete")
    );
  },

  loadOnboardingStatus: async () => {
    const status = await AsyncStorage.getItem("onboardingComplete");
    set({ isOnboardingComplete: status === "true" });
  },

  completeAuthFlow: async () => {
    const currentState = get();
    console.log("🎯 completeAuthFlow: завершаем весь флоу авторизации");
    console.log("  Текущее состояние token:", currentState.token);
    console.log("  Текущее состояние tempToken:", currentState.tempToken);
    console.log("  Текущее состояние ID:", currentState.id);

    // Устанавливаем оба флага
    await AsyncStorage.setItem("registrationComplete", "true");
    await AsyncStorage.setItem("onboardingComplete", "true");

    // Если есть временный токен, делаем его основным
    if (currentState.tempToken) {
      await AsyncStorage.setItem("authToken", currentState.tempToken);
      console.log("🔑 Устанавливаем tempToken как основной token");
    }

    // Обновляем состояние и устанавливаем флаг навигации
    set({
      token: currentState.tempToken || currentState.token, // Используем tempToken если он есть
      tempToken: null, // Очищаем временный токен
      isRegistrationComplete: true,
      isOnboardingComplete: true,
      shouldNavigateToMain: true,
    });

    const newState = get();
    console.log("✅ completeAuthFlow: флаги установлены");
    console.log("  Новое состояние - token:", newState.token);
    console.log("  Новое состояние - tempToken:", newState.tempToken);
    console.log(
      "  Новое состояние - registrationComplete:",
      newState.isRegistrationComplete
    );
    console.log(
      "  Новое состояние - onboardingComplete:",
      newState.isOnboardingComplete
    );
    console.log(
      "  Новое состояние - shouldNavigateToMain:",
      newState.shouldNavigateToMain
    );
  },

  resetNavigationFlag: () => {
    console.log("🔄 resetNavigationFlag: сбрасываем флаг навигации");
    set({ shouldNavigateToMain: false });
  },
}));
