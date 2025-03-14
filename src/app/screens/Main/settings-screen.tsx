import { ImageBackground, View } from "react-native"
import Text from "@/src/shared/ui/text/text"
import { MainLayout } from "../../layouts/main-layout"
import { UserSettingsTab } from "@/src/features/user/ui/user-settings-tab"
import { Button } from "@/src/shared/ui/button/button"
import { SeettingsButton } from "@/src/shared/ui/settings-button/settings-button"

import { useActiveStore } from "@/src/shared/model/use-active-store"
import { useVisibleStore } from "@/src/shared/model/use-visible-store"
import { useNavigation } from "@react-navigation/native"

import { Platform } from "react-native"

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
            case 'Настройки':
                appSettings.open()
                break
        }
    }

    const buttons = [
        {
            id: 'account',
            label: 'Аккаунт',
        },
        {
            id: 'friends',
            label: 'Друзья'
        },
        {
            id: 'app_settings',
            label: 'Настройки'
        }
    ]

    return (
        <MainLayout>
            <View className="flex flex-col mx-auto mt-5">
                <Text weight="medium" className="text-white text-[22px]">Settings</Text>
                <UserSettingsTab />
                <View className="flex flex-row w-full justify-center mt-6">
                    <View className="flex-1 flex flex-row gap-x-4 items-center justify-center">
                        {buttons.map((button) => (
                            <Button
                                key={button.id}
                                label={button.label}
                                onPress={() => handleOpenAccount(button.label)}
                                variant="settings"
                            >
                                <Text weight="regular" className="text-white text-[14px]">
                                    {button.label}
                                </Text>
                            </Button>
                        ))}
                    </View>
                </View>
            </View>
            {account.isVisible &&
                <View style={{ width: '100%', }}>
                    <ImageBackground
                        className="mt-3.5"
                        style={{ width: '100%', height: Platform.OS === 'ios' ? 200 : 160 }}
                        resizeMode="contain"
                        source={require('../../../images/settings/account.png')}
                    >
                        <View className={`px-4 ${Platform.OS === 'ios' ? 'mt-10' : 'mt-6'}`}>
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
                        style={{ width: '100%', height: Platform.OS === 'ios' ? 196 : 163 }}
                        resizeMode="contain"
                        source={require('../../../images/settings/friends.png')}
                    >
                        <View className={`px-4 ${Platform.OS === 'ios' ? 'mt-10' : 'mt-6'}`}>
                            <SeettingsButton onPress={() => navigate('MyFriends' as never)} icon={<FriendsIcon />} label="Мои друзья" isFriendsSettings />
                            <SeettingsButton onPress={() => navigate('SearchFriends' as never)} icon={<SearchIcon />} label="Искать друзей" className="mt-2" />
                        </View>
                    </ImageBackground>
                </View>
            }
            {appSettings.isVisible &&
                <View style={{ width: '100%' }}>
                    <ImageBackground
                        className="mt-3.5"
                        style={{ width: '100%', height: Platform.OS === 'ios' ? 320 : 260 }}
                        resizeMode="contain"
                        source={require('../../../images/settings/app_settings.png')}
                    >
                        <View className={`px-4 ${Platform.OS === 'ios' ? 'mt-7' : 'mt-1.5'}`}>
                            <SeettingsButton onPress={() => navigate('Notifications' as never)} icon={<BellIcon />} label="Уведомления" isApplicationSettings />
                            <View className="bg-white w-[90%] mx-auto h-0.5" />
                            <SeettingsButton onPress={() => navigate('PointPremium' as never)} icon={<CrownIcon />} label="Point Premium" className={`${Platform.OS === 'ios' ? 'mt-2' : ''}`} isApplicationSettings />
                            <View className="bg-white w-[90%] mx-auto h-0.5" />
                            <SeettingsButton icon={<MessageIcon />} label="О приложении" className={`${Platform.OS === 'ios' ? 'mt-2' : ''}`} isApplicationSettings />
                        </View>
                        <Button variant="custom" className="flex mx-auto mt-0.5 items-center justify-center gap-x-5 h-[68px] w-[95%] bg-[#262A34] rounded-[15px] flex-row">
                            <Text><SendFeedBackIcon /></Text>
                            <Text weight="regular" className="text-white text-[20px]">Send feedback</Text>
                        </Button>
                    </ImageBackground>
                </View>
            }
        </MainLayout>
    )
}
