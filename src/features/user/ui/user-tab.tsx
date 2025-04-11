import { View, Image } from "react-native"
import Text from "@/src/shared/ui/text/text"

import { useGetMe } from "@/src/entities/users/api/use-get-me";

export const UserTab = () => {
    const { data: me } = useGetMe()

    return (
        <View className="flex flex-row items-start justify-between w-[90%] m-auto my-4">
            <Text weight="regular" className="text-white text-[24px]"><Text weight="bold">Hello,</Text> {me?.name ?? "User name"}</Text>
            <View
                style={{ height: 70, width: 70 }}
            >
                <Image
                    className="w-full h-full rounded-full"
                    source={{ uri: me?.avatar ? me.avatar : require("../../../images/user_image.png") }}
                />
            </View>
        </View>
    )
}
