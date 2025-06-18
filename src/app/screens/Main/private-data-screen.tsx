import { View } from "react-native";
import Text from "@/src/shared/ui/text/text";
import { MainLayout } from "../../layouts/main-layout";
import { Input } from "@/src/shared/ui/input/input";
import { Button } from "@/src/shared/ui/button/button";

import { useUserData } from "@/src/entities/users/model/use-user-data";
import { useUpdateUser } from "@/src/entities/users/api/use-update-user";
import { useAuthStore } from "@/src/entities/registration/api/use-auth-store";
import { useGetMe } from "@/src/entities/users/api/use-get-me";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useCheckNickname } from "@/src/entities/users/api/use-check-nickname";

export const PrivateDataScreen = () => {
  const { data: me } = useGetMe();
  const queryClient = useQueryClient();
  const { id } = useAuthStore();
  const { mutate, isPending } = useUpdateUser(id);
  const {
    name,
    username,
    password,
    confirmPassword,
    setName,
    setUserName,
    setPassword,
    setConfirmPassword,
  } = useUserData();
  const { data: isUsernameUnique, refetch } = useCheckNickname(username);
  const [showUsernameError, setShowUsernameError] = useState(false);
  const [wasEdited, setWasEdited] = useState(false);

  useEffect(() => {
    if (me) {
      setName(me.name ?? "");
      setUserName(me.username ?? "");
    }
  }, [me]);

  useEffect(() => {
    if (username.trim() && username !== me?.username) {
      refetch();
    }
  }, [username]);

  const handleSubmit = () => {
    const data = new FormData();

    const changedUsername = username.trim() && username !== me?.username;
    if (
      username.trim() &&
      username !== me?.username &&
      isUsernameUnique?.data?.isUnique === false
    ) {
      return;
    }

    if (name.trim() && name !== me?.name) {
      data.append("name", name);
    }

    if (changedUsername) {
      data.append("username", username);
    }

    if (password && confirmPassword) {
      if (password !== confirmPassword) {
        alert("Пароли не совпадают");
        return;
      }
      data.append("password", password);
    }

    if ((data as any)._parts.length === 0) {
      alert("Нет изменений для сохранения");
      return;
    }

    mutate(data, {
      onSuccess: () => {
        console.log("User Data Changed");
        queryClient.invalidateQueries({ queryKey: ["userMe"] });
      },
      onError: (error: any) => console.error(error.response),
    });
  };

  return (
    <MainLayout isBack title="Изменить данные">
      <View className="px-6 py-6 rounded-[15px] w-full mt-6">
        <Text weight="regular" className="text-[14px] text-white">
          Имя Пользователя
        </Text>
        <Input
          placeholder="User name"
          variant="settings"
          className="mt-2"
          value={name}
          onChangeText={setName}
        />

        <Text weight="regular" className="text-[14px] text-white mt-9">
          Никнейм
        </Text>
        <Input
          placeholder="@user_name"
          variant="settings"
          className="mt-2"
          value={username}
          onChangeText={(text) => {
            setUserName(text.replace(/^@+/, ""));
            setWasEdited(true);
          }}
          onBlur={() => {
            if (username.trim() && username !== me?.username) {
              refetch();
            }
          }}
        />
        {wasEdited && isUsernameUnique?.data?.isUnique === false && (
          <Text className="text-red-500 text-sm mt-2 ml-1">
            Этот юзернейм уже используется
          </Text>
        )}

        <Text weight="regular" className="text-[14px] text-white mt-9">
          Пароль
        </Text>
        <Input
          placeholder="Введите пароль"
          variant="settings"
          type="password"
          className="mt-2"
          value={password}
          onChangeText={setPassword}
        />
        <Input
          placeholder="Повторите пароль"
          variant="settings"
          type="password"
          className="mt-4"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      <Button
        onPress={handleSubmit}
        variant="custom"
        className="mt-7 flex items-center justify-center bg-[#262A34] rounded-[15px] h-[68px]"
      >
        <Text weight="regular" className="text-[20px] text-white">
          {isPending ? "Загрузка..." : "Сохранить изменения"}
        </Text>
      </Button>
    </MainLayout>
  );
};
