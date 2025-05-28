import { Button } from "@/src/shared/ui/button/button"
import Text from "@/src/shared/ui/text/text"
import { View, Alert } from "react-native"

import { useActiveStore } from "@/src/shared/model/use-active-store"
import { useRadiusStore } from "../model/use-radius-store"
import { useGetMe } from "@/src/entities/users/api/use-get-me"
import { useVisibleStore } from "@/src/shared/model/use-visible-store"

import LockIcon from "@/src/shared/icons/lock-icon"
import MarkIcon from "@/src/shared/icons/mark-icon"

interface IPointSettingsTab {
    color: string | null
    description: string
    defaultChoice: string | null
    onPress: () => void
    label: string
    isLocked?: boolean
    active?: boolean
    isPremiumOnly?: boolean
}

export const RadiusColorTab = ({
    color,
    description,
    defaultChoice,
    onPress,
    label,
    isLocked,
    active,
    isPremiumOnly = false,
}: IPointSettingsTab) => {
    const { setActive } = useActiveStore("radiusColor", defaultChoice)
    const { setColor } = useRadiusStore()
    const { data: me } = useGetMe()
    const { open: openPremiumPopup } = useVisibleStore("premiumPopup")

    const isPremium = me?.isPremium ?? false

    const isFeatureLocked = isLocked || (isPremiumOnly && !isPremium)

    const handleSetActive = () => {
        // Если нужен премиум, но его нет — показать алерт и открыть премиум-попап
        if (isPremiumOnly && !isPremium) {
            Alert.alert(
                "Премиум доступ",
                "У вас должен быть премиум статус, чтобы использовать этот цвет.",
                [{ text: "Ок", onPress: () => openPremiumPopup() }]
            )
            return
        }

        // Если цвет заблокирован по уровню
        if (isLocked) return

        setColor(color ?? "transparent")
        setActive(color ?? "transparent")
        onPress()
    }

    return (
        <Button className="flex flex-row justify-between items-center" onPress={handleSetActive}>
            <View className="flex flex-col">
                <Text weight="regular" className="text-white text-[16px]">{label}</Text>
                <Text weight="regular" className="text-[#6B6B6B] text-[14px]">{description}</Text>
            </View>
            {isFeatureLocked && <LockIcon />}
            {active && !isFeatureLocked && <MarkIcon />}
        </Button>
    )
}