import { View } from "react-native"
import Text from "@/src/shared/ui/text/text"
import { MainLayout } from "../../layouts/main-layout"
import { Switch } from "@/src/shared/ui/switch/switch"

import { useSwitchStore } from "@/src/shared/model/use-switch-store"
import { useUpdateNotifications } from "@/src/entities/users/api/use-notifications-settings"
import { useAuthStore } from "@/src/entities/registration/api/use-auth-store"

export const NotificationsScreen = () => {

    const { id } = useAuthStore()
    const { mutate } = useUpdateNotifications(id)

    const { enabled: notifications, setEnabled: setNotifications } = useSwitchStore("notifications")
    const { enabled: friends, setEnabled: setFriends } = useSwitchStore("friends")
    const { enabled: messages, setEnabled: setMessages } = useSwitchStore("messages")

    const handleToggle = () => {
        mutate({
            isAllNotifications: notifications,
            isFriendsRequests: friends,
            isNewMessages: messages,
        },
            {
                onSuccess: () => console.log("Switched notifications"),
                onError: (error: any) => console.error(error.response)
            }
        );
    };

    const handleNotifications = () => {
        setNotifications()
        handleToggle()
    }

    const handleFriends = () => {
        setFriends()
        handleToggle()
    }

    const handleMessages = () => {
        setMessages()
        handleToggle()
    }

    return (
        <MainLayout isBack title='Уведомления'>
            <View className=" px-6 py-6 rounded-[15px] w-full mt-6">
                <View className="flex flex-row justify-between w-[100%] items-center">
                    <View className="flex flex-col w-[80%]">
                        <Text weight="regular" className="text-white text-[16px]">Все уведомления</Text>
                        <Text weight="regular" className="text-[#6B6B6B] text-[14px] mt-0.5">Вы можете убрать все уведомления приложения</Text>
                    </View>
                    <Switch enabled={notifications} toggle={handleNotifications} />
                </View>

                <View className="flex flex-row justify-between w-[100%] mt-10 items-center">
                    <View className="flex flex-col w-[80%]">
                        <Text weight="regular" className="text-white text-[16px]">Новые сообщения</Text>
                        <Text weight="regular" className="text-[#6B6B6B] text-[14px] mt-0.5">Вы можете убрать уведомления о новых сообщениях</Text>
                    </View>
                    <Switch enabled={friends} toggle={handleFriends} />
                </View>

                <View className="flex flex-row justify-between w-[100%] mt-10 items-center">
                    <View className="flex flex-col w-[70%]">
                        <Text weight="regular" className="text-white text-[16px]">Запросы в друзья</Text>
                        <Text weight="regular" className="text-[#6B6B6B] text-[14px] mt-0.5">Вы можете убрать уведомления о новых заявках в друзья</Text>
                    </View>
                    <Switch enabled={messages} toggle={handleMessages} />
                </View>
            </View>
        </MainLayout>
    )
}
