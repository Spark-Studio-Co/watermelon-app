import Text from "@/src/shared/ui/text/text"
import { View } from "react-native"
import { MainLayout } from "../layouts/main-layout"

import { UserTab } from "@/src/features/user-tab/ui/user-tab"
import { WeeklyChallengeTab } from "@/src/features/weekly-challenge-tab/ui/weekly-challenge-tab"
import { ScreensNavigationPanel } from "@/src/features/screens-navigation-panel/ui/screens-navigaton-panel"

export const DashboardScreen = () => {
    return (
        <MainLayout>
            <View className="mt-10 flex items-center justify-center w-full">
                <UserTab />
                <View className="w-[90%] flex items-start flex-col mt-4">
                    <Text weight="bold" className="text-white text-[24px]">Weekly Challenge</Text>
                    <WeeklyChallengeTab />
                    <ScreensNavigationPanel />
                </View>
            </View>
        </MainLayout>
    )
}
