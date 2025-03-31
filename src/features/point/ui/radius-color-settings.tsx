import { View } from "react-native"
import Text from "@/src/shared/ui/text/text"
import { Button } from "@/src/shared/ui/button/button"
import { RadiusColorTab } from "./radius-color-tab"

import CrossIcon from "@/src/shared/icons/cross-icon"

import { useVisibleStore } from "@/src/shared/model/use-visible-store"

export const RadiusColorSettings = () => {
    const { close } = useVisibleStore("radiusColor")

    const radiusColors = [
        {
            color: 'Без цвета',
            description: 'Прозрачный радиус',
        },
        {
            color: 'Черный',
            description: 'Темный цвет для радиуса',
        },
        {
            color: 'Желтый',
            description: 'Яркий цвет для радиуса',
        },
        {
            color: 'Фиолетовый',
            description: 'Фиолетовый цвет радиуса',
        },
        {
            color: 'Градиент',
            description: 'Premium градиент для радиуса',
        },
    ]

    return (
        <View className="bg-[#313034] w-full py-5 rounded-[15px] flex flex-col items-center relative" style={{ boxShadow: '0px 4px 4px 0px #00000040' }}>
            <Text weight="regular" className="text-white text-[20px]">Радуис</Text>
            <Button className="absolute right-3 top-3" onPress={close}><CrossIcon /></Button>
            <View className="flex flex-col mt-10 mb-4 w-[90%]">
                {radiusColors.map((item, index) =>
                    <View key={index} className="flex flex-col gap-y-6">
                        <RadiusColorTab color={item.color} description={item.description} defaultChoice={radiusColors[0].color} />
                        {index !== radiusColors.length - 1 && <View className="h-[1px] w-full bg-[#454547] mb-5 -mt-1" />}
                    </View>
                )}
            </View>
        </View>

    )
}
