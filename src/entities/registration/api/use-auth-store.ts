import reactQueryClient from '@/src/app/config/queryClient';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from "zustand";

interface IAuthStore {
    token: string | null | undefined;
    isNewLogin: boolean;
    setToken: (token: string | null) => void;
    setIsNewLogin: (value: boolean) => void;
    logout: () => void;
    loadToken: () => Promise<void>;
}

export const useAuthStore = create<IAuthStore>((set) => ({
    token: undefined,
    isNewLogin: false,

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
        await AsyncStorage.removeItem("authToken");
        reactQueryClient.resetQueries();
        reactQueryClient.clear();
        set({ token: null, isNewLogin: false });
    },

    loadToken: async () => {
        const token = await AsyncStorage.getItem("authToken");
        set({ token: token || null });
    },
}));