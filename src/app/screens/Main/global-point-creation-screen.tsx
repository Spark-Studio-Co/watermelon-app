import { MainLayout } from "../../layouts/main-layout"
import { View, Image, Keyboard, TouchableOpacity, Modal, StyleSheet } from "react-native"
import Text from "@/src/shared/ui/text/text"
import { Input } from "@/src/shared/ui/input/input"
import { useRef, useState } from "react"
import { Button } from "@/src/shared/ui/button/button"
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useNavigation } from "@react-navigation/native"

import CameraIcon from "@/src/shared/icons/camera-icon"

export const GlobalPointCreationScreen = () => {
    const navigation = useNavigation()
    const bioInputRef = useRef(null);
    const cameraRef = useRef<any>(null);

    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [showCamera, setShowCamera] = useState(false);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);


    const takePicture = async () => {
        if (cameraRef.current) {
            try {
                const photo = await cameraRef.current.takePictureAsync();
                setCapturedImage(photo.uri);
                setShowCamera(false);
            } catch (error) {
                console.error('Error taking picture:', error);
            }
        }
    };

    const openCamera = async () => {
        const { granted } = await requestPermission();
        if (granted) {
            setShowCamera(true);
        } else {
            console.log('Camera permission not granted');
        }
    };

    const flipCamera = () => {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    };
    return (
        <MainLayout>
            <View className="flex flex-col items-end mt-4">
                <Text weight="bold" className="text-white text-[24px]">Point #12123</Text>
            </View>
            <Image
                source={capturedImage ? { uri: capturedImage } : require('@/src/images/point_image.png')}
                className="w-full h-[182px] rounded-[12px] mt-1"
            />
            <View style={{ boxShadow: '0px 4px 4px 0px #00000040' }} className="rounded-[12px] ">
                <View className="flex flex-col py-2  w-[95%] justify-center mx-auto">
                    <Input placeholder="Point name user" className="h-[65px] placeholder:text-[#5C5A5A] text-[#5C5A5A] text-[20px] pl-6 mt-6 border-[1px] border-[#999999] rounded-[15px] w-full" />
                    <Text weight="bold" className="mt-6 text-white text-[24px]">Add bio</Text>
                    <Input
                        ref={bioInputRef}
                        returnKeyType="done"
                        multiline
                        placeholder="bio information..."
                        className="placeholder:text-[#5C5A5A] text-[#5C5A5A] text-[20px] px-6 mt-6 pt-6 border-[1px] h-[156px] border-[#999999] rounded-[15px] w-full"
                        onSubmitEditing={() => {
                            Keyboard.dismiss();
                        }}
                    />
                </View>
                <View className="flex items-center justify-center mt-5">
                    <View className="flex flex-col items-center gap-y-5">
                        <Text weight="bold" className="text-white text-[24px]">Add photo</Text>
                        <Button
                            onPress={openCamera}
                            variant="custom"
                            className="bg-[#1B1C1E] flex items-center justify-center border border-[#222328] rounded-[15px] w-[100px] h-[100px]"
                            style={{ boxShadow: '0px 4px 4px 0px #00000040' }}
                        >
                            <CameraIcon />
                        </Button>
                    </View>
                </View>
                <View className="mt-10 mb-9 flex items-center justify-center">
                    <Button
                        onPress={() => navigation.navigate("PointBio" as never)}
                        variant="custom"
                        className='w-[134px] py-3.5 rounded-[6px] bg-[#14A278] flex items-center justify-center'>
                        <Text weight="regular" className="text-white text-[16px]">CREATE</Text>
                    </Button>
                </View>
            </View>
            <Modal
                visible={showCamera}
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
                                onPress={() => setShowCamera(false)}
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
        </MainLayout>
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
