import { AuthLayout } from "../../layouts/auth-layout";
import { View, Image } from "react-native";
import Text from "@/src/shared/ui/text/text";

import { hp, wp } from "@/src/shared/utils/resize-dimensions";
import { Button } from "@/src/shared/ui/button/button";

import { useAuthStore } from "@/src/entities/registration/api/use-auth-store";
import { useLoginStore } from "@/src/entities/login/model/login-store";
import { useGetMe } from "@/src/entities/users/api/use-get-me";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

export const SuccessSignUpScreen = () => {
  const { setToken, setRegistrationComplete } = useAuthStore();
  const { responseData } = useLoginStore();
  const navigation = useNavigation();
  const [isChecking, setIsChecking] = useState(false);

  const handleNavigateDashboard = async () => {
    setIsChecking(true);

    // Устанавливаем токен
    await setToken(responseData);

    // Делаем запрос для получения данных пользователя
    try {
      const response = await fetch(
        "https://watermelon-backend-production.up.railway.app/api/users/get/me",
        {
          headers: {
            Authorization: `Bearer ${responseData}`,
          },
        }
      );

      const userData = await response.json();

      // Проверяем, заполнен ли профиль пользователя
      const isProfileComplete = userData.name && userData.username;

      if (isProfileComplete) {
        // Профиль заполнен - помечаем регистрацию как завершённую
        await setRegistrationComplete(true);
      } else {
        // Профиль не заполнен - отправляем на создание аккаунта
        navigation.navigate("AccountCreation" as never);
        setIsChecking(false);
        return;
      }
    } catch (error) {
      console.error("Ошибка при получении данных пользователя:", error);
      // В случае ошибки отправляем на создание аккаунта для безопасности
      navigation.navigate("AccountCreation" as never);
      setIsChecking(false);
      return;
    }

    setIsChecking(false);
  };

  return (
    <AuthLayout>
      <View style={{ height: hp(90), width: wp(90), marginTop: hp(-10) }}>
        <Image
          className={`w-full h-full`}
          resizeMode="contain"
          source={require("../../../images/success_sign_up.png")}
        />
      </View>
      <Button
        onPress={handleNavigateDashboard}
        variant="blue"
        className="w-full flex items-center justify-center"
      >
        <Text weight="regular" className="text-[22px] text-[#FFFFFF] flex">
          {isChecking ? "Checking..." : "Continue"}
        </Text>
      </Button>
    </AuthLayout>
  );
};
