import { TextInput } from "react-native-gesture-handler"
import { StyleSwitchCase } from '../../utils/style-switch-case';

interface IInputProps {
    placeholder: string
    className?: string
    variant?: "auth" | "default"
}


export const Input = ({ placeholder, className, variant = "default" }: IInputProps) => {
    return (
        <TextInput
            className={className + ' ' + StyleSwitchCase({
                variant, cases: {
                    auth: 'w-full h-[62px] px-4 bg-[#E3E3E3] rounded-[12px] opacity-[90%] text-[#17171780] font-[400] text-[20px]',
                    default: 'h-12',
                }
            })}
            placeholder={placeholder}
        />
    )
}
