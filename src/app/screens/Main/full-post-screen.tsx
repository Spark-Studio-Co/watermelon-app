import { useEffect, useState } from "react"
import { Dimensions, Image, View } from "react-native"
import { RouteProp, useNavigation } from "@react-navigation/native"
import { MainLayout } from "../../layouts/main-layout"
import { Button } from "@/src/shared/ui/button/button"
import Text from "@/src/shared/ui/text/text"
import HeartLikeIcon from "@/src/shared/icons/heart-like-icon"
import ViewsIcon from "@/src/shared/icons/views-icon"
import ShareIcon from "@/src/shared/icons/share-icon"

import { useLikePost } from "@/src/entities/feed/api/use-like-post"
import { useUnlikePost } from "@/src/entities/feed/api/use-unlike-post"
import { usePublicationsData } from "@/src/entities/markers/api/use-publications-data"

type FullPostProps = {
    route: RouteProp<any, any>
}

type RouteParams = {
    id: string
}

export const FullPostScreen = ({ route }: FullPostProps) => {
    const { id } = route.params as RouteParams
    const { mutate: likePost } = useLikePost()
    const { mutate: unlikePost } = useUnlikePost()
    const { data: publications } = usePublicationsData(id)
    const navigation = useNavigation()

    const [imageHeight, setImageHeight] = useState<number>(300)
    const [liked, setLiked] = useState(false)
    const [likesCount, setLikesCount] = useState(0)
    const screenWidth = Dimensions.get('window').width
    const finalUri = publications?.image

    useEffect(() => {
        if (!finalUri) return;

        Image.getSize(
            finalUri,
            (width, height) => {
                const scaleFactor = screenWidth / width;
                const scaledHeight = height * scaleFactor;
                setImageHeight(scaledHeight);
            },
            (error) => {
                console.warn("Failed to get image size:", error);
            }
        );
    }, [finalUri]);

    useEffect(() => {
        if (publications) {
            setLiked(publications.isLikedByMe)
            setLikesCount(publications._count?.likes || 0)
        }
    }, [publications])

    const handleLikeToggle = () => {
        if (liked) {
            setLiked(false)
            setLikesCount(prev => prev - 1)
            unlikePost(id)
        } else {
            setLiked(true)
            setLikesCount(prev => prev + 1)
            likePost(id)
        }
    }

    return (
        <MainLayout>
            <View className="flex flex-col w-full h-full ">
                <Image
                    source={{ uri: finalUri }}
                    style={{ width: '100%', height: imageHeight, borderRadius: 15, marginTop: 40 }}
                />
                <View className="flex flex-row items-center justify-between w-[95%] mx-auto mt-5">
                    <View className="flex flex-row gap-x-5">
                        <View className="flex flex-row items-center gap-x-1">
                            <Button variant="custom" className="w-[33px] h-[33px] rounded-[7.77px] flex items-center justify-center" onPress={handleLikeToggle}>
                                <HeartLikeIcon active={liked} />
                            </Button>
                            <Text weight="regular" className="text-white text-[20px]">{likesCount}</Text>
                        </View>
                        <View className="flex flex-row items-center gap-x-1.5">
                            <ViewsIcon />
                            <Text weight="regular" className="text-white text-[20px]">{publications?.comments?.length}</Text>
                        </View>
                    </View>
                    <Button variant="custom" className="w-[33px] h-[33px] rounded-[7.77px] flex items-center justify-center">
                        <ShareIcon />
                    </Button>
                </View>
                <Button onPress={() => {
                    //@ts-ignore
                    navigation.navigate("Comments" as never, { id: id })
                }} className="mt-3.5 h-[48px] rounded-[15px] pl-4 flex justify-center bg-[#2C2B2F]">
                    <Text className="text-white">Комментарии...</Text>
                </Button>
            </View>
        </MainLayout>
    )
}