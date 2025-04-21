import { View } from "react-native"
import Text from "@/src/shared/ui/text/text"
import { Button } from "@/src/shared/ui/button/button"
import { RadiusColorTab } from "./radius-color-tab"

import CrossIcon from "@/src/shared/icons/cross-icon"

import { useVisibleStore } from "@/src/shared/model/use-visible-store"
import { useUpdateRadius } from "@/src/entities/radius/api/use-update-radius"
import { useRadiusData } from "@/src/entities/radius/api/use-radius-data"
import { useMarkerDataById } from "@/src/entities/markers/api/use-marker-data-by-id"
import { useMarkerStore } from "@/src/entities/markers/model/use-marker-store"
import { useRadiusStore } from "../model/use-radius-store"

export const RadiusColorSettings = () => {
    const { id } = useMarkerStore()
    const { mutate } = useUpdateRadius()
    const { data: radius } = useRadiusData()
    const { close } = useVisibleStore("radiusColor")
    const { data: markerById } = useMarkerDataById(id)
    const { color } = useRadiusStore()

    const radiusColors = [
        { label: 'Без цвета', value: 'transparent', description: 'Прозрачный радиус' },
        { label: 'Черный', value: 'rgba(0, 0, 0, 0.6)', description: 'Темный цвет для радиуса' },
        { label: 'Желтый', value: 'rgba(255, 255, 0, 0.4)', description: 'Яркий цвет для радиуса' },
        { label: 'Фиолетовый', value: 'rgba(128, 0, 128, 0.4)', description: 'Фиолетовый цвет радиуса' },
        { label: 'Градиент', value: 'rgba(255, 0, 150, 0.5)', description: 'Premium градиент (массив цветов)' }
    ]

    const currentRadius = radius?.find((r: any) => r.id === markerById?.radiusId)

    const handleUpdateColor = (color: string | undefined) => {
        if (!currentRadius?.id) return;

        mutate({ id: currentRadius.id, color })
    }

    return (
        <View className="bg-[#313034] w-full py-5 rounded-[15px] flex flex-col items-center relative" style={{ boxShadow: '0px 4px 4px 0px #00000040' }}>
            <Text weight="regular" className="text-white text-[20px]">Радуис</Text>
            <Button className="absolute right-3 top-3" onPress={close}><CrossIcon /></Button>
            <View className="flex flex-col mt-10 mb-4 w-[90%]">
                {radiusColors.map((item, index) => (
                    <View key={item.value ?? index} className="flex flex-col gap-y-6">
                        <RadiusColorTab
                            label={item.label}
                            color={item.value}
                            description={item.description}
                            defaultChoice={color}
                            onPress={() => handleUpdateColor(item.value ?? "")}
                        />
                        {index !== radiusColors.length - 1 && (
                            <View className="h-[1px] w-full bg-[#454547] mb-5 -mt-1" />
                        )}
                    </View>
                ))}
            </View>
        </View>

    )
}
