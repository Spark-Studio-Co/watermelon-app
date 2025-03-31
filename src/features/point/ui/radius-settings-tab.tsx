import { Button } from "@/src/shared/ui/button/button"
import Text from "@/src/shared/ui/text/text"
import { View } from "react-native"

import LockIcon from "@/src/shared/icons/lock-icon"
import MarkIcon from "@/src/shared/icons/mark-icon"

import { useActiveStore } from "@/src/shared/model/use-active-store"

interface IRadiusSettingsTab {
    meteres: string
    description: string
    onPress?: () => void
    isLocked: boolean | undefined
}

export const RadiusSettingsTab = ({ meteres, description, onPress, isLocked }: IRadiusSettingsTab) => {
    const { active } = useActiveStore("radiusSettings", "")

    return (
        <Button className="flex flex-row justify-between items-center w-full mx-auto" onPress={isLocked ? undefined : onPress}>
            <View className="flex flex-col">
                <Text weight="regular" className="text-white text-[16px]">{meteres} м</Text>
                <Text weight="regular" className="text-[#6B6B6B] text-[14px]">{description}</Text>
            </View>
            {isLocked && <LockIcon />}
            {active === meteres && <MarkIcon />}
        </Button>
    )
}
