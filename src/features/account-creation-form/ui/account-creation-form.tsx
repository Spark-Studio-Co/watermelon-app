import { View, Image } from "react-native";
import Text from "@/src/shared/ui/text/text";
import { StepsIndicator } from "@/src/shared/ui/steps-indicator/steps-indicator";
import { Input } from "@/src/shared/ui/input/input";
import { Button } from "@/src/shared/ui/button/button";
import * as ImagePicker from "expo-image-picker";

import AddPictureIcon from "@/src/shared/icons/add-picture-icon";
import square_plus from "@/src/images/square_plus.png";

import { useCameraStore } from "@/src/widget/camera/model/camera-store";
import { useVisibleStore } from "@/src/shared/model/use-visible-store";
import { useNavigation } from "@react-navigation/native";
import { useAccountCreationStore } from "../../../entities/account-creation/model/account-creation-store";
import { useEffect, useState } from "react";
import { useCameraPermissions } from "expo-camera";
import { ModalWrapper } from "@/src/shared/ui/modal-wrapper/modal-wrapper";
import { CameraModalWidget } from "@/src/widget/camera/ui/camera-modal-widget";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/src/entities/registration/api/use-auth-store";
import { useUpdateUser } from "@/src/entities/users/api/use-update-user";
import { useCheckNickname } from "@/src/entities/users/api/use-check-nickname";

export const AccountCreationForm = () => {
  const navigation = useNavigation();
  const { fullName, username, setFullName, setUsername, validateUsername } =
    useAccountCreationStore();

  const queryClient = useQueryClient();
  const { id } = useAuthStore();
  const { mutate, isPending } = useUpdateUser(id);
  const { data: isUsernameUnique, refetch } = useCheckNickname(username);

  const [showUsernameError, setShowUsernameError] = useState(false);
  const { setImage, image } = useCameraStore("avatar");
  const { open } = useVisibleStore("avatar");
  const { open: openChoice, close: closeChoice } =
    useVisibleStore("avatarChoice");
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    refetch();
  }, [username]);

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

  const handleUsernameBlur = () => {
    if (username.trim()) {
      const isValid = validateUsername(username);
      setShowUsernameError(!isValid);
    }
  };

  const handleSubmit = () => {
    const data = new FormData();

    data.append("name", fullName);
    data.append("username", username);

    if ((data as any)._parts.length === 0) {
      alert("Нет изменений для сохранения");
      return;
    }

    console.log(data);
    console.log(isUsernameUnique?.data?.isUnique);

    if (isUsernameUnique?.data?.isUnique === false) {
      return;
    }

    mutate(data, {
      onSuccess: () => {
        console.log("User Data Changed");
        queryClient.invalidateQueries({
          queryKey: ["userMe"],
        });
        navigation.navigate("SuccessSignIn" as never);
      },
      onError: (error: any) => console.error(error.response),
    });
  };

  return (
    <View className="flex justify-between h-full">
      <View className="flex mt-20 flex-col items-center justify-center w-full">
        <Text weight="medium" className="text-[48px] text-[#FFFFFF]">
          Registration
        </Text>
        <Text weight="regular" className="text-[16px] text-[#FFFFFF] mt-6 mb-6">
          Create your account
        </Text>
        <StepsIndicator />

        <Button className="mt-12 mb-8 relative" onPress={openChoice}>
          {image ? (
            <>
              <Image
                source={{ uri: image }}
                className="w-[136px] h-[136px] rounded-full"
              />
              <View className="absolute bottom-4 right-2">
                <Image source={square_plus} className="w-[28] h-[28]" />
              </View>
            </>
          ) : (
            <>
              <AddPictureIcon />
              <View className="absolute bottom-4 right-2">
                <Image source={square_plus} className="w-[28] h-[28]" />
              </View>
            </>
          )}
        </Button>

        <Input
          placeholder="Имя пользователя..."
          variant="auth"
          className="mt-4 w-full"
          value={fullName}
          onChangeText={setFullName}
        />

        <View className="w-full mt-4">
          <Input
            placeholder="@username"
            variant="auth"
            className="w-full"
            value={username}
            onChangeText={(text) => {
              setUsername(text.replace(/^@+/, ""));
              refetch();
            }}
            onBlur={handleUsernameBlur}
          />
          {isUsernameUnique?.data?.isUnique === false && (
            <Text className="text-red-500 text-lg mt-4 ml-2">
              {"Этот юзернейм уже используется"}
            </Text>
          )}
        </View>
      </View>

      <View className="mb-10 w-full">
        <Button
          onPress={
            isUsernameUnique?.data?.isUnique == false ? () => {} : handleSubmit
          }
          variant="blue"
          className="w-full flex items-center justify-center"
        >
          <Text weight="regular" className="text-[22px] text-[#FFFFFF] flex">
            {isPending ? "Создание..." : "Создать"}
          </Text>
        </Button>
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
