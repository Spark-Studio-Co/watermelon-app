import { Button } from "@/src/shared/ui/button/button"
import Text from "@/src/shared/ui/text/text"
import { View } from "react-native"
import { Checkbox } from "@/src/shared/ui/checkbox/checkbox"

import { useActiveStore } from "@/src/shared/model/use-active-store"

interface IPointSettingsTab {
    color: string
    description: string
    defaultChoice: string
}

export const RadiusColorTab = ({ color, description, defaultChoice }: IPointSettingsTab) => {
    const { setActive } = useActiveStore("radiusColor", defaultChoice)

    return (
        <Button className="flex flex-row justify-between items-center" onPress={() => setActive(color)}>
            <View className="flex flex-col">
                <Text weight="regular" className="text-white text-[16px]">{color}</Text>
                <Text weight="regular" className="text-[#6B6B6B] text-[14px]">{description}</Text>
            </View>
            <Checkbox activeItem={color} storeKey="radiusColor" />
        </Button>
    )
}
