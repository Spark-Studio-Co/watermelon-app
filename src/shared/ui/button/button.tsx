import { ReactNode } from "react"
import { TouchableOpacity } from "react-native"
import { TouchableOpacityProps } from "react-native"

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

    const variantClass = (() => {
        if (variant === 'blue') return 'bg-[#57AEF1] h-[63px] rounded-[8px]';
        if (variant === 'settings') {
            return `rounded-[6.39px] px-[21px] h-[28px] ${active === label ? 'bg-[#27262A]' : 'bg-[#38373A]'}`;
        }
        if (variant === 'paywall') return 'bg-[#57AEF1] rounded-[8px]';
        return '';
    })();

    const baseClass = variant === 'custom' ? '' : baseStyles;

    const combinedClassName = `${className || ''} ${baseClass} ${variantClass}`;

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            className={combinedClassName}
            {...props}
        >
            {children}
        </TouchableOpacity>
    )
}
