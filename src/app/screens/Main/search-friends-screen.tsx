import { Input } from '@/src/shared/ui/input/input'
import { MainLayout } from '../../layouts/main-layout'
import { View } from 'react-native'
import { FriendTab } from '@/src/features/friend-tab/ui/friend-tab'

import { useGetUsers } from '@/src/entities/users/api/use-get-users'

import { IGetUsersRDO } from '@/src/entities/users/api/rdo/get-users.rdo'

export const SearchFriendsScreen = () => {
    const { data: friends = [] } = useGetUsers()

    console.log(friends)

    return (
        <MainLayout isBack title='Поиск'>
            <Input variant='search' className='mt-6' placeholder='Искать друзей...' />
            <View className=" px-6 py-6 rounded-[15px] w-full mt-4">
                {Array.isArray(friends) && friends?.map((friend: IGetUsersRDO, index: number) => (
                    <View key={friend.id}>
                        <FriendTab
                            avatar={friend.avatar}
                            username={friend.name}
                            nickname={friend.username ? `@${friend.username}` : friend.email}
                            isAddToFriends
                        />
                        <View className={`bg-white w-full h-0.5 mt-6 mb-4 ${index === friends.length - 1 && 'hidden'}`} />
                    </View>
                ))}
            </View>
        </MainLayout>
    )
}
