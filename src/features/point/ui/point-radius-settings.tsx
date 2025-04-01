import { View } from "react-native"
import Text from "@/src/shared/ui/text/text"
import { Button } from "@/src/shared/ui/button/button"
import { RadiusSettingsTab } from "./radius-settings-tab"

import CrossIcon from "@/src/shared/icons/cross-icon"

import { useVisibleStore } from "@/src/shared/model/use-visible-store"
import { useActiveStore } from "@/src/shared/model/use-active-store"

export const PointRadiusSettings = () => {
    const { close } = useVisibleStore("pointRadius")
    const { setActive } = useActiveStore("radiusSettings", "0")

    const handleSetRadius = (radius: string) => {
        setActive(radius)
    }

    const radiusSettings = [
        {
            meteres: '0',
            description: 'Доступно с 10 уровня',
            onPress: handleSetRadius
        },
        {
            meteres: '5',
            description: 'Доступно с 10 уровня',
            onPress: handleSetRadius
        },
        {
            meteres: '10',
            description: 'Доступно с 10 уровня',
            isLocked: true,
            onPress: handleSetRadius
        },
        {
            meteres: '25',
            description: 'Доступно с 10 уровня',
            isLocked: true,
            onPress: handleSetRadius
        },
        {
            meteres: '50',
            description: 'Доступно с 10 уровня',
            isLocked: true,
            onPress: handleSetRadius
        },
        {
            meteres: '100',
            description: 'Доступно с 10 уровня',
            isLocked: true,
            onPress: handleSetRadius
        }
    ]

    return (
        <View className="bg-[#313034] w-full py-5 rounded-[15px] flex flex-col items-center relative" style={{ boxShadow: '0px 4px 4px 0px #00000040' }}>
            <Text weight="regular" className="text-white text-[20px]">Радуис</Text>
            <Button className="absolute right-3 top-3" onPress={close}><CrossIcon /></Button>
            <View className="flex flex-col mt-6 mb-4 w-[90%]">
                {radiusSettings.map((item, index) =>
                    <View key={index} className="flex flex-col gap-y-6">
                        <RadiusSettingsTab meteres={item.meteres} description={item.description} isLocked={item.isLocked} onPress={() => item.onPress(item.meteres)} defaultValue={radiusSettings[0].meteres} />
                        {index !== radiusSettings.length - 1 && <View className="h-[1px] w-full bg-[#454547] mb-5 -mt-1" />}
                    </View>
                )}
            </View>
        </View>

    )
}
