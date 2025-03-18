import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from './src/app/navigation/RootNavigator';
import { View } from 'react-native';
import { useFonts } from "expo-font";
import { useEffect, useState } from 'react';
import { SplashScreen } from 'expo-router';
import { QueryClientProvider } from '@tanstack/react-query';
import reactQueryClient from './src/app/config/queryClient';

import './global.css';

export default function App() {

    const [fontsLoaded] = useFonts({
        "Poppins-Thin": require("./assets/fonts/Poppins/Poppins-Thin.ttf"),
        "Poppins-ExtraLight": require("./assets/fonts/Poppins/Poppins-ExtraLight.ttf"),
        "Poppins-Light": require("./assets/fonts/Poppins/Poppins-Light.ttf"),
        "Poppins-Regular": require("./assets/fonts/Poppins/Poppins-Regular.ttf"),
        "Poppins-Medium": require("./assets/fonts/Poppins/Poppins-Medium.ttf"),
        "Poppins-SemiBold": require("./assets/fonts/Poppins/Poppins-SemiBold.ttf"),
        "Poppins-Bold": require("./assets/fonts/Poppins/Poppins-Bold.ttf"),
        "Poppins-ExtraBold": require("./assets/fonts/Poppins/Poppins-ExtraBold.ttf"),
        "Poppins-Black": require("./assets/fonts/Poppins/Poppins-Black.ttf"),
    });

    const [isSplashVisible, setIsSplashVisible] = useState(true);

    useEffect(() => {
        const hideSplash = async () => {
            try {
                if (fontsLoaded) {
                    setIsSplashVisible(false);
                    await SplashScreen.hideAsync();
                }
            } catch (e) {
                console.warn("Error hiding splash screen:", e);
            }
        };

        hideSplash();
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }


    return (
        <QueryClientProvider client={reactQueryClient}>
            <GestureHandlerRootView >
                <SafeAreaProvider>
                    <View className="flex-1 w-full m-auto bg-transparent">
                        <RootNavigator />
                    </View>
                </SafeAreaProvider>
            </GestureHandlerRootView>
        </QueryClientProvider>
    );
}



