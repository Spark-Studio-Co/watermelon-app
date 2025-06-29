import reactQueryClient from '@/src/app/config/queryClient';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from "zustand";
import { clearAllSwitchStores } from '@/src/shared/model/use-switch-store';

interface IAuthStore {
    token: string | null | undefined;
    id: string | null
    isNewLogin: boolean;
    setToken: (token: string | null) => void;
    setIsNewLogin: (value: boolean) => void;
    logout: () => void;
    loadToken: () => Promise<void>;
    setId: (id: string) => void;
    loadId: () => void
}

export const useAuthStore = create<IAuthStore>((set) => ({
    id: null,
    token: undefined,
    isNewLogin: false,

    setId: async (id) => {
        await AsyncStorage.setItem("userId", id)
        set({ id: id })
    },

    loadId: async () => {
        const id = await AsyncStorage.getItem("userId");
        set({ id: id || null })
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
        set({ token: null, isNewLogin: false, id: null });
    },

    loadToken: async () => {
        const token = await AsyncStorage.getItem("authToken");
        set({ token: token || null });
    },
}));