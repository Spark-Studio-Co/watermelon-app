import { View } from "react-native"
import { Input } from "@/src/shared/ui/input/input"
import { Button } from "@/src/shared/ui/button/button"
import Text from "@/src/shared/ui/text/text"

import { useMarkerStore } from "@/src/entities/markers/model/use-marker-store"
import { useUpdateMarker } from "@/src/entities/markers/api/use-update-marker"
import { useVisibleStore } from "@/src/shared/model/use-visible-store"
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

export const PointNameSettings = () => {
    const queryClient = useQueryClient()
    const { close } = useVisibleStore("pointName")
    const { id } = useMarkerStore()
    const { mutate } = useUpdateMarker(id)

    const [name, setName] = useState<string>()

    const handleSubmit = () => {
        const data = new FormData();

        if (name) {
            data.append("name", name);
        }

        mutate(data, {
            onSuccess: (data: any) => {
                console.log("✅ Name updated", data);
                queryClient.invalidateQueries({ queryKey: ["markerById", id] });
                close();
            },
            onError: (error: any) => {
                console.error("❌ error", error.response);
            },
        });
    };

    return (
        <View className="bg-[#313034] w-full py-5 rounded-[15px] flex flex-col items-center relative" style={{ boxShadow: '0px 4px 4px 0px #00000040' }}>
            <Input placeholder="Point name" value={name ?? ""} onChangeText={setName} className="h-[65px] w-[90%] text-[20px] mx-auto pl-4 text-white placeholder:text-[#5C5A5A] pl-6 border-[1px] border-[#999999] rounded-[15px]" />
            <Button
                onPress={() => handleSubmit()}
                variant="custom"
                className='w-[134px] mt-4 py-3.5 rounded-[6px] bg-[#14A278] flex items-center justify-center'>
                <Text weight="regular" className="text-white text-[16px]">Сохранить</Text>
            </Button>
        </View>
    )
}
