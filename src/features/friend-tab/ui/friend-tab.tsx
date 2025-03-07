import { View } from "react-native"
import { Image, ImageSourcePropType } from "react-native"
import Text from "@/src/shared/ui/text/text"
import { Button } from "@/src/shared/ui/button/button"
import UserMessageIcon from "@/src/shared/icons/user-message-icon"
import AddIcon from "@/src/shared/icons/add-icon"

interface IFriendTabProps {
    avatar: ImageSourcePropType,
    username: string,
    nickname: string
    isAddToFriends?: boolean
    onPress?: () => void
}

export const FriendTab = ({ avatar, username, nickname, onPress, isAddToFriends = false }: IFriendTabProps) => {
    return (
        <View className="flex flex-row justify-between w-full items-center">
            <View className="flex flex-row items-center gap-x-4">
                <View
                    style={{ height: 50, width: 50 }}
                >
                    <Image
                        className='w-full h-full rounded-full'
                        source={avatar}
                    />
                </View>
                <View className="flex flex-col">
                    <Text weight="regular" className='text-white text-[16px]'>{username}</Text>
                    <Text weight="regular" className='text-white text-[10px]'>{nickname}</Text>
                </View>
            </View>
            <Button variant="custom" onPress={onPress}>
                {isAddToFriends ? <AddIcon /> : <UserMessageIcon />}
            </Button>
        </View>
    )
}
