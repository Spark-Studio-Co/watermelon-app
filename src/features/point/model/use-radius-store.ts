import { create } from "zustand";
import { persist, StateStorage, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface IRadiusStore {
    color: string
    setColor: (color: string) => void
}

const radiusColors: StateStorage = {
    setItem: async (name, value) => {
        await AsyncStorage.setItem(name, JSON.stringify(value))
    },
    getItem: async (name) => {
        const value = await AsyncStorage.getItem(name)
        return value ? JSON.parse(value) : null
    },
    removeItem: async (name) => {
        await AsyncStorage.removeItem(name)
    },
}

export const useRadiusStore = create<IRadiusStore>()(
    persist(
        (set) => ({
            color: "transparent",
            setColor: (color: string) => set({ color })
        }),
        {
            name: "radius-storage",
            storage: createJSONStorage(() => radiusColors)
        }
    )
) 