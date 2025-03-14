import { View } from "react-native"
import Text from "@/src/shared/ui/text/text"
import { MainLayout } from "../../layouts/main-layout"
import { Input } from "@/src/shared/ui/input/input"
import { Button } from "@/src/shared/ui/button/button"

export const PrivateDataScreen = () => {
    return (
        <MainLayout isBack title='Изменить данные'>
            <View className="px-6 py-6 rounded-[15px] w-full mt-6">
                <Text weight="regular" className="text-[14px] text-white">Имя Пользователя</Text>
                <Input placeholder="User name" variant="settings" className="mt-2" />
                <Text weight="regular" className="text-[14px] text-white mt-9">Никнейм</Text>
                <Input placeholder="@user_name" variant="settings" className="mt-2" />
                <Text weight="regular" className="text-[14px] text-white mt-9">Пароль</Text>
                <Input placeholder="Введите пароль" variant="settings" type="password" className="mt-2" />
                <Input placeholder="Повторите пароль" variant="settings" type="password" className="mt-4" />
            </View>
            <Button variant="custom" className="mt-7 flex items-center justify-center bg-[#262A34] rounded-[15px] h-[68px]"><Text weight="regular" className="text-[20px] text-white">Сохранить изменения</Text></Button>
        </MainLayout>
    )
}
