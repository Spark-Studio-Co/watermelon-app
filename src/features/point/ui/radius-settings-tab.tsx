import { Button } from "@/src/shared/ui/button/button"
import Text from "@/src/shared/ui/text/text"
import { View } from "react-native"

import LockIcon from "@/src/shared/icons/lock-icon"
import MarkIcon from "@/src/shared/icons/mark-icon"

interface IRadiusSettingsTab {
    meteres: string
    level: string
    onPress?: () => void
    isLocked: boolean | undefined
    active: boolean
}

export const RadiusSettingsTab = ({ meteres, level, onPress, isLocked, active }: IRadiusSettingsTab) => {

    return (
        <Button className="flex flex-row justify-between items-center w-full mx-auto" onPress={isLocked ? undefined : onPress}>
            <View className="flex flex-col">
                <Text weight="regular" className="text-white text-[16px]">{meteres} м</Text>
                <Text weight="regular" className="text-[#6B6B6B] text-[14px]">Доступно с {level} уровня</Text>
            </View>
            {isLocked && <LockIcon />}
            {active && <MarkIcon />}
        </Button>
    )
}
