import { View } from "react-native"
import Text from "@/src/shared/ui/text/text"
import { MainLayout } from "../../layouts/main-layout"
import { Switch } from "@/src/shared/ui/switch/switch"

export const PrivacyScreen = () => {
    return (
        <MainLayout isBack title='Приватность'>
            <View className="px-6 py-6 rounded-[15px] w-full mt-6">
                <View className="flex flex-row justify-between w-[100%] items-center">
                    <View className="flex flex-col w-[80%]">
                        <Text weight="regular" className="text-white text-[16px]">Доступ друзей к карте</Text>
                        <Text weight="regular" className="text-[#6B6B6B] text-[14px] mt-0.5">Делиться приватными точками на картах друзей</Text>
                    </View>
                    <Switch />
                </View>

                <View className="flex flex-row justify-between w-[100%] mt-10 items-center">
                    <View className="flex flex-col w-[80%]">
                        <Text weight="regular" className="text-white text-[16px]">Участие в аукционе</Text>
                        <Text weight="regular" className="text-[#6B6B6B] text-[14px] mt-0.5">Указывать мое имя пользователя во время участия в аукционе</Text>
                    </View>
                    <Switch />
                </View>

                <View className="flex flex-row justify-between w-[100%] mt-10 items-center">
                    <View className="flex flex-col w-[70%]">
                        <Text weight="regular" className="text-white text-[16px]">Активности</Text>
                        <Text weight="regular" className="text-[#6B6B6B] text-[14px] mt-0.5">Отображать мои достижения в разделе активности</Text>
                    </View>
                    <Switch />
                </View>
            </View>
        </MainLayout>
    )
}
