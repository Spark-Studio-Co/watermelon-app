import Text from "@/src/shared/ui/text/text"
import { View } from "react-native"
import { Button } from "@/src/shared/ui/button/button"

import { useTypePointStore } from "../model/type-point-store"
import { useVisibleStore } from "@/src/shared/model/use-visible-store"
import { useUserLocationStore } from "../model/user-location-store"
import { useMarkerPositionStore } from "../model/marker-position-store"

export const PointTypeContent = () => {
    const { open } = useVisibleStore('bet')
    const { close } = useVisibleStore('point')
    const { setType } = useTypePointStore()
    const { markerPosition, setMarkerPosition } = useMarkerPositionStore()
    const { coordinate } = useUserLocationStore()


    const buttons = [
        {
            title: "Создать Premium",
            borderColor: '#A009CD',
            pointType: 'premium'
        },
        {
            title: "Создать Chat",
            borderColor: '#93E0FF',
            pointType: 'chat'
        },
        {
            title: "Создать Standard",
            borderColor: '#343434',
            pointType: 'standard'
        }
    ]

    const handleSetType = (pointType: string) => {
        setType(pointType)
        setTimeout(() => close(), 500)
        setTimeout(() => open(), 1000)
    }


    return (
        <View className="flex items-center h-[305px]">
            <Text weight="medium" className="text-[#5C5B5B] text-[20px] mt-6 mb-6">Создай новый Point</Text>
            <View className="flex w-[90%] gap-y-3">
                {buttons.map(({ title, borderColor, pointType }) => (
                    <Button
                        key={title}
                        variant="point-type"
                        borderColor={borderColor}
                        onPress={() => handleSetType(pointType)}
                    >
                        <Text weight="medium" className="text-white text-[20px]">{title}</Text>
                    </Button>
                ))}
            </View>
        </View>
    )
}
