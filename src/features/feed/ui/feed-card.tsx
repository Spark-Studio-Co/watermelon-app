import { Image, View } from "react-native"
import { Button } from "@/src/shared/ui/button/button"
import Text from "@/src/shared/ui/text/text"

import HeartLikeIcon from "@/src/shared/icons/heart-like-icon"
import ViewsIcon from "@/src/shared/icons/views-icon"
import CommentIcon from "@/src/shared/icons/comment-icon"

import { useState } from "react"
import { useNavigation } from "@react-navigation/native"

interface IFeedCardProps {
    username: string
    date: string
    image: string
    text?: string
    likes?: number
    views?: number
    comments?: number
    active?: boolean
    onPress?: () => void
    onLike: () => void
}



export const FeedCard = ({ username, date, image, text, likes, views, comments, onPress, onLike, active }: IFeedCardProps) => {
    const navigation = useNavigation()
    const [isFullText, setIsFullText] = useState(false)

    const handleTextToggle = () => {
        setIsFullText(!isFullText)
    }

    return (
        <View className="flex flex-col">
            <View className="flex flex-row items-center gap-x-4">
                <Text weight="regular" className="text-white text-[17.4px]">{username}</Text>
                <Text weight="regular" className="text-white text-[12px]">{date}</Text>
            </View>
            <Button onPress={() => navigation.navigate(
                //@ts-ignore
                'FullPost' as never, { imageUri: image, storeKey: 'feed' })}>
                <Image
                    source={{ uri: image || '' }}
                    className="w-full h-[309px] rounded-[15px] mt-2.5"
                />
            </Button>
            <View className="flex flex-row items-center justify-center mt-5">
                <View className="flex flex-row gap-x-5">
                    <View className="flex flex-row items-center gap-x-1">
                        <Button variant="custom" className="w-[32.822383880615234px] h-[32.822383880615234px] rounded-[7.77px] flex items-center justify-center" onPress={onLike}>
                            <HeartLikeIcon active={active} />
                        </Button>
                        <Text weight="regular" className="text-white text-[20px]">{likes}</Text>
                    </View>
                    <View className="flex flex-row items-center gap-x-1.5">
                        <ViewsIcon />
                        <Text weight="regular" className="text-white text-[20px]">{views}</Text>
                    </View>
                    <View className="flex flex-row items-center gap-x-1.5">
                        <Button onPress={onPress} variant="custom" className="w-[32.822383880615234px] h-[32.822383880615234px] rounded-[7.77px] flex items-center justify-center">
                            <CommentIcon />
                        </Button>
                        <Text weight="regular" className="text-white text-[20px]">{comments}</Text>
                    </View>
                </View>
            </View>
            <Button onPress={handleTextToggle}>
                <Text weight="regular" className="text-white text-[12px] leading-[26px] mt-4">{isFullText ? text : text?.slice(0, 200)}...</Text>
            </Button>
        </View>
    )
}
