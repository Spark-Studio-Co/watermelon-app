import { View } from "react-native"
import Text from "@/src/shared/ui/text/text"
import { Button } from "@/src/shared/ui/button/button"

import { useActiveStore } from "@/src/shared/model/use-active-store"

export const ActivityTab = () => {

    const { active, setActive } = useActiveStore('activity', 'Global')

    const buttons = ["Global", "Friends"]

    return (
        <View className="flex items-center justify-center px-4 m-auto mt-8 mb-8">
            <Text weight="medium" className="text-white text-[32px]">Activity</Text>
            <View className="flex flex-row items-center justify-between w-[90%] mx-auto mt-6">
                {buttons.map((button) => {
                    return (
                        <View className="flex flex-col items-center" key={button}>
                            <Button onPress={() => setActive(button)} >
                                <Text weight="regular" className="text-white text-[18px]">{button}</Text>
                            </Button>
                            {active === button && <View className="h-[2px] w-[70px] bg-[#FFFFFF] rounded-[5px]" />}
                        </View>
                    )
                })}
            </View>
        </View>
    )
}
