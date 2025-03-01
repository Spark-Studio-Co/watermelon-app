import React from "react"
import { View, Alert } from "react-native"
import { MainLayout } from "../../layouts/main-layout"
import Text from "@/src/shared/ui/text/text"
import { UserTab } from "@/src/features/user-tab/ui/user-tab"
import { WeeklyChallengeTab } from "@/src/features/weekly-challenge-tab/ui/weekly-challenge-tab"
import { ScreensNavigationPanel } from "@/src/features/screens-navigation-panel/ui/screens-navigaton-panel"
import { Button } from "@/src/shared/ui/button/button"

import { useAuthToken } from "@/src/entities/registration/api/use-auth-token"

export const DashboardScreen = () => {
    const { removeToken, setIsAuthenticated } = useAuthToken();

    const handleLogOut = async () => {
        console.log('Logging out...');
        await removeToken();
        setIsAuthenticated(false);
        console.log('Navigation reset to Auth');
    };

    return (
        <MainLayout>
            <View className="mt-10 flex items-center justify-center w-full">
                <UserTab />
                <View className="w-[90%] flex items-start flex-col mt-4">
                    <Text weight="bold" className="text-white text-[24px]">Weekly Challenge</Text>
                    <WeeklyChallengeTab />
                    <ScreensNavigationPanel />
                    <Button onPress={handleLogOut} variant={"custom"} className="bg-red-500 w-full h-[60px] flex items-center justify-center">
                        <Text className="text-white text-xl">Log out</Text>
                    </Button>
                </View>
            </View>
        </MainLayout>
    );
};