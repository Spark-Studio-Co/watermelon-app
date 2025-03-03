import { View } from "react-native"
import { Platform } from "react-native"

import { hp } from "@/src/shared/utils/resize-dimensions"

import { BottomNavigationButton } from "./bottom-navigation-button"
import { links } from "./model/links"

export const BottomNavigationPanel = () => {
    return (
        <View className="bg-[#202020] h-[70px] rounded-tl-[18px] rounded-tr-[18px]" style={{ marginTop: Platform.OS === 'ios' ? hp(-4.2) : hp(-7.5) }}>
            <View className="flex flex-row justify-between items-center w-[80%] mt-auto mx-auto">
                {links.map((link) => {
                    return (
                        <BottomNavigationButton key={link.label} icon={link.icon} label={link.label} />
                    )
                })}
            </View>
        </View>
    )
}
