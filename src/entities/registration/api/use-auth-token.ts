import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAuthToken = () => {
    const [token, setToken] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const fetchToken = async () => {
            const storedToken = await AsyncStorage.getItem('auth-token');
            setToken(storedToken);
            setIsAuthenticated(!!storedToken);
        };
        fetchToken();
    }, []);

    const saveToken = async (token: string) => {
        try {
            await AsyncStorage.setItem('auth-token', token);
            setToken(token);
            setIsAuthenticated(true);
        } catch (error) {
            console.error("Error saving token", error);
        }
    };

    const loadToken = async () => {
        try {
            const storedToken = await AsyncStorage.getItem('auth-token');
            setToken(storedToken);
            setIsAuthenticated(!!storedToken);
            return storedToken;
        } catch (error) {
            console.error("Error loading token", error);
            return null;
        }
    };

    const removeToken = async () => {
        try {
            await AsyncStorage.removeItem('auth-token');
            setToken(null);
            setIsAuthenticated(false); // ✅ Set auth state to false
        } catch (error) {
            console.error("Error removing token", error);
        }
    };

    return { token, isAuthenticated, setIsAuthenticated, saveToken, loadToken, removeToken };
};