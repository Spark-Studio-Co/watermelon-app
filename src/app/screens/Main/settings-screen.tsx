import { ImageBackground, View } from "react-native";
import Text from "@/src/shared/ui/text/text";
import { MainLayout } from "../../layouts/main-layout";
import { UserSettingsTab } from "@/src/features/user/ui/user-settings-tab";
import { Button } from "@/src/shared/ui/button/button";
import { SeettingsButton } from "@/src/shared/ui/settings-button/settings-button";

import { useNavigation } from "@react-navigation/native";
import { useGetMe } from "@/src/entities/users/api/use-get-me";
import { useAuthStore } from "@/src/entities/registration/api/use-auth-store";
import { useSubscribePremium } from "@/src/entities/users/api/make-me-premium";

import { Platform } from "react-native";

// icons
import PrivateDataIcon from "@/src/shared/icons/private-data-icon";
import PrivacyIcon from "@/src/shared/icons/privacy-icon";
import BellIcon from "@/src/shared/icons/bell-icon";
import ChangeLanguageIcon from "@/src/shared/icons/change-language-icon";
import LogoutIcon from "@/src/shared/icons/logout-icon";
import { apiClient } from "../../config/apiClient";

export const SettingsScreen = () => {
  const { logout } = useAuthStore();
  const { data: me } = useGetMe();

  // Function to reset user settings before logout
  const resetUserSettings = async () => {
    try {
      await apiClient.patch(`/users/user/${me?.id}/reset-settings`);
      console.log("User settings reset successfully");
    } catch (error) {
      console.error("Failed to reset user settings:", error);
    }
  };

  const handleLogOut = async () => {
    if (me?.id) {
      await resetUserSettings();
    }
    setTimeout(() => logout(), 1000);
  };

  const { navigate } = useNavigation();

  const { mutate } = useSubscribePremium();

  const settings = [
    {
      icon: <BellIcon />,
      label: "Уведомления",
      onPress: () => navigate("Notifications" as never),
    },
    {
      icon: <PrivacyIcon />,
      label: "Приватность",
      onPress: () => navigate("Privacy" as never),
      className: "mt-2",
    },
    {
      icon: <PrivateDataIcon />,
      label: "Изменить данные",
      onPress: () => navigate("PrivateData" as never),
    },
    {
      icon: <ChangeLanguageIcon />,
      label: "Изменить язык",
    },
    {
      icon: <LogoutIcon />,
      label: "Выйти из аккаунта",
      onPress: handleLogOut,
    },
  ];

  return (
    <MainLayout>
      <Text weight="medium" className="text-white text-[22px] ml-4 mt-4">
        Settings
      </Text>
      <View className="flex flex-col mx-auto">
        <UserSettingsTab
          username={me?.name ? me?.name : "User Name"}
          nickname={me?.username ? me?.username : "user_name"}
          lvl={
            //@ts-ignore
            me?.level?.id ? me?.level?.id : 0
          }
        />
      </View>
      <View className="max-w-[331px] mx-auto">
        <View
          className={`px-4 ${
            Platform.OS === "ios" ? "mt-10" : "mt-6"
          } flex flex-col gap-y-8`}
        >
          {settings.map((item, index) => (
            <SeettingsButton
              key={index}
              icon={item.icon}
              label={item.label}
              onPress={item.onPress}
              className={item.className}
            />
          ))}
        </View>
      </View>
      <Button
        className="flex items-center justify-center mt-8"
        onPress={() => mutate()}
      >
        <Text weight="medium" className="text-white text-[16px]">
          Make premium
        </Text>
      </Button>
    </MainLayout>
  );
};
