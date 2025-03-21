import AddPcIcon from "@/src/shared/icons/add-pc-icon"
import Text from "@/src/shared/ui/text/text"
import { View } from "react-native"
import { Button } from "@/src/shared/ui/button/button"
import { useVisibleStore } from "@/src/shared/model/use-visible-store"
import { useTypePointStore } from "../model/type-point-store"

export const BetBottomContent = ({ onSavePoint }: { onSavePoint: () => void }) => {
    const { close } = useVisibleStore('bet')
    const { type } = useTypePointStore()

    const handleMakeBet = () => {
        onSavePoint()
        setTimeout(() => close(), 500)
    }

    return (
        <View className="flex items-center flex-col h-[305px] px-6">
            <View className="flex justify-between flex-row items-center w-full mt-1.5">
                <Text weight="bold" className=" text-white text-[24px]">new point</Text>
                <View className="flex flex-row gap-x-2.5">
                    <Button variant="custom" className="bg-[#F3F4F5] rounded-[4px]">
                        <AddPcIcon />
                    </Button>
                    <Text weight="bold" className="text-white text-[16px]">Pc 12,580</Text>
                </View>
            </View>
            <View className="bg-[#C4C4C4] opacity-[50%] w-full h-[1px] mt-2" />
            <Text weight="bold" className="mt-5 text-white text-[20px]">Начальная ставка</Text>
            <Button
                variant="custom"
                className="bg-[#14A278] px-4 py-3 rounded-[6px] mt-4"
                onPress={handleMakeBet}
            >
                <Text weight="bold" className="text-white text-[11.74px]">Make a bet</Text>
            </Button>
        </View>
    )
}
