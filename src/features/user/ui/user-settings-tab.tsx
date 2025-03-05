import { View, Image } from "react-native"
import Text from "@/src/shared/ui/text/text"

export const UserSettingsTab = () => {
    return (
        <View className="px-4 flex flex-row items-center justify-center gap-x-10 mt-8">
            <View
                style={{ height: 96, width: 96 }}
            >
                <Image
                    className='w-full h-full rounded-full'
                    source={require("../../../images/user_image.png")}
                />
            </View>
            <View className="flex flex-col gap-y-2">
                <Text weight="regular" className="text-white text-[24px]">User Name</Text>
                <View className="flex flex-row items-center gap-x-2">
                    <Text weight="regular" className="text-white text-[14px]">@user_name</Text>
                    <Text className="text-white text-[14px]"><Text weight="bold" className="text-white">25</Text> lvl</Text>
                </View>
            </View>
        </View>
    )
}
