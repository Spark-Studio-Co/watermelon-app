import { MainLayout } from "../../layouts/main-layout"
import { View } from "react-native"

import PremiumIcon from "@/src/shared/icons/premium-icon"
import Text from "@/src/shared/ui/text/text"

export const PointPremiumScreen = () => {
    return (
        <MainLayout isBack title="Point Premium">
            <View className="flex flex-col items-center justify-center w-[90%] mx-auto mt-4">
                <PremiumIcon />
                <Text weight='bold' className='text-white text-[40px] mt-2'>Premium</Text>
                <Text weight='bold' className='text-white text-[24px]'>Subscription</Text>
                <View className=" bg-[#262A34] px-4 py-6 rounded-[15px] w-full mt-6">
                    <Text weight="regular" className="text-white text-[15px]">Lorem ipsum dolor sit amet consectetur. Elit enim sollicitudin malesuada cras viverra aliquam massa. Sed diam nunc adipiscing sem. A libero morbi duis id in. Pulvinar consequat felis habitasse id pretium arcu. Ultrices varius fringilla viverra id amet amet. Id ipsum urna lectus pellentesque ac nisl accumsan blandit phasellus. Fringilla adipiscing at nibh purus nunc. Duis pulvinar quis tellus vel euismod quam. Eros dolor aliquet etiam id amet id netus. Est purus quis nunc faucibus elementum rhoncus. Morbi ultrices sed lacus ullamcorper etiam erat nunc morbi. Libero vitae amet lacinia sit. Orci sed rhoncus ut suscipit vitae tortor commodo.
                        Libero fames fames mattis orci mauris. Sit mi at ipsum euismod. Mauris vitae facilisi ultricies sit. Nibh cras diam nunc amet auctor vitae. Sagittis turpis sed </Text>
                </View>
            </View>
        </MainLayout>
    )
}
