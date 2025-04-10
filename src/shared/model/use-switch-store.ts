import { create, StoreApi, UseBoundStore } from "zustand";
import { persist } from 'zustand/middleware'
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ISwitchStore {
    enabled: boolean
    setEnabled: () => void
}

const switchStorage: Record<string, UseBoundStore<StoreApi<ISwitchStore>>> = {};

export const useSwitchStore = (storeKey: string) => {
    if (!switchStorage[storeKey]) {
        switchStorage[storeKey] = create<ISwitchStore>()(
            persist(
                (set) => ({
                    enabled: false,
                    setEnabled: () => set((state) => ({ enabled: !state.enabled }))
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
                    }
                }
            ))
    }
    return switchStorage[storeKey]()
}