import React from 'react'
import { MainLayout } from '../../layouts/main-layout'
import { ScrollView, View } from 'react-native'
import { SavedPointTab } from '@/src/features/bookmarks/ui/saved-point-tab'

import { useActiveStore } from '@/src/shared/model/use-active-store'
import { useUsersMarkers } from '@/src/entities/markers/api/use-useres-markers'
import { useNavigation } from '@react-navigation/native'


const myBetPointTabs = [
    {
        type: "Premium",
        name: "Rio de Janeiro",
        subscribers: 787,
        views: 123
    },
    {
        type: "Chat",
        name: "El Diablo",
        members: 123
    },
    {
        type: "Standard",
        name: "New York"
    },
    {
        type: "Premium",
        name: "Rio de Janeiro"
    },
    {
        type: "Chat",
        name: "El Diablo"
    },
    {
        type: "Standard",
        name: "New York"
    },
    {
        type: "Premium",
        name: "Rio de Janeiro"
    },
    {
        type: "Chat",
        name: "El Diablo"
    },
    {
        type: "Standard",
        name: "New York"
    },
]



export const BookmarksScreen = () => {
    const { active } = useActiveStore('bookmarks', 'Point')
    const { data: markers } = useUsersMarkers()
    const navigation = useNavigation();

    return (
        <MainLayout isBookmarks>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ width: '95%', margin: 'auto' }}
            >
                {active === 'Point' && markers?.map((marker: any, index: number) => (
                    <View key={index} className="mb-4">
                        <SavedPointTab
                            //@ts-ignore
                            onPress={() => navigation.navigate("PointBio" as never, { id: marker?.id, ownerId: marker?.ownerId })}
                            image={marker.image}
                            type={marker.type}
                            name={marker.name ?? `Point #${index}`}
                            subscribers={marker?.followersCount}
                            views={marker.views ?? 0}
                        />
                    </View>
                ))}
                {active === 'Chats' && myBetPointTabs.map((tab, index) => (
                    <View key={index} className="mb-4">
                        <SavedPointTab
                            type='chat'
                            name={tab.name}
                            subscribers={tab.subscribers}
                            views={tab.views}
                            members={tab.members}
                        />
                    </View>
                ))}
            </ScrollView>
        </MainLayout>
    )
}
