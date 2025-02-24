import { TextInputProps, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Button } from "../button/button";

import { useState } from "react";
import { StyleSwitchCase } from '../../utils/style-switch-case';
import { hp, wp } from "../../utils/resize-dimensions";

import PasswordIcon from "../../icons/password-icon";

interface IInputProps extends TextInputProps {
    placeholder: string;
    variant?: "auth" | "default";
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
                        auth: ' h-[62px] pr-14 pl-4 bg-[#E3E3E3] rounded-[12px] opacity-[90%] text-[#17171780] font-[400] text-[20px]',
                        default: 'h-12',
                    }
                })}
                placeholder={placeholder}
                secureTextEntry={type === 'password' && !isPasswordVisible}
                {...props}
            />
            {type === 'password' && (
                <Button
                    variant="custom"
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                    className={` absolute flex items-center justify-center`}
                    style={{ right: wp(4), bottom: hp(2.6) }}
                >
                    <PasswordIcon />
                </Button>
            )}
        </View>
    );
};