import { View } from "react-native"
import Text from "@/src/shared/ui/text/text"
import { MainLayout } from "../../layouts/main-layout"
import { Switch } from "@/src/shared/ui/switch/switch"

export const NotificationsScreen = () => {
    return (
        <MainLayout isBack title='Уведомления'>
            <View className=" px-6 py-6 rounded-[15px] w-full mt-6">
                <View className="flex flex-row justify-between w-[100%] items-center">
                    <View className="flex flex-col w-[80%]">
                        <Text weight="regular" className="text-white text-[16px]">Все уведомления</Text>
                        <Text weight="regular" className="text-[#6B6B6B] text-[14px] mt-0.5">Вы можете убрать все уведомления приложения</Text>
                    </View>
                    <Switch />
                </View>

                <View className="flex flex-row justify-between w-[100%] mt-10 items-center">
                    <View className="flex flex-col w-[80%]">
                        <Text weight="regular" className="text-white text-[16px]">Новые сообщения</Text>
                        <Text weight="regular" className="text-[#6B6B6B] text-[14px] mt-0.5">Вы можете убрать уведомления о новых сообщениях</Text>
                    </View>
                    <Switch />
                </View>

                <View className="flex flex-row justify-between w-[100%] mt-10 items-center">
                    <View className="flex flex-col w-[70%]">
                        <Text weight="regular" className="text-white text-[16px]">Запросы в друзья</Text>
                        <Text weight="regular" className="text-[#6B6B6B] text-[14px] mt-0.5">Вы можете убрать уведомления о новых заявках в друзья</Text>
                    </View>
                    <Switch />
                </View>
            </View>
        </MainLayout>
    )
}
