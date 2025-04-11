import { View, Image } from "react-native"
import Text from "@/src/shared/ui/text/text"
import { Button } from "@/src/shared/ui/button/button"
import AddIcon from "@/src/shared/icons/add-icon"
import UserMessageIcon from "@/src/shared/icons/user-message-icon"
import CheckMarkIcon from "@/src/shared/icons/check-mark-icon"

interface IFriendTabProps {
    avatar: string | null;
    username: string;
    nickname: string;
    isAddToFriends?: boolean;
    onPress?: () => void;
    isAdded?: boolean;
}

export const FriendTab = ({
    avatar,
    username,
    nickname,
    onPress,
    isAddToFriends = false,
    isAdded = false,
}: IFriendTabProps) => {

    const fullAvatar = avatar
        ? avatar.startsWith("http")
            ? avatar
            : `https://${avatar}`
        : null;

    return (
        <View className="flex flex-row justify-between w-full items-center">
            <View className="flex flex-row items-center gap-x-4">
                <View style={{ height: 50, width: 50 }}>
                    {fullAvatar ? (
                        <Image className="w-full h-full rounded-full" source={{ uri: fullAvatar }} />
                    ) : (
                        <View className="bg-slate-400 rounded-full w-full h-full" />
                    )}
                </View>
                <View className="flex flex-col">
                    <Text weight="regular" className="text-white text-[16px]">
                        {username}
                    </Text>
                    <Text weight="regular" className="text-white text-[10px]">
                        {nickname}
                    </Text>
                </View>
            </View>

            {isAdded ? (
                <CheckMarkIcon />
            ) : (
                <Button variant="custom" onPress={onPress}>
                    {isAddToFriends ? <AddIcon /> : <UserMessageIcon />}
                </Button>
            )}
        </View>
    );
};