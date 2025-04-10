import { View } from "react-native"
import { MainLayout } from "../../layouts/main-layout"
import { ActivityCard } from "@/src/features/activity/ui/activity-card"

import { useActiveStore } from "@/src/shared/model/use-active-store"

export const ActivityScreen = () => {
    const { active } = useActiveStore('activity', 'Global')

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
        <MainLayout isActivity>
            <View className="flex flex-col items-center mx-auto w-full">
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
