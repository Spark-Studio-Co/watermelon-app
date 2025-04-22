import { View } from "react-native"
import Text from "@/src/shared/ui/text/text"

import { useActiveStore } from "@/src/shared/model/use-active-store"

export const BookmarkTab = () => {
    const { active, setActive } = useActiveStore('bookmarks', 'Point')

    const tabs = [
        "Point",
        "Chats",
    ]


    return (
        <View className="w-full flex items-center justify-center mt-6 pb-6 flex-col">
            <Text weight="medium" className="text-white text-[32px]">Saved</Text>
            <View className='flex flex-row items-center justify-between w-[70%] mx-auto mt-7'>
                {tabs.map((tab, index) => (
                    <View key={index} className="flex flex-col items-center">
                        <Text weight="regular" className="text-white text-[18px] mb-[3px]" onPress={() => setActive(tab)}>{tab}</Text>
                        {active === tab && <View className="w-[59px] h-[2px] rounded-[5px] bg-white" />}
                    </View>
                ))}
            </View>
        </View>
    )
}
