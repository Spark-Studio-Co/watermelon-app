import { View } from "react-native"
import Text from "@/src/shared/ui/text/text"
import { Button } from "@/src/shared/ui/button/button"
import { RadiusColorTab } from "./radius-color-tab"

import CrossIcon from "@/src/shared/icons/cross-icon"

import { useVisibleStore } from "@/src/shared/model/use-visible-store"
import { useUpdateRadiusColor } from "@/src/entities/radius/api/use-update-radius-color"
import { useRadiusColorData } from "@/src/entities/radius/api/use-radius-color-data"
import { useMarkerDataById } from "@/src/entities/markers/api/use-marker-data-by-id"
import { useMarkerStore } from "@/src/entities/markers/model/use-marker-store"
import { useRadiusStore } from "../model/use-radius-store"
import { useQueryClient } from "@tanstack/react-query"
import { useGetMe } from "@/src/entities/users/api/use-get-me"
import { useEffect } from "react"
import { ScrollView } from "react-native-gesture-handler"


export const RadiusColorSettings = () => {
    const queryClient = useQueryClient()
    const { data: me } = useGetMe();
    const { id } = useMarkerStore()
    const { mutate } = useUpdateRadiusColor()
    const { data: color } = useRadiusColorData()
    const { close } = useVisibleStore("radiusColor")
    const { data: markerById } = useMarkerDataById(id)
    const { color: selectedColor } = useRadiusStore()

    const handleUpdateColor = (colorId: string | undefined) => {
        if (!colorId) return;

        mutate({ id: me?.id ?? "", colorId: colorId });

        console.log("colorId:", colorId, "color:", color);

        queryClient.invalidateQueries({
            queryKey: ["markers"],
        });
    };

    const activeColor = markerById?.radius?.color || selectedColor;

    return (
        <View className="bg-[#313034] w-full py-5 rounded-[15px] mt-auto flex flex-col items-center relative" style={{ boxShadow: '0px 4px 4px 0px #00000040' }}>
            <Text weight="regular" className="text-white text-[20px]">Радиус</Text>
            <Button className="absolute right-3 top-3" onPress={close}><CrossIcon /></Button>
            <ScrollView className="flex flex-col mt-10 mb-4 w-[90%]" showsVerticalScrollIndicator={false}>
                {color?.map((item: any, index: number) => (
                    <View key={item.value ?? index} className="flex flex-col gap-y-6">
                        <RadiusColorTab
                            isLocked={me && me?.level?.id < item.minLevel}
                            isPremiumOnly={item.isPremiumOnly}
                            label={item.name}
                            color={item.color}
                            description={item.description}
                            defaultChoice={selectedColor}
                            onPress={() => handleUpdateColor(item.id)}
                            active={item.color === activeColor}
                        />
                        {index !== color?.length - 1 && (
                            <View className="h-[1px] w-full bg-[#454547] mb-5 -mt-1" />
                        )}
                    </View>
                ))}
            </ScrollView>
        </View>
    )
}
