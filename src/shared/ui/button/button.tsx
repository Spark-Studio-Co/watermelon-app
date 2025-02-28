import { ReactNode } from "react"
import { TouchableOpacity } from "react-native"
import { TouchableOpacityProps } from "react-native"

import { StyleSwitchCase } from '../../utils/style-switch-case';

interface ITouchableOpacity extends TouchableOpacityProps {
    children: ReactNode
    className?: string
    variant: "custom" | "blue" | 'paywall'
    onPress?: () => void
}

const baseStyles = 'flex items-center justify-center'

export const Button = ({ children, variant, className, onPress, ...props }: ITouchableOpacity) => {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7} className={`${className || ''} ${baseStyles} ${StyleSwitchCase({
            variant, cases: {
                blue: 'h-[63px] bg-[#57AEF1] rounded-[12px]',
                paywall: 'border-2 border-[#31A6FF] h-[46px] rounded-[8px] bg-[#343434]',
                custom: '',
            }
        })}`} {...props}>
            {children}
        </TouchableOpacity>
    )
}
