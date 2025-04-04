import { View } from "react-native"
import { MainLayout } from "../../layouts/main-layout"
import Text from "@/src/shared/ui/text/text"
import { Button } from "@/src/shared/ui/button/button"
import { ActivityCard } from "@/src/features/activity/ui/activity-card"

import { useActiveStore } from "@/src/shared/model/use-active-store"

export const ActivityScreen = () => {
    const { active, setActive } = useActiveStore('activity', 'Global')

    const buttons = ["Global", "Friends"]

    type ActivityType = 'Point' | "Friends";


    const global = [
        {
            type: 'Point',
            created: '2 days ago',
            username: 'Alex Lesly',
            description: 'Go to Tastak'
        }
    ]

    const friends = [
        {
            type: 'Friends',
            created: '2 days ago',
            username: 'John Doe',
            description: 'GO TO MANHATTAN'
        }
    ]

    return (
        <MainLayout>
            <View className="flex flex-col items-center mx-auto w-[90%] mt-5">
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
                {active === 'Global' && (
                    <View className="flex flex-col w-[90%] items-start mt-6">
                        {global.map((item, index) => (
                            <ActivityCard
                                key={index}
                                type={item.type as ActivityType}
                                created={item.created}
                                username={item.username}
                                description={item.description}
                            />
                        ))}
                    </View>
                )}
                {active === 'Friends' && (
                    <View className="flex flex-col w-[90%] items-end mt-6">
                        {friends.map((item, index) => (
                            <ActivityCard
                                key={index}
                                type={item.type as ActivityType}
                                created={item.created}
                                username={item.username}
                                description={item.description}
                            />
                        ))}
                    </View>
                )}
            </View>
        </MainLayout>
    )
}
