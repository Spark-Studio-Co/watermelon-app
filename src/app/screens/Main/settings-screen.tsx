import { ImageBackground, View } from "react-native"
import Text from "@/src/shared/ui/text/text"
import { MainLayout } from "../../layouts/main-layout"
import { UserSettingsTab } from "@/src/features/user/ui/user-settings-tab"
import { Button } from "@/src/shared/ui/button/button"
import { SeettingsButton } from "@/src/shared/ui/settings-button/settings-button"

import { useActiveStore } from "@/src/shared/model/use-active-store"
import { useVisibleStore } from "@/src/shared/model/use-visible-store"
import { useNavigation } from "@react-navigation/native"

// icons
import PrivateDataIcon from "@/src/shared/icons/private-data-icon"
import PrivacyIcon from "@/src/shared/icons/privacy-icon"
import FriendsIcon from "@/src/shared/icons/friends-icon"
import SearchIcon from "@/src/shared/icons/search-icon"
import BellIcon from "@/src/shared/icons/bell-icon"
import CrownIcon from "@/src/shared/icons/crown-icon"
import MessageIcon from "@/src/shared/icons/message-icon"
import SendFeedBackIcon from "@/src/shared/icons/send-feedback-icon"

export const SettingsScreen = () => {
    const { setActive } = useActiveStore('settings', '')
    const account = useVisibleStore('account')
    const friends = useVisibleStore('friends')
    const appSettings = useVisibleStore('appSettings')

    const { navigate } = useNavigation()

    const handleOpenAccount = (label: string) => {
        setActive(label)

        account.close()
        friends.close()
        appSettings.close()

        switch (label) {
            case 'Аккаунт':
                account.open()
                break
            case 'Друзья':
                friends.open()
                break
            case 'Настройки приложения':
                appSettings.open()
                break
        }
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
            {account.isVisible &&
                <View style={{ width: '100%', }}>
                    <ImageBackground
                        className="mt-3.5"
                        style={{ width: '100%', height: 200 }}
                        resizeMode="contain"
                        source={require('../../../images/settings/account.png')}
                    >
                        <View className="px-4 mt-10">
                            <SeettingsButton onPress={() => navigate('PrivateData' as never)} icon={<PrivateDataIcon />} label="Личные данные" />
                            <SeettingsButton onPress={() => navigate('Privacy' as never)} icon={<PrivacyIcon />} label="Приватность" className="mt-2" />
                        </View>
                    </ImageBackground>
                </View>
            }
            {friends.isVisible &&
                <View style={{ width: '100%' }}>
                    <ImageBackground
                        className="mt-3.5"
                        style={{ width: '100%', height: 196 }}
                        resizeMode="contain"
                        source={require('../../../images/settings/friends.png')}
                    >
                        <View className="px-4 mt-10">
                            <SeettingsButton icon={<FriendsIcon />} label="Мои друзья" isFriendsSettings />
                            <SeettingsButton icon={<SearchIcon />} label="Искать друзей" className="mt-2" />
                        </View>
                    </ImageBackground>
                </View>
            }
            {appSettings.isVisible &&
                <View style={{ width: '100%' }}>
                    <ImageBackground
                        className="mt-3.5"
                        style={{ width: '100%', height: 320 }}
                        resizeMode="contain"
                        source={require('../../../images/settings/app_settings.png')}
                    >
                        <View className="px-4 mt-7">
                            <SeettingsButton icon={<BellIcon />} label="Уведомления" isApplicationSettings />
                            <View className="bg-white w-[90%] mx-auto h-0.5" />
                            <SeettingsButton onPress={() => navigate('PointPremium' as never)} icon={<CrownIcon />} label="Point Premium" className="mt-2" isApplicationSettings />
                            <View className="bg-white w-[90%] mx-auto h-0.5" />
                            <SeettingsButton icon={<MessageIcon />} label="О приложении" className="mt-2" isApplicationSettings />
                        </View>
                        <Button variant="custom" className="flex mx-auto mt-1 items-center justify-center gap-x-5 h-[68px] w-[95%] bg-[#262A34] rounded-[15px] flex-row"><SendFeedBackIcon /> <Text weight="regular" className="text-white text-[20px]">Send feedback</Text></Button>
                    </ImageBackground>
                </View>
            }
        </MainLayout>
    )
}
