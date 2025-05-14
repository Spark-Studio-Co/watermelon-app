import React from "react"
import { View, Modal } from "react-native"
import Text from "@/src/shared/ui/text/text"
import { Button } from "@/src/shared/ui/button/button"
import CloseModalIcon from "@/src/shared/icons/close-modal-icon"
import WinIcon from "@/src/shared/icons/win-icon"

import { useNavigation } from "@react-navigation/native"

interface WinModalProps {
    visible: boolean
    onClose: () => void
    id: string | null
    name: string
}

export const WinModal = ({ visible, onClose, id, name }: WinModalProps) => {
    const navigation = useNavigation()

    const handlePointNavigate = () => {
        onClose(); // ✅ вызываем закрытие модалки
        //@ts-ignore
        navigation.navigate("GlobalPointCreation" as never, { id: id, name: name })
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View className="flex-1 justify-center items-center bg-black/70">
                <View className="bg-[#1B1C1E] rounded-[12px] w-[90%] max-w-[400px] items-center py-8 px-4">
                    <Button variant="custom" className="absolute -top-4 right-0" onPress={onClose}>
                        <CloseModalIcon />
                    </Button>

                    <WinIcon />

                    <Text weight="bold" className="text-white text-[32px] mb-2">
                        Победа!
                    </Text>

                    <Text weight="regular" className="text-white text-[16px] text-center">
                        Наблюдайте за изменениями аукциона в разделе мои ставки
                    </Text>

                    <Button variant="custom" className="bg-[#343434] mt-6 rounded-[10px] w-full flex items-center justify-center h-[54px] mx-4" onPress={handlePointNavigate}>
                        <Text weight="medium" className="text-white text-[20px]">
                            Перейти
                        </Text>
                    </Button>
                </View>
            </View>
        </Modal>
    )
}
