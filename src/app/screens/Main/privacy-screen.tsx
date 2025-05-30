import { View } from "react-native"
import Text from "@/src/shared/ui/text/text"
import { MainLayout } from "../../layouts/main-layout"
import { Switch } from "@/src/shared/ui/switch/switch"

import { useSwitchStore } from "@/src/shared/model/use-switch-store"
import { useAuthStore } from "@/src/entities/registration/api/use-auth-store"
import { useUpdatePrivcy } from "@/src/entities/users/api/use-update-privacy"

export const PrivacyScreen = () => {
    const { id } = useAuthStore()
    const { mutate } = useUpdatePrivcy(id)

    const mapStore = useSwitchStore("map")
    const auctionStore = useSwitchStore("auction")
    const activityStore = useSwitchStore("activity")

    const updatePrivacy = (newMapAccess: boolean, newAuction: boolean, newActivity: boolean) => {
        mutate({
            isMapAccess: newMapAccess,
            isAuction: newAuction,
            isActivities: newActivity,
        }, {
            onSuccess: () => console.log("Privacy updated"),
            onError: (error: any) => console.error(error.response),
        });
    }

    const handleMapAccess = () => {
        mapStore.setEnabled((newMapAccess) => {
            updatePrivacy(newMapAccess, auctionStore.enabled, activityStore.enabled)
        })
    }

    const handleAuction = () => {
        auctionStore.setEnabled((newAuction) => {
            updatePrivacy(mapStore.enabled, newAuction, activityStore.enabled)
        })
    }

    const handleActivity = () => {
        activityStore.setEnabled((newActivity) => {
            updatePrivacy(mapStore.enabled, auctionStore.enabled, newActivity)
        })
    }

    return (
        <MainLayout isBack title='Приватность'>
            <View className="px-6 py-6 rounded-[15px] w-full mt-6">
                <View className="flex flex-row justify-between w-[100%] items-center">
                    <View className="flex flex-col w-[80%]">
                        <Text weight="regular" className="text-white text-[16px]">Доступ друзей к карте</Text>
                        <Text weight="regular" className="text-[#6B6B6B] text-[14px] mt-0.5">Делиться приватными точками на картах друзей</Text>
                    </View>
                    <Switch enabled={mapStore.enabled} toggle={handleMapAccess} />
                </View>
                <View className="flex flex-row justify-between w-[100%] mt-10 items-center">
                    <View className="flex flex-col w-[80%]">
                        <Text weight="regular" className="text-white text-[16px]">Участие в аукционе</Text>
                        <Text weight="regular" className="text-[#6B6B6B] text-[14px] mt-0.5">Указывать мое имя пользователя во время участия в аукционе</Text>
                    </View>
                    <Switch enabled={auctionStore.enabled} toggle={handleAuction} />
                </View>
                <View className="flex flex-row justify-between w-[100%] mt-10 items-center">
                    <View className="flex flex-col w-[70%]">
                        <Text weight="regular" className="text-white text-[16px]">Активности</Text>
                        <Text weight="regular" className="text-[#6B6B6B] text-[14px] mt-0.5">Отображать мои достижения в разделе активности</Text>
                    </View>
                    <Switch enabled={activityStore.enabled} toggle={handleActivity} />
                </View>
            </View>
        </MainLayout>
    )
}