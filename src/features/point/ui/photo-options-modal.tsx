import Text from '@/src/shared/ui/text/text'
import React from 'react'
import { View, Alert } from 'react-native'
import { TouchableOpacity } from 'react-native'
import { CameraModalWidget } from '@/src/widget/camera/ui/camera-modal-widget'
import * as ImagePicker from 'expo-image-picker';

import { useVisibleStore } from '@/src/shared/model/use-visible-store'
import { useCameraPermissions } from 'expo-camera';
import { useCameraStore } from '@/src/widget/camera/model/camera-store';

export const PhotoOptionsModal = () => {
    const { open: openPostCamera } = useVisibleStore("postCamera")
    const { close: closePhotoOptions } = useVisibleStore("photoOptions")
    const { open: openAddPost } = useVisibleStore("addPost")
    const [permission, requestPermission] = useCameraPermissions();
    const { setImage } = useCameraStore("addPost");

    const openCamera = async () => {
        const { granted } = await requestPermission();
        if (granted) {
            openPostCamera()
        } else {
            console.log('Camera permission not granted');
        }
    };


    const selectFromGallery = async () => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (status === 'granted') {
                const result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [4, 3],
                    quality: 1,
                });

                if (!result.canceled) {
                    const uri = result.assets[0].uri;
                    setImage(uri);
                    closePhotoOptions();
                    setTimeout(() => {
                        console.log('Opening add post modal with gallery image');
                        openAddPost();
                    }, 500);
                }
            } else {
                Alert.alert(
                    "Permission Required",
                    "Gallery access is required to select photos",
                    [{ text: "OK" }]
                );
            }
        } catch (error) {
            console.error('Error selecting from gallery:', error);
        }
    };

    return (
        <View className="bg-[#313034] rounded-[20px] p-6">
            <Text weight="bold" className="text-white text-[20px] mb-6 text-center">Add Photo</Text>
            <View className="flex-row justify-between">
                <TouchableOpacity
                    // onPress={openCamera}
                    className="bg-[#1B1C1E] p-4 rounded-[15px] items-center justify-center w-[48%]"
                >
                    <View className="w-[50px] h-[50px] bg-[#313034] rounded-full items-center justify-center mb-3">
                        <Text className="text-[#5992FF] text-[24px]">📷</Text>
                    </View>
                    <Text weight="medium" className="text-white text-[16px]">Take Photo</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={selectFromGallery}
                    className="bg-[#1B1C1E] p-4 rounded-[15px] items-center justify-center w-[48%]"
                >
                    <View className="w-[50px] h-[50px] bg-[#313034] rounded-full items-center justify-center mb-3">
                        <Text className="text-[#5992FF] text-[24px]">🖼️</Text>
                    </View>
                    <Text weight="medium" className="text-white text-[16px]">Gallery</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                onPress={closePhotoOptions}
                className="mt-4 p-3 items-center"
            >
                <Text weight="medium" className="text-[#888888] text-[16px]">Cancel</Text>
            </TouchableOpacity>
            <CameraModalWidget storeKey='postCamera' />
        </View>
    )
}
