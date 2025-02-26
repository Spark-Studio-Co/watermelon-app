import React, { useState } from "react";
import { View } from "react-native";
import Text from "@/src/shared/ui/text/text";
import { Button } from "@/src/shared/ui/button/button";
import { useNavigation } from "@react-navigation/native";
import { StepsIndicator } from "@/src/shared/ui/steps-indicator/steps-indicator";
import { hp } from "@/src/shared/utils/resize-dimensions";
import { Input } from "@/src/shared/ui/input/input";

export const PasswordForm = () => {
    const [password, setPassword] = useState<string>('');
    const navigation = useNavigation();

    const minLength = password.length >= 8;
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const progress = [minLength, hasNumber, hasSymbol].filter(Boolean).length / 3;

    const handleSubmit = () => {
        navigation.navigate('SuccessSignIn' as never)
    }

    return (
        <View className="flex items-center justify-center w-full mt-20">
            <Text weight="medium" className="text-[48px] text-[#FFFFFF]">Registration</Text>
            <Text weight="regular" className="text-[16px] text-[#FFFFFF] mt-6 mb-6">
                Create your account
            </Text>
            <StepsIndicator />
            <Input
                variant="auth"
                type="password"
                placeholder="Password"
                className="mt-20"
                value={password}
                onChangeText={setPassword}
            />

            <View className="w-[90%] h-[8px] bg-white mt-8 rounded-[4px]">
                <View style={{ width: `${progress * 100}%` }} className="h-full bg-[#605D67] rounded-[4px]" />
            </View>

            <View className="mt-4 w-[90%]">
                {[{ rule: "8 characters minimum", passed: minLength },
                { rule: "A number", passed: hasNumber },
                { rule: "A symbol", passed: hasSymbol }]
                    .map(({ rule, passed }, index) => (
                        <View key={index} className="flex-row items-center mt-2">
                            <Text className={`text-[16px] text-white ${passed ? 'opacity-50 line-through' : ''}`}>
                                ○ {rule}
                            </Text>
                        </View>
                    ))}
            </View>

            <Button
                onPress={handleSubmit}
                variant='blue'
                className='w-full flex items-center justify-center'
                style={{ marginTop: hp(30) }}
                disabled={!minLength || !hasNumber || !hasSymbol}
            >
                <Text weight='regular' className='text-[22px] text-[#FFFFFF] flex'>Next</Text>
            </Button>
        </View>
    );
};