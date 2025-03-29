
import { View } from "react-native"
import Text from "@/src/shared/ui/text/text"

interface IBetPlaceTabProps {
    points: number
    date: string
    time: string
    place?: number
}

export const BetPlaceTab = ({ points, date, time, place }: IBetPlaceTabProps) => {
    // Determine text color based on place
    const getTextColor = () => {
        return place === 1 ? "text-white" : "text-[#393939]"
    }

    return (
        <View
            className={`bg-[#1B1C1E] px-8 w-full border border-[#222328] h-[65px] flex justify-between flex-row rounded-[15px]`}
            style={{ boxShadow: '0px 4px 4px 0px #00000040' }}
        >
            <View className="flex flex-col items-center justify-center">
                {place && (
                    <Text weight="regular" className={`${getTextColor()} text-[32px]`}>#{place}</Text>
                )}
            </View>
            <View className="flex flex-col items-center justify-center">
                <Text weight="regular" className={`${getTextColor()} text-[36px]`}>{points}</Text>
                <Text weight="regular" className={`${getTextColor()} text-[11px] -mt-3.5`}>Pcoins</Text>
            </View>
            <View className="flex flex-col items-end justify-center">
                <Text weight="regular" className={`${getTextColor()} text-[13px]`}>{date}</Text>
                <Text weight="regular" className={`${getTextColor()} text-[10px]`}>{time}</Text>
            </View>
        </View>
    )
}
