import { Input } from '@/src/shared/ui/input/input'
import { MainLayout } from '../../layouts/main-layout'
import { View } from 'react-native'
import { useState, useEffect } from 'react'
import { FriendTab } from '@/src/features/friend-tab/ui/friend-tab'

import { useGetFriends } from '@/src/entities/friends/api/use-friends-data'
import { useIncomingFriendsData } from '@/src/entities/friends/api/use-incoming-friends-data'
import { useGetUsers } from '@/src/entities/users/api/use-get-users'
import { useNavigation } from '@react-navigation/native'
import { useChatStore } from '@/src/features/chat/model/chat-store'
import { useGetMe } from '@/src/entities/users/api/use-get-me'


export const MyFriendsScreen = () => {
    const navigation = useNavigation()
    const { setName, setAvatar } = useChatStore()
    const { data: friends } = useGetFriends()
    const { data: me } = useGetMe()
    const { data: incomingFriends } = useIncomingFriendsData()
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null)
    const { refetch } = useGetUsers(selectedUserId || undefined)

    const handleChatNavigate = async (id: string | null) => {
        if (id) {
            setSelectedUserId(id)

            const result = await refetch()
            const userData = result.data

            if (userData) {
                setName(userData.name ?? 'User Name')
                setAvatar(userData.avatar)

                const sorted = [me?.id, id].sort();
                const chatId = `chat-${sorted.join('-')}`;
                //@ts-ignore
                navigation.navigate("PrivateChat" as never, {
                    chatId: chatId,
                    participants: [me?.id, id],
                } as never)
            }
        }
    }

    return (
        <MainLayout isBack title='Мои друзья'>
            <Input variant='search' className='mt-6' placeholder='Искать друзей...' />
            <View className="px-6 py-6 rounded-[15px] w-full mt-4">
                {Array.isArray(incomingFriends) && incomingFriends?.map((friend: any, index: number) => {
                    return (
                        <View key={index}>
                            <FriendTab id={friend.id} avatar={friend.requester.avatar} username={friend.requester.name} nickname={`@${friend.requester.username}`} isIncoming />
                            <View className={`bg-white w-full h-0.5 mt-6 mb-4 ${index === friends?.length - 1 && 'hidden'}`} />
                        </View>
                    )
                })}
                {Array.isArray(friends) && friends?.map((friend: any, index: number) => {
                    return (
                        <View key={index}>
                            <FriendTab avatar={friend.avatar} username={friend.name} nickname={friend.username === "" ? "@user_name" : `@${friend.nickname}`} onPress={() => handleChatNavigate(friend.id)} />
                            <View className={`bg-white w-full h-0.5 mt-6 mb-4 ${index === friends.length - 1 && 'hidden'}`} />
                        </View>
                    )
                })}
            </View >
        </MainLayout>
    )
}
