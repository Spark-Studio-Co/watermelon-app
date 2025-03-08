import { View } from "react-native"

import { BottomNavigationButton } from "./bottom-navigation-button"
import { links } from "./model/links"

export const BottomNavigationPanel = () => {
    return (
        <View
            className={`bg-[#202020] absolute w-full bottom-0  h-[70px]
                } rounded-tl-[18px] rounded-tr-[18px]`}
        >
            <View className="flex flex-row justify-between items-center w-[70%] m-auto">
                {links.map((link) => (
                    <BottomNavigationButton
                        key={link.label}
                        icon={link.icon}
                        label={link.label}
                    />
                ))}
            </View>
        </View>
    );
};