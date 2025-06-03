import React, { useEffect } from 'react'
import { MainLayout } from '../../layouts/main-layout'
import { ScrollView, View } from 'react-native'
import { SavedPointTab } from '@/src/features/bookmarks/ui/saved-point-tab'

import { useActiveStore } from '@/src/shared/model/use-active-store'
import { useNavigation } from '@react-navigation/native'
import { useFavoritesData } from '@/src/entities/markers/api/use-favorites-data'
import { useFavoritesChats } from '@/src/features/chat/api/use-get-favorites'



export const BookmarksScreen = () => {
    const { active } = useActiveStore('bookmarks', 'Point')
    const { data: markers } = useFavoritesData()
    const { data: chats } = useFavoritesChats()
    const navigation = useNavigation();

    return (
        <MainLayout isBookmarks>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ width: '95%', margin: 'auto' }}
            >
                {active === 'Point' && markers?.map((marker: any, index: number) => (
                    <View key={index} className="mb-4">
                        {(marker.type !== "chat") &&
                            <SavedPointTab
                                //@ts-ignore
                                onPress={() => navigation.navigate("PointBio" as never, { id: marker?.id, ownerId: marker?.ownerId })}
                                image={marker.image}
                                type={marker.type}
                                name={marker.name ?? `Point #${marker?.map_id}`}
                                subscribers={marker?.favoriteCount}
                                views={marker.views ?? 0}
                            />}
                    </View>
                ))}
                {active === 'Chats' && chats?.map((marker: any, index: number) => (
                    <View key={index} className="mb-4">
                        {(marker.type === "chat") &&
                            <SavedPointTab
                                //@ts-ignore
                                onPress={() => navigation.navigate("PointBio" as never, { id: marker?.id, ownerId: marker?.ownerId })}
                                image={marker.image}
                                type={marker.type}
                                name={marker.name ?? `Point #${marker?.map_id}`}
                                subscribers={marker?.followersCount}
                                views={marker.views ?? 0}
                            />}
                    </View>
                ))}
            </ScrollView>
        </MainLayout>
    )
}
