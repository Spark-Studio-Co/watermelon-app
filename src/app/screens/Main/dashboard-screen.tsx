import React from "react"
import { View, Alert } from "react-native"
import { MainLayout } from "../../layouts/main-layout"
import Text from "@/src/shared/ui/text/text"
import { WeeklyChallengeTab } from "@/src/features/weekly-challenge-tab/ui/weekly-challenge-tab"
import { ScreensNavigationPanel } from "@/src/features/screens-navigation-panel/ui/screens-navigaton-panel"
import { Button } from "@/src/shared/ui/button/button"

import { useAuthStore } from "@/src/entities/registration/api/use-auth-store"

export const DashboardScreen = () => {
    const { logout } = useAuthStore();

    const handleLogOut = async () => {
        setTimeout(() => logout(), 1000)
    };

    return (
        <MainLayout isUserTab isWeeklyChallenge>
            <View className="flex items-center justify-center w-full">
                <View className="w-[90%] flex items-start flex-col">
                    <ScreensNavigationPanel />
                    <Button onPress={handleLogOut} variant={"custom"} className="bg-red-500 w-full h-[60px] flex items-center justify-center mt-8">
                        <Text className="text-white text-xl">Log out</Text>
                    </Button>
                </View>
            </View>
        </MainLayout>
    );
};