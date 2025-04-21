import { Button } from "@/src/shared/ui/button/button"
import Text from "@/src/shared/ui/text/text"
import { View } from "react-native"
import { Checkbox } from "@/src/shared/ui/checkbox/checkbox"

import { useActiveStore } from "@/src/shared/model/use-active-store"
import { useRadiusStore } from "../model/use-radius-store"

interface IPointSettingsTab {
    color: string | null
    description: string
    defaultChoice: string | null
    onPress: () => void
    label: string
}

export const RadiusColorTab = ({ color, description, defaultChoice, onPress, label }: IPointSettingsTab) => {
    const { setActive } = useActiveStore("radiusColor", defaultChoice)
    const { setColor } = useRadiusStore()

    const handleSetActive = () => {
        setColor(color ?? "transparent")
        setActive(color ?? "transparent")
        onPress()
    }

    return (
        <Button className="flex flex-row justify-between items-center" onPress={handleSetActive}>
            <View className="flex flex-col">
                <Text weight="regular" className="text-white text-[16px]">{label}</Text>
                <Text weight="regular" className="text-[#6B6B6B] text-[14px]">{description}</Text>
            </View>
            <Checkbox activeItem={color ?? ''} storeKey="radiusColor" onPress={handleSetActive} />
        </Button>
    )
}