import { Input } from '@/src/shared/ui/input/input'
import { MainLayout } from '../../layouts/main-layout'
import { View } from 'react-native'
import { FriendTab } from '@/src/features/friend-tab/ui/friend-tab'

import { useGetUsers } from '@/src/entities/users/api/use-get-users'
import { useGetMe } from '@/src/entities/users/api/use-get-me'
import { useSendFriendRequest } from '@/src/entities/friends/api/use-send-friend-request'
import { useActiveFriendsStore } from '@/src/entities/friends/model/use-active-friends-store'

import { IGetUsersRDO } from '@/src/entities/users/api/rdo/get-users.rdo'
import { useEffect } from 'react'

export const SearchFriendsScreen = () => {
    const { setActive, active } = useActiveFriendsStore()
    const { data: friends } = useGetUsers(undefined, true)
    const { data: me } = useGetMe()
    const { mutate: sendFriendRequest } = useSendFriendRequest()

    const handleSendRequest = (receiverId: string) => {
        setActive(receiverId, true);
        sendFriendRequest(receiverId)
    }

    const formattedFriends = Array.isArray(friends)
        ? friends.filter((friend: IGetUsersRDO) => friend.id !== me?.id)
        : [];

    return (
        <MainLayout isBack title='Поиск'>
            <Input variant='search' className='mt-6' placeholder='Искать друзей...' />
            <View className=" px-6 py-6 rounded-[15px] w-full mt-4">
                {Array.isArray(formattedFriends) && formattedFriends?.map((friend: IGetUsersRDO, index: number) => (
                    <View key={friend.id}>
                        <FriendTab
                            avatar={friend.avatar}
                            username={friend.name}
                            nickname={friend.username ? `@${friend.username}` : friend.email}
                            isAddToFriends
                            onPress={() => handleSendRequest(friend.id)}
                            isAdded={!!active[friend.id]}
                        />
                        <View className={`bg-white w-full h-0.5 mt-6 mb-4 ${index === formattedFriends.length - 1 && 'hidden'}`} />
                    </View>
                ))}
            </View>
        </MainLayout>
    )
}
