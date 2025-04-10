import { useEffect, useState } from "react"
import { Dimensions, Image, View } from "react-native"
import { RouteProp, useNavigation } from "@react-navigation/native"
import { MainLayout } from "../../layouts/main-layout"
import { useCameraStore } from "@/src/widget/camera/model/camera-store"
import { Button } from "@/src/shared/ui/button/button"
import Text from "@/src/shared/ui/text/text"
import HeartLikeIcon from "@/src/shared/icons/heart-like-icon"
import ViewsIcon from "@/src/shared/icons/views-icon"
import ShareIcon from "@/src/shared/icons/share-icon"

type FullPostProps = {
    route: RouteProp<any, any>
}

type RouteParams = {
    imageUri: string;
    index: number;
}

export const FullPostScreen = ({ route }: FullPostProps) => {
    const { imageUri } = route.params as RouteParams
    const { image } = useCameraStore('fullPost')
    const navigation = useNavigation()

    const [imageHeight, setImageHeight] = useState<number>(300)
    const screenWidth = Dimensions.get('window').width
    const finalUri = image || imageUri

    useEffect(() => {
        Image.getSize(finalUri, (width, height) => {
            const scaleFactor = screenWidth / width
            const scaledHeight = height * scaleFactor
            setImageHeight(scaledHeight)
        }, (error) => {
            console.warn("Failed to get image size:", error)
        })
    }, [finalUri])

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
                            <Button variant="custom" className="w-[33px] h-[33px] rounded-[7.77px] flex items-center justify-center">
                                <HeartLikeIcon />
                            </Button>
                            <Text weight="regular" className="text-white text-[20px]">123</Text>
                        </View>
                        <View className="flex flex-row items-center gap-x-1.5">
                            <ViewsIcon />
                            <Text weight="regular" className="text-white text-[20px]">300</Text>
                        </View>
                    </View>
                    <Button variant="custom" className="w-[33px] h-[33px] rounded-[7.77px] flex items-center justify-center">
                        <ShareIcon />
                    </Button>
                </View>
                <Button onPress={() => navigation.navigate("Comments" as never)} className="mt-3.5 h-[48px] rounded-[15px] pl-4 flex justify-center bg-[#2C2B2F]">
                    <Text className="text-white">Комментарии...</Text>
                </Button>
            </View>
        </MainLayout>
    )
}