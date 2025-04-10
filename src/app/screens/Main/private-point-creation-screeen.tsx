import { MainLayout } from "../../layouts/main-layout"
import { View, Image, Keyboard } from "react-native"
import Text from "@/src/shared/ui/text/text"
import { Input } from "@/src/shared/ui/input/input"
import { useRef } from "react"
import { Button } from "@/src/shared/ui/button/button"
import { useCameraPermissions } from 'expo-camera';
import { PointTypeSwitch } from "@/src/shared/ui/point-type-switch/point-type-switch"
import { CameraModalWidget } from "@/src/widget/camera/ui/camera-modal-widget"
import { ModalWrapper } from "@/src/shared/ui/modal-wrapper/modal-wrapper"
import * as ImagePicker from 'expo-image-picker';

import { useNavigation } from "@react-navigation/native"
import { useCameraStore } from "@/src/widget/camera/model/camera-store"
import { useVisibleStore } from "@/src/shared/model/use-visible-store"

import CameraIcon from "@/src/shared/icons/camera-icon"

export const PrivatePointCreationScreen = () => {
    const navigation = useNavigation()
    const bioInputRef = useRef(null);

    const { image, setImage } = useCameraStore('privateCamera')
    const { open } = useVisibleStore("privateCamera")
    const { open: openChoice, close: closeChoice } = useVisibleStore("cameraChoice")
    const [permission, requestPermission] = useCameraPermissions();

    const openCamera = async () => {
        const { granted } = await requestPermission();
        if (granted) {
            closeChoice()
            open()
        } else {
            console.log('Camera permission not granted');
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        closeChoice()

        if (!result.canceled && result.assets?.length) {
            setImage(result.assets[0].uri);
        } else {
            setImage(null);
        }
    }

    return (
        <MainLayout>
            <View className="flex flex-col items-end mt-4">
                <Text weight="bold" className="text-white text-[24px]">Point #12123</Text>
            </View>
            <Image
                source={image ? { uri: image } : require('@/src/images/point_image.png')}
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
                <View className="flex flex-row justify-between w-[90%] mx-auto mt-5">
                    <View className="flex flex-col items-center gap-y-5">
                        <Text weight="bold" className="text-white text-[24px]">Add photo</Text>
                        <Button
                            onPress={openChoice}
                            variant="custom"
                            className="bg-[#1B1C1E] flex items-center justify-center border border-[#222328] rounded-[15px] w-[100px] h-[100px]"
                            style={{ boxShadow: '0px 4px 4px 0px #00000040' }}
                        >
                            <CameraIcon />
                        </Button>
                    </View>
                    <View className="flex flex-col items-center gap-y-5">
                        <Text weight="bold" className="text-white text-[24px]">Select type</Text>
                        <View className="bg-[#1B1C1E] flex items-center justify-center border border-[#222328] rounded-[15px] w-[203px] h-[100px]" style={{ boxShadow: '0px 4px 4px 0px #00000040' }}>
                            <PointTypeSwitch />
                        </View>
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
            <ModalWrapper storeKey="cameraChoice">
                <View className=" bg-[#38373A] w-[90%] px-8 rounded-lg">
                    <View className="flex flex-row items-center justify-between w-[100%] h-[200px]">
                        <Button className="bg-[#27262A] px-4 py-3 rounded-md" onPress={openCamera}>
                            <Text weight="medium" className="text-white">Make a photo</Text>
                        </Button>
                        <Button className="bg-[#27262A] px-4 py-3 rounded-md" onPress={pickImage}>
                            <Text weight="medium" className="text-white">Pick from gallery</Text>
                        </Button>
                    </View>
                </View>
            </ModalWrapper>
            <CameraModalWidget storeKey="privateCamera" />
        </MainLayout>
    )
}
