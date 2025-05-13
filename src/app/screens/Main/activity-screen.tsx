import { View } from "react-native"
import { MainLayout } from "../../layouts/main-layout"
import { ActivityCard } from "@/src/features/activity/ui/activity-card"

import { useActiveStore } from "@/src/shared/model/use-active-store"
import { useActivitiesData } from "@/src/entities/activities/api/use-activities-data"
import { useEffect } from "react"

const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();

    const dateWithoutTime = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const nowWithoutTime = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const diffTime = nowWithoutTime.getTime() - dateWithoutTime.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
        return "Today";
    } else if (diffDays === 1) {
        return "Yesterday";
    } else {
        return `${diffDays} days ago`;
    }
};

export const ActivityScreen = () => {
    const { active } = useActiveStore('activity', 'marker_created')
    const { data: activities } = useActivitiesData()

    type ActivityType = "Point" | "Friends";

    return (
        <MainLayout isActivity>
            <View className="flex flex-col items-center mx-auto w-full">
                {active === 'marker_created' && (
                    <View className="flex flex-col w-[90%] items-start mt-2 gap-y-4">
                        {activities?.map((item: any, index: number) => (
                            item.type === "Point" && (
                                <ActivityCard
                                    key={index}
                                    type={item.type as ActivityType}
                                    created={formatRelativeTime(item.createdAt || item.created)}
                                    username={item.username}
                                    description={item.description}
                                />
                            )
                        ))}
                    </View>
                )}
                {active === 'Friends' && (
                    <View className="flex flex-col w-[90%] items-end mt-2 gap-y-4">
                        {activities?.map((item: any, index: number) => (
                            item.type === "Friends" && (
                                <ActivityCard
                                    key={index}
                                    type={item.type as ActivityType}
                                    created={formatRelativeTime(item.createdAt || item.created)}
                                    username={item.username}
                                    description={item.description}
                                />
                            )
                        )
                        )}
                    </View>
                )}
            </View>
        </MainLayout>
    )
}
