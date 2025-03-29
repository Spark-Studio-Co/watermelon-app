import React from "react"
import { View, Modal, Image } from "react-native"
import Text from "@/src/shared/ui/text/text"
import { Button } from "@/src/shared/ui/button/button"
import CloseModalIcon from "@/src/shared/icons/close-modal-icon"
import SuccessBetIcon from "@/src/shared/icons/success-bet-icon"

interface BetSuccessModalProps {
    visible: boolean
    onClose: () => void
}

export const BetSuccessModal = ({ visible, onClose }: BetSuccessModalProps) => {
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

                    <SuccessBetIcon />

                    <Text weight="bold" className="text-white text-[32px] mb-2">
                        Ставка принята
                    </Text>

                    <Text weight="regular" className="text-white text-[16px] text-center">
                        Наблюдайте за изменениями аукциона в разделе мои ставки
                    </Text>
                </View>
            </View>
        </Modal>
    )
}
