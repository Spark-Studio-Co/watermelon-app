import { create, StoreApi, UseBoundStore } from "zustand";
import { persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ISwitchStore {
  enabled: boolean;
  setEnabled: (value: boolean) => void;
  reset: () => void;
}

const switchStorage: Record<string, UseBoundStore<StoreApi<ISwitchStore>>> = {};

export const useSwitchStore = (storeKey: string) => {
  if (!switchStorage[storeKey]) {
    switchStorage[storeKey] = create<ISwitchStore>()(
      persist(
        (set) => ({
          enabled: false,
          setEnabled: (value: boolean) => set({ enabled: value }),
          reset: () => set({ enabled: false }),
        }),
        {
          name: `switch-${storeKey}`,
          storage: {
            getItem: async (key) => {
              const value = await AsyncStorage.getItem(key);
              return value ? JSON.parse(value) : null;
            },
            setItem: async (key, value) => {
              await AsyncStorage.setItem(key, JSON.stringify(value));
            },
            removeItem: async (key) => {
              await AsyncStorage.removeItem(key);
            },
          },
        }
      )
    );
  }
  return switchStorage[storeKey]();
};

// Function to clear all switch stores when logging out
export const clearAllSwitchStores = () => {
  Object.keys(switchStorage).forEach((key) => {
    const store = switchStorage[key];
    store.getState().reset();
  });
};
