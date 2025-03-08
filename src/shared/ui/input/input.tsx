import { TextInputProps, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Button } from "../button/button";

import { useState } from "react";
import { StyleSwitchCase } from '../../utils/style-switch-case';
import { hp, wp } from "../../utils/resize-dimensions";

import PasswordIcon from "../../icons/password-icon";
import SearchIcon from "../../icons/search-icon";
import RightArrowIcon from "../../icons/right-arrow-icon";

interface IInputProps extends TextInputProps {
    placeholder: string;
    variant?: "auth" | "default" | 'settings' | 'search';
    className?: string;
    type?: string;
}

export const Input = ({ placeholder, className, variant = "default", type, ...props }: IInputProps) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
        <View className="w-full relative">
            <TextInput
                className={className + ' ' + StyleSwitchCase({
                    variant, cases: {
                        auth: 'h-[62px] pr-14 pl-4 bg-[#E3E3E3] rounded-[12px] opacity-[90%] text-[#17171780] font-[400] text-[20px] font-poppins-regular',
                        settings: 'h-[40px] pr-14 pl-4 bg-[#E3E3E3] rounded-[12px] opacity-[90%] text-[#17171780] font-[400] text-[14px] font-poppins-regular',
                        search: 'h-[60px] pr-14 pl-16 bg-[#262A34] text-white rounded-[12px] text-[16px] font-poppins-regular',
                        default: 'h-12',
                    }
                })}
                placeholder={placeholder}
                placeholderTextColor={variant === 'search' ? '#FFFFFF' : '#17171780'}
                secureTextEntry={type === 'password' && !isPasswordVisible}
                textAlignVertical="center"
                {...props}
            />
            {variant === 'search' &&
                <View className="absolute flex items-center justify-center" style={{ left: wp(4), bottom: hp(1.9) }}>
                    <SearchIcon />
                </View>}
            {variant === 'search' &&
                <View className="absolute flex items-center justify-center" style={{ right: wp(4), bottom: hp(2.2) }}>
                    <RightArrowIcon />
                </View>}
            {type === 'password' && (
                <Button
                    variant="custom"
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                    className="absolute flex items-center justify-center"
                    style={{ right: wp(4), bottom: variant === 'settings' ? hp(1.3) : hp(2.6) }}
                >
                    <PasswordIcon />
                </Button>
            )}
        </View>
    );
};