import React, { useEffect } from "react";
import { View } from "react-native";
import Text from "@/src/shared/ui/text/text";
import { Input } from "@/src/shared/ui/input/input";
import { Button } from "@/src/shared/ui/button/button";
import { useNavigation } from "@react-navigation/native";
import { useRegistrationStore } from "@/src/entities/registration/model/registration-store";
import { StepsIndicator } from "@/src/shared/ui/steps-indicator/steps-indicator";
import { useActiveStore } from "@/src/shared/model/use-active-store";
import { hp } from "@/src/shared/utils/resize-dimensions";



export const RegistrationForm = () => {
    const navigation = useNavigation();
    const { setActive } = useActiveStore("steps", "Registration");
    const { email, secretKey, setEmail, setSecretKey } = useRegistrationStore();


    const handleSubmit = () => {
        if (!email.trim() || !secretKey.trim()) {
            console.log("Username and password cannot be empty.");
            return;
        }
        navigation.navigate("CodeConfirmation" as never);
        setActive('CodeConfirmation')
    };

    return (
        <View className="flex items-center justify-center w-full mt-20">
            <Text weight="medium" className="text-[48px] text-[#FFFFFF]">Registration</Text>
            <Text weight="regular" className="text-[16px] text-[#FFFFFF] mt-6 mb-6">Create your account</Text>
            <StepsIndicator />
            <Input placeholder="Email" variant="auth" className="mt-16" value={email} onChangeText={setEmail} />
            <Input placeholder="Secret key" variant="auth" className="mt-14" value={secretKey} onChangeText={setSecretKey} />
            <Button variant='custom' className='mt-2 w-full flex items-end'><Text weight='regular' className='text-[15px] text-[#FFFFFF] flex'>your invite code</Text></Button>
            <Button onPress={handleSubmit} variant='blue' className='w-full flex items-center justify-center' style={{ marginTop: hp(30) }}><Text weight='regular' className='text-[22px] text-[#FFFFFF] flex'>Next</Text></Button>
        </View >
    );
};