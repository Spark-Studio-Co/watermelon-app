import { View } from "react-native";
import Text from "@/src/shared/ui/text/text";
import { MainLayout } from "../../layouts/main-layout";
import { Switch } from "@/src/shared/ui/switch/switch";

import { useSwitchStore } from "@/src/shared/model/use-switch-store";
import { useUpdateNotifications } from "@/src/entities/users/api/use-notifications-settings";
import { useAuthStore } from "@/src/entities/registration/api/use-auth-store";
import { useGetMe } from "@/src/entities/users/api/use-get-me";

export const NotificationsScreen = () => {
  const { id } = useAuthStore();
  const { mutate } = useUpdateNotifications(id);
  const { data: userData, isLoading, refetch } = useGetMe();

  const notificationsStore = useSwitchStore("notifications");
  const friendsStore = useSwitchStore("friends");
  const messagesStore = useSwitchStore("messages");

  const updateNotifications = (
    isAllNotifications: boolean,
    isNewMessages: boolean,
    isFriendsRequests: boolean
  ) => {
    mutate(
      {
        isAllNotifications,
        isNewMessages,
        isFriendsRequests,
      },
      {
        onSuccess: () => {
          console.log("Notifications updated");
          refetch();
        },
        onError: (error: any) => console.error(error.response),
      }
    );
  };

  const handleNotifications = () => {
    const newValue = !userData?.isAllNotifications;
    notificationsStore.setEnabled(newValue);
    updateNotifications(
      newValue,
      userData?.isNewMessages ?? false,
      userData?.isFriendsRequests ?? false
    );
  };

  const handleMessages = () => {
    const newValue = !userData?.isNewMessages;
    messagesStore.setEnabled(newValue);
    updateNotifications(
      userData?.isAllNotifications ?? false,
      newValue,
      userData?.isFriendsRequests ?? false
    );
  };

  const handleFriends = () => {
    const newValue = !userData?.isFriendsRequests;
    friendsStore.setEnabled(newValue);
    updateNotifications(
      userData?.isAllNotifications ?? false,
      userData?.isNewMessages ?? false,
      newValue
    );
  };

  return (
    <MainLayout isBack title="Уведомления">
      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <Text weight="regular" className="text-white">
            Загрузка...
          </Text>
        </View>
      ) : (
        <View className="px-6 py-6 rounded-[15px] w-full mt-6">
          <View className="flex flex-row justify-between w-[100%] items-center">
            <View className="flex flex-col w-[80%]">
              <Text weight="regular" className="text-white text-[16px]">
                Все уведомления
              </Text>
              <Text
                weight="regular"
                className="text-[#6B6B6B] text-[14px] mt-0.5"
              >
                Вы можете убрать все уведомления приложения
              </Text>
            </View>
            <Switch
              enabled={userData?.isAllNotifications ?? false}
              toggle={handleNotifications}
            />
          </View>

          <View className="flex flex-row justify-between w-[100%] mt-10 items-center">
            <View className="flex flex-col w-[80%]">
              <Text weight="regular" className="text-white text-[16px]">
                Новые сообщения
              </Text>
              <Text
                weight="regular"
                className="text-[#6B6B6B] text-[14px] mt-0.5"
              >
                Вы можете убрать уведомления о новых сообщениях
              </Text>
            </View>
            <Switch
              enabled={userData?.isNewMessages ?? false}
              toggle={handleMessages}
            />
          </View>

          <View className="flex flex-row justify-between w-[100%] mt-10 items-center">
            <View className="flex flex-col w-[70%]">
              <Text weight="regular" className="text-white text-[16px]">
                Запросы в друзья
              </Text>
              <Text
                weight="regular"
                className="text-[#6B6B6B] text-[14px] mt-0.5"
              >
                Вы можете убрать уведомления о новых заявках в друзья
              </Text>
            </View>
            <Switch
              enabled={userData?.isFriendsRequests ?? false}
              toggle={handleFriends}
            />
          </View>
        </View>
      )}
    </MainLayout>
  );
};
