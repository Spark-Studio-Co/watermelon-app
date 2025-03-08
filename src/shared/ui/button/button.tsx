import { ReactNode } from "react"
import { TouchableOpacity } from "react-native"
import { TouchableOpacityProps } from "react-native"

import { StyleSwitchCase } from '../../utils/style-switch-case';
import { useActiveStore } from "../../model/use-active-store";

interface ITouchableOpacity extends TouchableOpacityProps {
    children: ReactNode
    className?: string
    variant: "custom" | "blue" | 'paywall' | 'settings'
    onPress?: () => void
    label?: string
}

const baseStyles = 'flex items-center justify-center'

export const Button = ({ children, variant, className, onPress, label, ...props }: ITouchableOpacity) => {
    const { active } = useActiveStore('settings', '');

    return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7} className={`${className || ''} ${variant === "custom" ? '' : baseStyles} ${StyleSwitchCase({
            variant, cases: {
                blue: 'bg-[#57AEF1] h-[63px] rounded-[8px]',
                // paywall: 'border-2 border-[#31A6FF] h-[46px] rounded-[8px] bg-[#343434]',
                settings: `rounded-[6.39px] px-[21px] h-[28px] ${active === label ? 'bg-[#27262A]' : 'bg-[#38373A]'} transition-colors duration-300 ease-in-out`,
                custom: '',
            }
        })}`} {...props}>
            {children}
        </TouchableOpacity>
    )
}
