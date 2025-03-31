import { Button } from "@/src/shared/ui/button/button"
import Text from "@/src/shared/ui/text/text"
import { View } from "react-native"

import RightArrowIcon from "@/src/shared/icons/right-arrow-icon"

interface IPointSettingsTab {
    title: string
    description: string
    onPress?: () => void
}

export const PointSettingsTab = ({ title, description, onPress }: IPointSettingsTab) => {
    return (
        <Button className="flex flex-row justify-between items-center" onPress={onPress}>
            <View className="flex flex-col">
                <Text weight="regular" className="text-white text-[16px]">{title}</Text>
                <Text weight="regular" className="text-[#6B6B6B] text-[14px]">{description}</Text>
            </View>
            <RightArrowIcon />
        </Button>
    )
}
