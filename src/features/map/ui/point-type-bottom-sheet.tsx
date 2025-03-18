import Text from "@/src/shared/ui/text/text"
import { View } from "react-native"
import { Button } from "@/src/shared/ui/button/button"

import { useTypePointStore } from "../model/type-point-store"


export const PointTypeContent = () => {

    const { setType, type } = useTypePointStore()


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

    console.log(type)


    return (
        <View className="flex items-center h-[305px]">
            <Text weight="medium" className="text-[#5C5B5B] text-[20px] mt-6 mb-6">Создай новый Point</Text>
            <View className="flex w-[90%] gap-y-3">
                {buttons.map(({ title, borderColor, pointType }) => (
                    <Button 
                        key={title} 
                        variant="point-type" 
                        borderColor={borderColor} 
                        onPress={() => setType(pointType)}
                    >
                        <Text weight="medium" className="text-white text-[20px]">{title}</Text>
                    </Button>
                ))}
            </View>
        </View>
    )
}
