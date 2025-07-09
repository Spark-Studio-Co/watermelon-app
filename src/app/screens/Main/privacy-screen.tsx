import { View } from "react-native";
import Text from "@/src/shared/ui/text/text";
import { MainLayout } from "../../layouts/main-layout";
import { Switch } from "@/src/shared/ui/switch/switch";

import { useSwitchStore } from "@/src/shared/model/use-switch-store";
import { useAuthStore } from "@/src/entities/registration/api/use-auth-store";
import { useUpdatePrivcy } from "@/src/entities/users/api/use-update-privacy";
import { useGetMe } from "@/src/entities/users/api/use-get-me";

export const PrivacyScreen = () => {
  const { id } = useAuthStore();
  const { mutate } = useUpdatePrivcy(id);
  const { data: userData, isLoading, refetch } = useGetMe();

  const mapStore = useSwitchStore("map");
  const auctionStore = useSwitchStore("auction");
  const activityStore = useSwitchStore("activity");

  const updatePrivacy = (
    newMapAccess: boolean,
    newAuction: boolean,
    newActivity: boolean
  ) => {
    mutate(
      {
        isMapAccess: newMapAccess,
        isAuction: newAuction,
        isActivities: newActivity,
      },
      {
        onSuccess: () => {
          console.log("Privacy updated");
          refetch();
        },
        onError: (error: any) => console.error(error.response),
      }
    );
  };

  const handleMapAccess = () => {
    const newValue = !userData?.isMapAccess;
    mapStore.setEnabled(newValue);
    updatePrivacy(
      newValue,
      userData?.isAuction ?? false,
      userData?.isActivities ?? false
    );
  };

  const handleAuction = () => {
    const newValue = !userData?.isAuction;
    auctionStore.setEnabled(newValue);
    updatePrivacy(
      userData?.isMapAccess ?? false,
      newValue,
      userData?.isActivities ?? false
    );
  };

  const handleActivity = () => {
    const newValue = !userData?.isActivities;
    activityStore.setEnabled(newValue);
    updatePrivacy(
      userData?.isMapAccess ?? false,
      userData?.isAuction ?? false,
      newValue
    );
  };

  return (
    <MainLayout isBack title="Приватность">
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
                Доступ друзей к карте
              </Text>
              <Text
                weight="regular"
                className="text-[#6B6B6B] text-[14px] mt-0.5"
              >
                Делиться приватными точками на картах друзей
              </Text>
            </View>
            <Switch
              enabled={userData?.isMapAccess ?? false}
              toggle={handleMapAccess}
            />
          </View>
          <View className="flex flex-row justify-between w-[100%] mt-10 items-center">
            <View className="flex flex-col w-[80%]">
              <Text weight="regular" className="text-white text-[16px]">
                Участие в аукционе
              </Text>
              <Text
                weight="regular"
                className="text-[#6B6B6B] text-[14px] mt-0.5"
              >
                Указывать мое имя пользователя во время участия в аукционе
              </Text>
            </View>
            <Switch
              enabled={userData?.isAuction ?? false}
              toggle={handleAuction}
            />
          </View>
          <View className="flex flex-row justify-between w-[100%] mt-10 items-center">
            <View className="flex flex-col w-[70%]">
              <Text weight="regular" className="text-white text-[16px]">
                Активности
              </Text>
              <Text
                weight="regular"
                className="text-[#6B6B6B] text-[14px] mt-0.5"
              >
                Отображать мои достижения в разделе активности
              </Text>
            </View>
            <Switch
              enabled={userData?.isActivities ?? false}
              toggle={handleActivity}
            />
          </View>
        </View>
      )}
    </MainLayout>
  );
};
