import { AuthLayout } from "../../layouts/auth-layout";
import { View, Image } from "react-native";
import Text from "@/src/shared/ui/text/text";
import { useNavigation } from "@react-navigation/native";

import { hp, wp } from "@/src/shared/utils/resize-dimensions";
import { Button } from "@/src/shared/ui/button/button";
import { useAuthStore } from "@/src/entities/registration/api/use-auth-store";

export const SuccessSignInScreen = () => {
  const { navigate } = useNavigation();
  const { setOnboardingComplete } = useAuthStore();

  const handleContinue = async () => {
    // Отмечаем onboarding как завершённый
    await setOnboardingComplete(true);
    console.log("Onboarding completed - navigating to dashboard");
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
