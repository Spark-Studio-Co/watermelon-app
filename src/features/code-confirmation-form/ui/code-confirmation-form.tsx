import React, { useEffect, useRef, useState } from "react";
import { TextInput, View } from "react-native";
import Text from "@/src/shared/ui/text/text";
import { Button } from "@/src/shared/ui/button/button";
import { SingleValueInput } from "@/src/shared/ui/single-value-input/single-value-input";
import { useNavigation } from "@react-navigation/native";
import { StepsIndicator } from "@/src/shared/ui/steps-indicator/steps-indicator";
import { useActiveStore } from "@/src/shared/model/use-active-store";
import { hp } from "@/src/shared/utils/resize-dimensions";
import { useSendVerificationStore } from "@/src/entities/registration/model/send-verification-store";
import { useVerifyCode } from "@/src/entities/registration/api/use-verify-code";

export const CodeConfirmationForm = () => {
    const { mutate, isPending } = useVerifyCode()
    const { email } = useSendVerificationStore()
    const [values, setValues] = useState<string[]>(Array(5).fill(""));
    const { setActive } = useActiveStore("steps", "Registration");
    const navigation = useNavigation();

    const inputRefs = useRef<(TextInput | null)[]>(Array(5).fill(null));

    const handleSetValue = (index: number, text: string) => {
        const newValues = [...values];
        newValues[index] = text;
        setValues(newValues);

        if (text.length === 1 && index < 4) {
            const nextInput = inputRefs.current[index + 1];
            if (nextInput) {
                nextInput.focus();
            }
        }
    };

    const handleSubmit = () => {
        const code = values.join("");
        console.log("✅ Complete code:", code);
        mutate({ code, email }, {
            onSuccess: () => {
                setActive("Password");
                navigation.navigate("Password" as never);
            },
            onError: (error) => {
                console.log('Verification error:', error.message);
            }
        })
    }

    useEffect(() => {
        setActive("CodeConfirmation");
        const firstInput = inputRefs.current[0];
        if (firstInput) {
            firstInput.focus();
        }
    }, []);

    return (
        <View className="flex items-center justify-between h-full w-full">
            <View className="mt-20 flex items-center justify-center w-full">
                <Text weight="medium" className="text-[48px] text-[#FFFFFF]">Registration</Text>
                <Text weight="regular" className="text-[16px] text-[#FFFFFF] mt-6 mb-6">
                    Create your account
                </Text>
                <StepsIndicator />
                <Text weight="regular" className="text-[16px] text-center text-[#FFFFFF] mt-24">
                    We just sent a 5-digit code to
                </Text>
                <Text weight="regular" className="text-[16px] text-center text-[#FFFFFF]">
                    {email}, enter it below:
                </Text>
                <View className="flex flex-row justify-between w-full items-center mt-12">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <SingleValueInput
                            key={index}
                            index={index}
                            inputRef={(el) => (inputRefs.current[index] = el)}
                            value={values[index] || ""}
                            onChangeText={(text) => handleSetValue(index, text)}
                        />
                    ))}
                </View>
                <View className="flex flex-row mt-4 items-center gap-x-2">
                    <Text weight="regular" className="text-[14px] text-[#FFFFFF]">Wrong email?</Text>
                    <Button onPress={() => navigation.navigate("Registration" as never)} variant="custom">
                        <Text weight="bold" className="text-[14px] underline text-[#57AEF1]">
                            Send to different email
                        </Text>
                    </Button>
                </View>
            </View>
            <View className="w-full mb-10">
                <Button onPress={handleSubmit} variant='blue' className='w-full flex items-center justify-center'>
                    <Text weight='regular' className='text-[22px] text-[#FFFFFF] flex'>{isPending ? 'Sending...' : 'Next'}</Text>
                </Button>
            </View>
        </View>
    );
};