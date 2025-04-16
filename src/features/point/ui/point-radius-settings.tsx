import { View } from "react-native"
import Text from "@/src/shared/ui/text/text"
import { Button } from "@/src/shared/ui/button/button"
import { RadiusSettingsTab } from "./radius-settings-tab"

import CrossIcon from "@/src/shared/icons/cross-icon"

import { useVisibleStore } from "@/src/shared/model/use-visible-store"
import { useActiveStore } from "@/src/shared/model/use-active-store"
import { useRadiusData } from "@/src/entities/radius/api/use-radius-data"
import { useUpdateRadius } from "@/src/entities/radius/api/use-update-radius"
import { useUpdateMarker } from "@/src/entities/markers/api/use-update-marker"
import { useMarkerStore } from "@/src/entities/markers/model/use-marker-store"
import { useMarkerDataById } from "@/src/entities/markers/api/use-marker-data-by-id"
import { useGetMe } from "@/src/entities/users/api/use-get-me"

export const PointRadiusSettings = () => {
    const { id } = useMarkerStore()
    const { data: markerById, refetch } = useMarkerDataById(id)
    const { mutate } = useUpdateRadius()
    const { mutate: updateMarker } = useUpdateMarker(id)
    const { close } = useVisibleStore("pointRadius")
    const { setActive } = useActiveStore("radiusSettings", "0")
    const { data: radius } = useRadiusData()
    const { data: me } = useGetMe()

    const handleSetRadius = (radius: string, id: string | null) => {
        const data = new FormData();

        data.append("radiusId", id ?? '');

        setActive(radius)
        mutate({ id, value: radius })
        updateMarker(data, {
            onSuccess: () => {
                refetch()
            }
        })
    }

    return (
        <View className="bg-[#313034] w-full py-5 rounded-[15px] flex flex-col items-center relative" style={{ boxShadow: '0px 4px 4px 0px #00000040' }}>
            <Text weight="regular" className="text-white text-[20px]">Радуис</Text>
            <Button className="absolute right-3 top-3" onPress={close}><CrossIcon /></Button>
            <View className="flex flex-col mt-6 mb-4 w-[90%]">
                {Array.isArray(radius) && radius?.map((item: any, index: number) =>
                    <View key={index} className="flex flex-col gap-y-6">
                        <RadiusSettingsTab active={item.id === markerById?.radiusId} meteres={item.value} level={item.minLevel} isLocked={me && me?.level < item.minLevel} onPress={() => handleSetRadius(item.value, item.id)} />
                        {index !== radius?.length - 1 && <View className="h-[1px] w-full bg-[#454547] mb-5 -mt-1" />}
                    </View>
                )}
            </View>
        </View>

    )
}
