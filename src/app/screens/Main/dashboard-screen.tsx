import React from "react";
import { View } from "react-native";
import { MainLayout } from "../../layouts/main-layout";
import { ScreensNavigationPanel } from "@/src/features/screens-navigation-panel/ui/screens-navigaton-panel";

export const DashboardScreen = () => {
  return (
    <MainLayout isUserTab isWeeklyChallenge>
      <View className="flex items-center justify-center w-full">
        <View className="w-[90%] flex items-start flex-col">
          <ScreensNavigationPanel />
        </View>
      </View>
    </MainLayout>
  );
};
