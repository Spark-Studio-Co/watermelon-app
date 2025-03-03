import { Button } from "@/src/shared/ui/button/button"
import Text from "@/src/shared/ui/text/text"
import { useNavigation } from "@react-navigation/native"
import { Platform } from "react-native"

import { IBottomNavigatonButtonProps } from "./model/bottom-navigation-button.interface"

import { useActiveStore } from "./model/active-button-store"
import { useCurrentScreen } from "@/src/shared/model/use-current-screen"

export const BottomNavigationButton = ({ label, icon }: IBottomNavigatonButtonProps) => {
    const { active, setActive } = useActiveStore()
    const { navigate } = useNavigation()
    const screenName = useCurrentScreen();


    const handlePressButton = () => {
        setActive(label)
        navigate(label as never)
    }

    return (
        <Button variant="custom" onPress={handlePressButton} className={`flex-shrink-0 flex flex-row items-center pb-2 gap-x-3 ${active === screenName ? `${Platform.OS === 'ios' ? 'h-[75px]' : 'h-[55px]'} bg-[#2A2A2C] px-4 flex items-center justify-center rounded-tl-[15px] rounded-tr-[15px]` : ''}`}>
            {icon}
            {active === label &&
                <Text weight="bold" className="text-[12px] text-white">{label}</Text>}
        </Button>
    )
}
