import reactQueryClient from "@/src/app/config/queryClient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { clearAllSwitchStores } from "@/src/shared/model/use-switch-store";

interface IAuthStore {
  token: string | null | undefined;
  id: string | null;
  isNewLogin: boolean;
  isRegistrationComplete: boolean;
  isOnboardingComplete: boolean;
  setToken: (token: string | null) => void;
  setIsNewLogin: (value: boolean) => void;
  setRegistrationComplete: (value: boolean) => void;
  setOnboardingComplete: (value: boolean) => void;
  logout: () => void;
  loadToken: () => Promise<void>;
  setId: (id: string) => void;
  loadId: () => void;
  loadRegistrationStatus: () => Promise<void>;
  loadOnboardingStatus: () => Promise<void>;
}

export const useAuthStore = create<IAuthStore>((set) => ({
  id: null,
  token: undefined,
  isNewLogin: false,
  isRegistrationComplete: false,
  isOnboardingComplete: false,

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
      isNewLogin: false,
      id: null,
      isRegistrationComplete: false,
      isOnboardingComplete: false,
    });
  },

  loadToken: async () => {
    const token = await AsyncStorage.getItem("authToken");
    set({ token: token || null });
  },

  setRegistrationComplete: async (value: boolean) => {
    await AsyncStorage.setItem("registrationComplete", value.toString());
    set({ isRegistrationComplete: value });
  },

  loadRegistrationStatus: async () => {
    const status = await AsyncStorage.getItem("registrationComplete");
    set({ isRegistrationComplete: status === "true" });
  },

  setOnboardingComplete: async (value: boolean) => {
    await AsyncStorage.setItem("onboardingComplete", value.toString());
    set({ isOnboardingComplete: value });
  },

  loadOnboardingStatus: async () => {
    const status = await AsyncStorage.getItem("onboardingComplete");
    set({ isOnboardingComplete: status === "true" });
  },
}));
