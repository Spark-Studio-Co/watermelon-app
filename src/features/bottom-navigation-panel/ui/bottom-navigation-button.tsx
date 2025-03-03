import { Button } from "@/src/shared/ui/button/button"
import Text from "@/src/shared/ui/text/text"
import { useNavigation } from "@react-navigation/native"

import { IBottomNavigatonButtonProps } from "./model/bottom-navigation-button.interface"

import { useActiveStore } from "./model/active-button-store"

export const BottomNavigationButton = ({ label, icon }: IBottomNavigatonButtonProps) => {
    const { active, setActive } = useActiveStore()
    const { navigate } = useNavigation()

    const handlePressButton = () => {
        setActive(label)
        navigate(label as never)
    }

    return (
        <Button variant="custom" onPress={handlePressButton} className={`flex-shrink-0 flex flex-row items-center gap-x-3 ${active === label ? 'bg-[#2A2A2C] w-[132px] h-[55px] flex items-center justify-center rounded-tl-[15px] rounded-tr-[15px]' : 'w-[132px] justify-center'}`}>
            {icon}
            {active === label &&
                <Text weight="bold" className="text-[12px] text-white">{label}</Text>}
        </Button>
    )
}
