import reactQueryClient from '@/src/app/config/queryClient';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from "zustand";

interface IAuthStore {
    token: string | null | undefined;
    setToken: (token: string | null) => void;
    logout: () => void;
    loadToken: () => Promise<void>;
}

export const useAuthStore = create<IAuthStore>((set) => ({
    token: undefined,

    setToken: async (token) => {
        if (!token) return set({ token: null });
        await AsyncStorage.setItem("authToken", token);
        set({ token });
    },

    logout: async () => {
        await AsyncStorage.removeItem("authToken");
        reactQueryClient.resetQueries();
        reactQueryClient.clear();
        set({ token: null });
    },


    loadToken: async () => {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
            set({ token });
        }
    },
}));