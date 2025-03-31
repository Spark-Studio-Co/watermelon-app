import { View, Image } from "react-native"
import Text from "@/src/shared/ui/text/text"
import { Button } from "@/src/shared/ui/button/button"

import GearIcon from "@/src/shared/icons/gear-icon"

interface IPointBioTab {
    pointname: string
    nickname: string
    onPress?: () => void
}


export const PointBioTab = ({ pointname, nickname, onPress }: IPointBioTab) => {
    return (
        <View className="flex flex-row items-center justify-center gap-x-10 mt-8">
            <View
                style={{ height: 96, width: 96 }}
            >
                <Image
                    className='w-full h-full rounded-full'
                    source={require("../../../images/user_image.png")}
                />
            </View>
            <View className="flex flex-col gap-y-2">
                <Text weight="regular" className="text-white text-[24px]">{pointname}</Text>
                <View className="flex flex-row items-center gap-x-2">
                    <Text weight="regular" className="text-white text-[14px]">@{nickname}</Text>
                </View>
            </View>
            <Button variant="custom" onPress={onPress}>
                <GearIcon />
            </Button>
        </View>
    )
}
