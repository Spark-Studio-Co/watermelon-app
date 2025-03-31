import { Modal, View, TouchableWithoutFeedback, TouchableOpacity } from "react-native"

import { useVisibleStore } from "../../model/use-visible-store"
import { BottomSheet } from "../bottom-sheet/bottom-sheet"

interface IModalWrapper {
    children: React.ReactNode
    storeKey: string
    isBottomSheet?: boolean
    isMini?: boolean
}

export const ModalWrapper = ({ children, storeKey, isBottomSheet, isMini }: IModalWrapper) => {

    const { close, isVisible } = useVisibleStore(storeKey)

    return (
        <Modal
            visible={isVisible}
            animationType={isMini ? "fade" : "slide"}
            transparent={true}
            className="relative h-full"
        >
            {isBottomSheet ? (
                <BottomSheet onClose={close}>
                    {children}
                </BottomSheet>
            ) : (
                isMini ?
                    <View className="flex-1 justify-center items-center">
                        <TouchableWithoutFeedback onPress={close}>
                            <View className="absolute top-0 left-0 right-0 bottom-0" />
                        </TouchableWithoutFeedback>
                        <View pointerEvents="box-none">
                            {children}
                        </View>
                    </View> :
                    <View className="flex-1 justify-center items-center" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <TouchableWithoutFeedback onPress={close}>
                            <View className="absolute top-0 left-0 right-0 bottom-0" />
                        </TouchableWithoutFeedback>
                        <View pointerEvents="box-none">
                            {children}
                        </View>
                    </View>
            )}
        </Modal>
    )
}
