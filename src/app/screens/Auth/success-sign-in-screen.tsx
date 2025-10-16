import { AuthLayout } from "../../layouts/auth-layout";
import { View, Image } from "react-native";
import Text from "@/src/shared/ui/text/text";
import { useNavigation } from "@react-navigation/native";

import { hp, wp } from "@/src/shared/utils/resize-dimensions";
import { Button } from "@/src/shared/ui/button/button";
import { useAuthStore } from "@/src/entities/registration/api/use-auth-store";

export const SuccessSignInScreen = () => {
  const { navigate } = useNavigation();
  const {
    completeAuthFlow,
    token,
    tempToken,
    isRegistrationComplete,
    isOnboardingComplete,
  } = useAuthStore();

  const handleContinue = async () => {
    console.log("🚀 handleContinue начал выполнение");
    console.log("📊 Текущее состояние:");
    console.log("  Token:", token);
    console.log("  TempToken:", tempToken);
    console.log("  Registration complete:", isRegistrationComplete);
    console.log("  Onboarding complete:", isOnboardingComplete);

    try {
      // Завершаем весь флоу авторизации одной функцией
      await completeAuthFlow();
      console.log(
        "✅ Флоу авторизации завершен, стеки должны переключиться автоматически"
      );
    } catch (error) {
      console.error("❌ Ошибка в handleContinue:", error);
    }
  };

  return (
    <AuthLayout>
      <View style={{ height: hp(90), width: wp(90), marginTop: hp(-10) }}>
        <Image
          className={`w-full h-full`}
          resizeMode="contain"
          source={require("../../../images/success_sign_in.png")}
        />
      </View>
      <Button
        onPress={handleContinue}
        variant="blue"
        className="w-full flex items-center justify-center"
      >
        <Text weight="regular" className="text-[22px] text-[#FFFFFF] flex">
          Continue
        </Text>
      </Button>
    </AuthLayout>
  );
};
