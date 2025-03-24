import { ReactNode } from "react"
import { TouchableOpacity } from "react-native"
import { TouchableOpacityProps } from "react-native"

import { useActiveStore } from "../../model/use-active-store";

interface ITouchableOpacity extends TouchableOpacityProps {
    children: ReactNode
    className?: string
    variant: "custom" | "blue" | 'paywall' | 'settings' | "point-type" | "bet"
    borderColor?: string
    onPress?: () => void
    label?: string
}

const baseStyles = 'flex items-center justify-center'

export const Button = ({ children, variant, className, onPress, label, borderColor, ...props }: ITouchableOpacity) => {
    const { active } = useActiveStore('settings', '');
    const { active: activeBet } = useActiveStore('bet', '');

    const variantClass = (() => {
        if (variant === 'blue') return 'bg-[#57AEF1] h-[63px] rounded-[8px]';
        if (variant === 'settings') {
            return `rounded-[6.39px] px-[24px] h-[40px] ${active === label ? 'bg-[#27262A]' : 'bg-[#38373A]'}`;
        }
        if (variant === 'paywall') return 'bg-[#57AEF1] rounded-[8px]';
        if (variant === 'point-type') return `bg-[#343434] w-full rounded-[10px] border ${`border-${borderColor}`} h-[54px]`
        if (variant === 'bet') return `border-[0.5px] w-[48px] h-[32px] rounded-[6px]`;
        return '';
    })();

    const borderStyle = variant === 'point-type' && borderColor ? { borderColor, borderWidth: 1 } : {};

    const baseClass = variant === 'custom' ? '' : baseStyles;

    const combinedClassName = `${className || ''} ${baseClass} ${variantClass} `;

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            className={combinedClassName}
            style={borderStyle}
            {...props}
        >
            {children}
        </TouchableOpacity>
    )
}
