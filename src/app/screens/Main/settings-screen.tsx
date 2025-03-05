import { ImageBackground, View } from "react-native"
import Text from "@/src/shared/ui/text/text"
import { MainLayout } from "../../layouts/main-layout"
import { UserSettingsTab } from "@/src/features/user/ui/user-settings-tab"
import { Button } from "@/src/shared/ui/button/button"

import { useActiveStore } from "@/src/shared/model/use-active-store"
import { useVisibleStore } from "@/src/shared/model/use-visible-store"

export const SettingsScreen = () => {
    const { setActive } = useActiveStore('settings', '')
    const account = useVisibleStore('account')
    const friends = useVisibleStore('friends')
    const appSettings = useVisibleStore('appSettings')



    const handleOpenAccount = (label: string) => {
        setActive(label)
        const isAccount = label === 'Аккаунт'
        const isFriends = label === 'Друзья'
        const isAppSettings = label === 'Настройки приложения'
        account.setActive(isAccount)
        friends.setActive(isFriends)
        appSettings.setActive(isAppSettings)
    }

    const buttons = [
        {
            label: 'Аккаунт',
        },
        {
            label: 'Друзья'
        },
        {
            label: 'Настройки приложения'
        }
    ]

    return (
        <MainLayout>
            <View className=" flex flex-col mx-auto mt-5">
                <Text weight="medium" className="text-white text-[22px]">Settings</Text>
                <UserSettingsTab />
                <View className="flex flex-row items-center w-full gap-x-1 justify-center mt-6">
                    {buttons.map((button) => {
                        return (
                            <Button key={button.label} label={button.label} onPress={() => handleOpenAccount(button.label)} variant="settings"><Text weight="regular" className="text-white text-[14px]">{button.label}</Text></Button>
                        )
                    })}
                </View>
            </View>
            {account.isVisible && <ImageBackground className="mt-3.5" style={{
                width: '100%', height: 200
            }} source={require('../../../images/settings/account.png')}></ImageBackground>}
            {friends.isVisible && <ImageBackground className="mt-3.5" style={{
                width: '100%', height: 196
            }} source={require('../../../images/settings/friends.png')}></ImageBackground>}
            {appSettings.isVisible && <ImageBackground className="mt-3.5" style={{
                width: '100%', height: 324
            }} source={require('../../../images/settings/app_settings.png')}></ImageBackground>}
        </MainLayout>
    )
}
