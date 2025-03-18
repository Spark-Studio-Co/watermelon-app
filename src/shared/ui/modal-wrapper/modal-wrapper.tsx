import { Modal, View } from "react-native"

import { useVisibleStore } from "../../model/use-visible-store"
import { BottomSheet } from "../bottom-sheet/bottom-sheet"

interface IModalWrapper {
    children: React.ReactNode
    storeKey: string
    isBottomSheet?: boolean
}

export const ModalWrapepr = ({ children, storeKey, isBottomSheet }: IModalWrapper) => {

    const { close, isVisible } = useVisibleStore(storeKey)

    return (
        <Modal
            visible={isVisible}
            animationType="slide"
            transparent={true}
            className="relative h-full"
        >
            {isBottomSheet ?
                <BottomSheet onClose={close}>
                    {children}
                </BottomSheet>
                :
                <View className="fixed bg-black/50 flex-1">
                    {children}
                </View>
            }
        </Modal>
    )
}
