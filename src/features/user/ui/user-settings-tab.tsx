import { View, Image } from "react-native"
import Text from "@/src/shared/ui/text/text"

interface IUserTab {
    username: string
    nickname: string
    lvl: number
}


export const UserSettingsTab = ({ username, nickname, lvl }: IUserTab) => {
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
                <Text weight="regular" className="text-white text-[24px]">{username}</Text>
                <View className="flex flex-row items-center gap-x-2">
                    <Text weight="regular" className="text-white text-[14px]">@{nickname}</Text>
                    <Text className="text-white text-[14px]"><Text weight="bold" className="text-white">{lvl}</Text> lvl</Text>
                </View>
            </View>
        </View>
    )
}
