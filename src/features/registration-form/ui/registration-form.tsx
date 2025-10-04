import React, { useState } from "react";
import { View } from "react-native";
import Text from "@/src/shared/ui/text/text";
import { Input } from "@/src/shared/ui/input/input";
import { Button } from "@/src/shared/ui/button/button";
import { useNavigation } from "@react-navigation/native";
import { useSendVerificationStore } from "@/src/entities/registration/model/send-verification-store";
import { StepsIndicator } from "@/src/shared/ui/steps-indicator/steps-indicator";
import { useActiveStore } from "@/src/shared/model/use-active-store";
import CheckIcon from "@/src/shared/icons/check-icon";

import { useSendVerification } from "@/src/entities/registration/api/use-send-verification";

export const RegistrationForm = () => {
  const navigation = useNavigation();
  const { setActive } = useActiveStore("steps", "Registration");
  const { email, secretKey, setEmail, setSecretKey, clearForm } =
    useSendVerificationStore();
  const { mutate, isPending, isError } = useSendVerification();
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showTermsError, setShowTermsError] = useState(false);

  const handleSubmit = () => {
    if (!email.trim()) {
      console.log("Username and password cannot be empty.");
      return;
    }

    if (!acceptedTerms) {
      setShowTermsError(true);
      return;
    }

    setShowTermsError(false);
    mutate(
      { email },
      {
        onSuccess: () => {
          clearForm();
          navigation.navigate("CodeConfirmation" as never);
          setActive("CodeConfirmation");
        },
        onError: (error) => {
          console.log("Verification error:", error.message);
        },
      }
    );
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
        <Input
          placeholder="Email"
          variant="auth"
          className="mt-16"
          value={email}
          onChangeText={setEmail}
        />
        <Input
          placeholder="Secret key"
          variant="auth"
          className="mt-14"
          value={secretKey}
          onChangeText={setSecretKey}
        />
        <Button variant="custom" className="mt-2 w-full flex items-end">
          <Text weight="regular" className="text-[15px] text-[#FFFFFF] flex">
            your invite code
          </Text>
        </Button>

        {/* Terms and conditions checkbox */}
        <View className="flex flex-row items-center mt-6 w-full">
          <Button
            variant="custom"
            className={`border border-[#D9D9D9] rounded-[3px] w-[20px] h-[20px] mr-3 flex items-center justify-center ${
              acceptedTerms ? "bg-[#57AEF1] border-[#57AEF1]" : "bg-transparent"
            }`}
            onPress={() => setAcceptedTerms(!acceptedTerms)}
          >
            {acceptedTerms && <CheckIcon />}
          </Button>
          <Text weight="regular" className="text-[14px] text-[#FFFFFF] flex-1">
            I agree to the{" "}
            <Text
              weight="bold"
              className="text-[14px] text-[#57AEF1] underline"
            >
              Terms and Conditions
            </Text>{" "}
            and{" "}
            <Text
              weight="bold"
              className="text-[14px] text-[#57AEF1] underline"
            >
              Privacy Policy
            </Text>
          </Text>
        </View>

        {/* Error messages */}
        {showTermsError && (
          <Text className="text-[16px] text-red-500 mt-4 text-center">
            Please accept the terms and conditions
          </Text>
        )}
        {isError && (
          <Text className="text-[16px] text-red-500 mt-4 text-center">
            Error sending verification code
          </Text>
        )}
      </View>
      <View className="mb-10 w-full">
        <Button
          onPress={handleSubmit}
          variant="blue"
          className="w-full flex items-center justify-center"
        >
          <Text weight="regular" className="text-[22px] text-[#FFFFFF] flex">
            {isPending ? "Sending..." : "Next"}
          </Text>
        </Button>
      </View>
    </View>
  );
};
