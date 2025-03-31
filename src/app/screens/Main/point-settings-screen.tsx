import { MainLayout } from "../../layouts/main-layout"
import { View } from "react-native"
import Text from "@/src/shared/ui/text/text"
import { PointBioTab } from "@/src/features/point/ui/point-bio-tab"



export const PointSettingsScreen = () => {

    return (
        <MainLayout >
            <View className="w-[80%] mx-auto mt-4">
                <PointBioTab pointname="Point Name" nickname="point_name" />
            </View>

        </MainLayout>
    )
}
