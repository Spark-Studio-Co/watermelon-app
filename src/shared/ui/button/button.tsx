import { ReactNode } from "react"
import { TouchableOpacity } from "react-native"
import { TouchableOpacityProps } from "react-native"

import { StyleSwitchCase } from '../../utils/style-switch-case';

interface ITouchableOpacity extends TouchableOpacityProps {
    children: ReactNode
    className?: string
    variant: "custom" | "blue"
    onPress?: () => void
}

export const Button = ({ children, variant, className, onPress, ...props }: ITouchableOpacity) => {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7} className={className + ' ' + StyleSwitchCase({
            variant, cases: {
                blue: ' h-[63px] bg-[#57AEF1] rounded-[12px]',
                custom: '',
            }
        })} {...props}>
            {children}
        </TouchableOpacity>
    )
}
