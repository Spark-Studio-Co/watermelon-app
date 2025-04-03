import { MainLayout } from "../../layouts/main-layout"
import { Image, View } from "react-native"
import { RouteProp } from "@react-navigation/native"
import { useCameraStore } from "@/src/widget/camera/model/camera-store"
import { Button } from "@/src/shared/ui/button/button"
import Text from "@/src/shared/ui/text/text"

import { useNavigation } from "@react-navigation/native"

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

    return (
        <MainLayout>
            <View className="flex flex-col w-full h-full">
                <Image
                    source={{ uri: image || imageUri }}
                    className="w-full min-h-[70vh] rounded-[15px] mt-10"
                />
                <View className="flex flex-row items-center justify-between w-[95%] mx-auto mt-5">
                    <View className="flex flex-row gap-x-5">
                        <View className="flex flex-row items-center gap-x-1">
                            <Button variant="custom" className="w-[32.822383880615234px] h-[32.822383880615234px] rounded-[7.77px] flex items-center justify-center">
                                <HeartLikeIcon />
                            </Button>
                            <Text weight="regular" className="text-white text-[20px]">123</Text>
                        </View>
                        <View className="flex flex-row items-center gap-x-1.5">
                            <ViewsIcon />
                            <Text weight="regular" className="text-white text-[20px]">300</Text>
                        </View>
                    </View>
                    <Button variant="custom" className="w-[32.822383880615234px] h-[32.822383880615234px] rounded-[7.77px] flex items-center justify-center">
                        <ShareIcon />
                    </Button>
                </View>
                <Button onPress={() => navigation.navigate("Comments" as never)} className="mt-3.5 h-[48px] rounded-[15px] pl-4 flex justify-center bg-[#2C2B2F]"><Text className="text-white">Комментарии...</Text></Button>
            </View>
        </MainLayout>
    )
}