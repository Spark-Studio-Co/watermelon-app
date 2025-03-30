import { TextInputProps, View, TextInput } from "react-native";
import { Button } from "../button/button";

import { useState, forwardRef } from "react";
import { StyleSwitchCase } from '../../utils/style-switch-case';
import { hp, wp } from "../../utils/resize-dimensions";

import PasswordIcon from "../../icons/password-icon";
import SearchIcon from "../../icons/search-icon";
import RightArrowIcon from "../../icons/right-arrow-icon";

interface IInputProps extends TextInputProps {
    placeholder: string;
    variant?: "auth" | "default" | 'settings' | 'search' | 'point';
    className?: string;
    type?: string;
    // All other TextInput props are inherited from TextInputProps
}

export const Input = forwardRef<TextInput, IInputProps>(({ placeholder, className, variant = "default", type, ...props }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
        <View className="w-full relative">
            <TextInput
                ref={ref}
                className={className + ' ' + StyleSwitchCase({
                    variant, cases: {
                        auth: 'h-[62px] pr-14 pl-4 bg-[#E3E3E3] rounded-[12px] opacity-[90%] text-[#17171780] font-[400] text-[20px] font-poppins-regular',
                        settings: 'h-[40px] pr-14 pl-4 bg-[#E3E3E3] rounded-[12px] opacity-[90%] text-[#17171780] font-[400] text-[14px] font-poppins-regular',
                        search: 'h-[60px] pr-14 pl-16 bg-[#262A34] text-white rounded-[12px] text-[16px] font-poppins-regular',
                        point: 'h-[40px] pl-4 rounded-[6px] w-full bg-white border-[0.49px] border-[#00000066]',
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
                <View className="absolute left-4 bottom-1.5 -translate-y-1/2">
                    <SearchIcon />
                </View>}
            {variant === 'search' &&
                <View className="absolute right-4 bottom-4 -translate-y-1/2">
                    <RightArrowIcon />
                </View>}
            {type === 'password' && (
                <Button
                    variant="custom"
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                    className={variant === 'settings' ? 'absolute right-4 bottom-1.5 -translate-y-1/2' : `absolute right-4 bottom-4 -translate-y-1/2`}
                >
                    <PasswordIcon />
                </Button>
            )}
        </View>
    );
});