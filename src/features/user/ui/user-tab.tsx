import { View, Image } from "react-native"
import Text from "@/src/shared/ui/text/text"

import { hp, wp } from "@/src/shared/utils/resize-dimensions"

export const UserTab = () => {
    return (
        <View className="flex flex-row items-start justify-between w-[90%] m-auto mb-4">
            <Text weight="regular" className="text-white text-[24px]"><Text weight="bold">Hello,</Text> Ivan Petrov</Text>
            <View
                style={{ height: hp(8.2), width: wp(18) }}
            >
                <Image
                    className='w-full h-full rounded-full'
                    source={require("../../../images/user_image.png")}
                />
            </View>
        </View>
    )
}
