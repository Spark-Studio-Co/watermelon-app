import { Keyboard, View } from "react-native"
import { Input } from "@/src/shared/ui/input/input"
import { Button } from "@/src/shared/ui/button/button"
import Text from "@/src/shared/ui/text/text"

import { useRef, useState } from "react"
import { useUpdateMarker } from "@/src/entities/markers/api/use-update-marker"
import { useMarkerStore } from "@/src/entities/markers/model/use-marker-store"
import { useVisibleStore } from "@/src/shared/model/use-visible-store"
import { useQueryClient } from "@tanstack/react-query"

export const PointBioSettings = () => {
    const queryClient = useQueryClient()
    const bioInputRef = useRef(null);
    const [description, setDescription] = useState<string>("");

    const { close } = useVisibleStore("pointBioSettings")
    const { id } = useMarkerStore()
    const { mutate } = useUpdateMarker(id)

    const handleSubmit = () => {
        const data = new FormData();

        if (description) data.append("description", description);

        mutate(data, {
            onSuccess: () => {
                console.log("Description updated")
                queryClient.invalidateQueries({
                    queryKey: "markerById"
                })
                close();
            },
            onError: (error: any) => {
                console.log("error", error.response)
            }
        })
    }

    return (
        <View className="bg-[#313034] w-full py-5 rounded-[15px] flex flex-col items-center relative" style={{ boxShadow: '0px 4px 4px 0px #00000040' }}>
            <Input
                value={description}
                onChangeText={setDescription}
                ref={bioInputRef}
                returnKeyType="done"
                multiline
                placeholder="bio information..."
                className="placeholder:text-[#5C5A5A] text-white text-[20px] px-6 pt-6 border-[1px] h-[156px] border-[#999999] rounded-[15px] w-[90%] mx-auto"
                onSubmitEditing={() => {
                    Keyboard.dismiss();
                }}
            />
            <Button
                onPress={() => handleSubmit()}
                variant="custom"
                className='w-[134px] mt-4 py-3.5 rounded-[6px] bg-[#14A278] flex items-center justify-center'>
                <Text weight="regular" className="text-white text-[16px]">Сохранить</Text>
            </Button>
        </View>
    )
}
