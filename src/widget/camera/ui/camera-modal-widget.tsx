import { View, TouchableOpacity, StyleSheet, Modal, Alert } from "react-native"
import Text from "@/src/shared/ui/text/text"
import { useRef, useState, useEffect } from "react"
import { CameraView, CameraType } from 'expo-camera';

import { useVisibleStore } from "@/src/shared/model/use-visible-store";
import { initCameraStore, useCameraStore } from "../model/camera-store";

interface ICameraModalWidgetProps {
    storeKey: string
}

export const CameraModalWidget = ({ storeKey }: ICameraModalWidgetProps) => {
    const storeRef = initCameraStore('addPost');
    const cameraRef = useRef<any>(null);
    const { setImage } = useCameraStore(storeKey)
    const { isVisible, close } = useVisibleStore(storeKey)
    const { open: openAddPost } = useVisibleStore("addPost")
    const { close: closePhotoOptions } = useVisibleStore("photoOptions")
    const [facing, setFacing] = useState<CameraType>('back');
    const [isTakingPicture, setIsTakingPicture] = useState(false);

    useEffect(() => {
        if (isVisible) {
            setIsTakingPicture(false);
        }
    }, [isVisible]);

    const takePicture = async () => {
        if (cameraRef.current && !isTakingPicture) {
            setIsTakingPicture(true);
            try {
                const photo = await cameraRef.current.takePictureAsync();
                setImage(photo.uri);
                closePhotoOptions();
                close();
                setTimeout(() => {
                    console.log("🟢 Opening add post modal...");
                    openAddPost();
                }, 200);
            } catch (error) {
                console.error('Error taking picture:', error);
                Alert.alert("Error", "Failed to take picture. Please try again.");
                setIsTakingPicture(false);
            }
        }
    };

    const flipCamera = () => {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    };

    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="slide"
        >
            <View style={styles.modalContainer}>
                <CameraView
                    ref={cameraRef}
                    style={styles.camera}
                    facing={facing}
                    className="flex-1"
                >
                    <View style={styles.cameraControls}>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => close()}
                        >
                            <Text weight="bold" className="text-white text-[18px]">Close</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.takePictureButton}
                            onPress={takePicture}
                        >
                            <View style={styles.takePictureButtonInner} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.flipButton}
                            onPress={flipCamera}
                        >
                            <Text weight="bold" className="text-white text-[18px]">Flip</Text>
                        </TouchableOpacity>
                    </View>
                </CameraView>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'black',
    },
    camera: {
        flex: 1,
    },
    cameraControls: {
        position: 'absolute',
        bottom: 30,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    closeButton: {
        padding: 10,
    },
    takePictureButton: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    takePictureButtonInner: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'white',
    },
    flipButton: {
        padding: 10,
    }
});