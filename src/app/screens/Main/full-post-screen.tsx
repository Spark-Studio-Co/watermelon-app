import { MainLayout } from "../../layouts/main-layout"
import { View, Image } from "react-native"
import { RouteProp } from "@react-navigation/native"
import { SafeAreaView } from "react-native-safe-area-context"

type FullPostProps = {
    route: RouteProp<any, any>
}

type RouteParams = {
    imageUri: string;
    index: number;
}


export const FullPostScreen = ({ route }: FullPostProps) => {
    const { imageUri } = route.params as RouteParams

    console.log("imageUri:", imageUri)


    return (
        <MainLayout>
            <SafeAreaView>
                <Image
                    source={{ uri: imageUri }}
                    style={{ width: "100%", height: "100%" }}
                />
            </SafeAreaView>
        </MainLayout>
    )
}
