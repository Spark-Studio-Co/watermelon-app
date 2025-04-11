import { Input } from '@/src/shared/ui/input/input'
import { MainLayout } from '../../layouts/main-layout'
import { View } from 'react-native'
import { FriendTab } from '@/src/features/friend-tab/ui/friend-tab'

import { useGetFriends } from '@/src/entities/friends/api/use-friends-data'

export const MyFriendsScreen = () => {
    const { data: friends } = useGetFriends()

    return (
        <MainLayout isBack title='Мои друзья'>
            <Input variant='search' className='mt-6' placeholder='Искать друзей...' />
            <View className="px-6 py-6 rounded-[15px] w-full mt-4">
                {Array.isArray(friends) && friends?.map((friend: any, index: number) => {
                    return (
                        <View key={index}>
                            <FriendTab avatar={friend.avatar} username={friend.name} nickname={friend.username} />
                            <View className={`bg-white w-full h-0.5 mt-6 mb-4 ${index === friends.length - 1 && 'hidden'}`} />
                        </View>
                    )
                })}
            </View >
        </MainLayout>
    )
}
