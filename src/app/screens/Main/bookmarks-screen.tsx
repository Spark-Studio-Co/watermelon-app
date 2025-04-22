import React from 'react'
import { MainLayout } from '../../layouts/main-layout'
import { ScrollView, View } from 'react-native'
import { SavedPointTab } from '@/src/features/bookmarks/ui/saved-point-tab'

import { useActiveStore } from '@/src/shared/model/use-active-store'

const onSoldPointTabs = [
    {
        type: "Premium",
        name: "Hustle",
        subscribers: 80,
        views: 12
    },
    {
        type: "Chat",
        name: "El ",
        members: 11
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

    return (
        <MainLayout isBookmarks>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ width: '90%', margin: 'auto' }}            >
                {active === 'Point' && onSoldPointTabs.map((tab, index) => (
                    <View key={index} className="mb-4">
                        <SavedPointTab
                            type={tab.type}
                            name={tab.name}
                            subscribers={tab.subscribers}
                            views={tab.views}
                            members={tab.members}
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
