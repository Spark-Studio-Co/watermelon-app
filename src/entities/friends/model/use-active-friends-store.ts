import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface IActiveStore {
    active: Record<string, boolean>;
    setActive: (key: string, value: boolean) => void;
}

export const useActiveFriendsStore = create<IActiveStore>()(
    persist(
        (set) => ({
            active: {},
            setActive: (key, value) =>
                set((state) => {
                    if (state.active[key] === value) return state;
                    return {
                        active: {
                            ...state.active,
                            [key]: value,
                        },
                    };
                }),
        }),
        {
            name: "active-friends-storage",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);