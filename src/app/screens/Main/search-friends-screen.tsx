import { Input } from '@/src/shared/ui/input/input'
import { MainLayout } from '../../layouts/main-layout'
import { View } from 'react-native'
import { FriendTab } from '@/src/features/friend-tab/ui/friend-tab'

const userImage = require('@/src/images/user_image.png');

const friends = [
    {
        avatar: userImage,
        username: 'User name',
        nickname: '@ivan',
    },
    {
        avatar: userImage,
        username: 'User name',
        nickname: '@ivan',
    },
    {
        avatar: userImage,
        username: 'User name',
        nickname: '@ivan',
    }
]


export const SearchFriendsScreen = () => {

    return (
        <MainLayout isBack title='Поиск'>
            <Input variant='search' className='mt-6' placeholder='Искать друзей...' />
            <View className=" px-6 py-6 rounded-[15px] w-full mt-4">
                {friends.map((friend, index) => {
                    return (
                        <View key={index}>
                            <FriendTab avatar={friend.avatar} username={friend.username} nickname={friend.nickname} isAddToFriends />
                            <View className={`bg-white w-full h-0.5 mt-6 mb-4 ${index === friends.length - 1 && 'hidden'}`} />
                        </View>
                    )
                })}
            </View >
        </MainLayout>
    )
}
