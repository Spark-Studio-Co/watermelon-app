import { View, Image } from "react-native";
import Text from "@/src/shared/ui/text/text";
import { ModalWrapper } from "@/src/shared/ui/modal-wrapper/modal-wrapper";
import * as ImagePicker from "expo-image-picker";
import { Button } from "@/src/shared/ui/button/button";
import { CameraModalWidget } from "@/src/widget/camera/ui/camera-modal-widget";

import { useVisibleStore } from "@/src/shared/model/use-visible-store";
import { useCameraStore } from "@/src/widget/camera/model/camera-store";
import { useCameraPermissions } from "expo-camera";
import { useAuthStore } from "@/src/entities/registration/api/use-auth-store";
import { useUpdateUser } from "@/src/entities/users/api/use-update-user";
import { useGetMe } from "@/src/entities/users/api/use-get-me";
import { useQueryClient } from "@tanstack/react-query";

import ProfileFallbackIcon from "@/src/shared/icons/profile-fallback-icon";

interface IUserTab {
  username: string;
  nickname: string;
  lvl: number;
}

export const UserSettingsTab = ({ username, nickname, lvl }: IUserTab) => {
  const queryClient = useQueryClient();
  const { data: me } = useGetMe();
  const { id } = useAuthStore();
  const { mutate } = useUpdateUser(id);
  const { setImage } = useCameraStore("avatar");
  const { open } = useVisibleStore("avatar");
  const { open: openChoice, close: closeChoice } =
    useVisibleStore("avatarChoice");
  const [permission, requestPermission] = useCameraPermissions();

  const openCamera = async () => {
    const { granted } = await requestPermission();
    if (granted) {
      closeChoice();
      open();
    } else {
      console.log("Camera permission not granted");
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    closeChoice();

    if (!result.canceled && result.assets?.length) {
      const uri = result.assets[0].uri;
      setImage(uri);

      const fileName = uri.split("/").pop() || "avatar.jpg";
      const fileType = fileName.split(".").pop();

      const formData = new FormData();
      formData.append("avatar", {
        uri,
        name: fileName,
        type: `image/${fileType}`,
      } as any);

      mutate(formData, {
        onSuccess: () => {
          console.log("✅ Аватар обновлён");
          queryClient.invalidateQueries({
            queryKey: ["userMe"],
          });
        },
        onError: (e) => console.error("❌ Ошибка:", e),
      });
    } else {
      setImage(null);
    }
  };

  return (
    <View className="flex flex-row items-center justify-center gap-x-10 mt-8">
      <Button onPress={openChoice} style={{ height: 96, width: 96 }}>
        {me?.avatar ? (
          <Image
            className="w-full h-full rounded-full"
            source={{
              uri: me?.avatar
                ? me.avatar
                : require("../../../images/fallback.png"),
            }}
          />
        ) : (
          <ProfileFallbackIcon />
        )}
      </Button>
      <View className="flex flex-col gap-y-2">
        <Text weight="regular" className="text-white text-[24px]">
          {username}
        </Text>
        <Text weight="regular" className="text-white text-[14px]">
          @{nickname}
        </Text>
        <View className="flex flex-row items-center gap-x-2">
          <View className="w-[127px] h-[5px] bg-[#4D4747] rounded-full overflow-hidden">
            <View
              className="h-full bg-white"
              style={{ width: `${Math.min(4, 1) * 40}%` }}
            />
          </View>
          <Text className="text-white text-[14px]">
            <Text weight="bold" className="text-white">
              {lvl}
            </Text>{" "}
            lvl
          </Text>
        </View>
      </View>
      <ModalWrapper storeKey="avatarChoice">
        <View className=" bg-[#38373A] w-[90%] px-8 rounded-lg">
          <View className="flex flex-row items-center justify-between w-[100%] h-[200px]">
            <Button
              className="bg-[#27262A] px-4 py-3 rounded-md"
              onPress={openCamera}
            >
              <Text weight="medium" className="text-white">
                Make a photo
              </Text>
            </Button>
            <Button
              className="bg-[#27262A] px-4 py-3 rounded-md"
              onPress={pickImage}
            >
              <Text weight="medium" className="text-white">
                Pick from gallery
              </Text>
            </Button>
          </View>
        </View>
      </ModalWrapper>
      <CameraModalWidget
        storeKey="avatar"
        onPhotoTaken={(uri) => {
          const formData = new FormData();
          const fileName = uri.split("/").pop() || "avatar.jpg";
          const fileType = fileName.split(".").pop();

          formData.append("avatar", {
            uri,
            name: fileName,
            type: `image/${fileType}`,
          } as any);

          mutate(formData, {
            onSuccess: () =>
              queryClient.invalidateQueries({
                queryKey: ["userMe"],
              }),
            onError: (e) => console.error("❌ Ошибка:", e),
          });
        }}
      />
    </View>
  );
};
