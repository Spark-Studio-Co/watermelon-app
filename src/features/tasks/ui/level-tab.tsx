import { Image, View } from "react-native"
import Text from "@/src/shared/ui/text/text"

interface ILevelTabProps {
    level: number
    max: number
    current: number
}

export const LevelTab = ({ level, max, current }: ILevelTabProps) => {

    const percentage = Math.ceil((current / max) * 100)

    return (
        <View className="flex flex-col items-center rounded-full mt-8 relative">
            <View
                style={{ height: 108, width: 346, position: 'relative' }}
            >
                <Image
                    className='w-full h-full rounded-[10px]'
                    source={require("../../../images/level_tab.png")}
                />
                <View className="flex flex-col items-center absolute justify-between w-full h-full">
                    <View className="top-6 left-8 w-full">
                        <View className="flex flex-row items-center gap-x-3.5">
                            <Text weight="regular" className="text-black text-[24px]">Your level</Text>
                            <Text weight="regular" className="text-black text-[30px]">{level}</Text>
                        </View>
                    </View>
                    <View className="flex w-full flex-col bottom-6">
                        <Text className="text-right right-7 bottom-1">{current}/{max}</Text>
                        <View className="w-[90%] mx-auto bg-[#D9D9D9] rounded-[11.5px] relative h-[23px]">
                            <View style={{ width: `${percentage}%` }} className="absolute bg-black h-full rounded-[11.5px]" />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}
