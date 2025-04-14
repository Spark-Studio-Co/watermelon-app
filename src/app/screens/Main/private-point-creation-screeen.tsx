import { MainLayout } from "../../layouts/main-layout"
import { View, Image, Keyboard } from "react-native"
import Text from "@/src/shared/ui/text/text"
import { Input } from "@/src/shared/ui/input/input"
import { useRef, useState } from "react"
import { Button } from "@/src/shared/ui/button/button"
import { useCameraPermissions } from 'expo-camera';
import { PointTypeSwitch } from "@/src/shared/ui/point-type-switch/point-type-switch"
import { CameraModalWidget } from "@/src/widget/camera/ui/camera-modal-widget"
import { ModalWrapper } from "@/src/shared/ui/modal-wrapper/modal-wrapper"
import * as ImagePicker from 'expo-image-picker';

import { useNavigation } from "@react-navigation/native"
import { useCameraStore } from "@/src/widget/camera/model/camera-store"
import { useVisibleStore } from "@/src/shared/model/use-visible-store"
import { useMarkerStore } from '@/src/entities/markers/model/use-marker-store';
import { useCreateMarker } from "@/src/entities/markers/api/use-create-marker"
import { useQueryClient } from "@tanstack/react-query"


import CameraIcon from "@/src/shared/icons/camera-icon"

export const PrivatePointCreationScreen = () => {
    const queryClient = useQueryClient()
    const navigation = useNavigation()
    const bioInputRef = useRef(null);

    const [photoUri, setPhotoUri] = useState<string | null>(null);
    const [pointType, setPointType] = useState<string>("standard");
    const { image, setImage } = useCameraStore('privateCamera')
    const { open } = useVisibleStore("privateCamera")
    const { open: openChoice, close: closeChoice } = useVisibleStore("cameraChoice")
    const [permission, requestPermission] = useCameraPermissions();

    const { mutate: createPoint } = useCreateMarker();
    const { setName, setDescription, name, description, latitude, longitude, isPrivate, ownerId } = useMarkerStore()

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

    const handleSubmit = () => {
        const data = new FormData();

        const photoToSend = photoUri || image;
        if (photoToSend) {
            const fileName = photoToSend.split("/").pop() || "photo.jpg";
            const fileType = fileName.split(".").pop();
            const mimeType = `image/${fileType}`;

            data.append("image", {
                uri: photoToSend,
                name: fileName,
                type: mimeType,
            } as any);
        }

        if (name) data.append("name", name);
        if (description) data.append("description", description);
        if (pointType) data.append("type", String(pointType));
        if (latitude) data.append("latitude", String(latitude));
        if (longitude) data.append("longitude", String(longitude));
        if (ownerId) data.append("ownerId", ownerId)
        data.append("isPrivate", String(isPrivate));

        createPoint(data, {
            onSuccess: (data: any) => {
                console.log("✅ Маркер успешно создан!", data);
                queryClient.invalidateQueries({
                    queryKey: 'markers'
                })
                setTimeout(() => {
                    //@ts-ignore
                    navigation.navigate("PointBio" as never, {
                        id: data?.id,
                        ownerId: data?.ownerId
                    })
                }, 500)
            },
            onError: (error) => {
                console.error("❌ Ошибка при создании маркера:", error.response);
            }
        });
    };

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
                    <Input value={name} onChangeText={setName} placeholder="Point name user" className="h-[65px] placeholder:text-[#5C5A5A] text-[#5C5A5A] text-[20px] pl-6 mt-6 border-[1px] border-[#999999] rounded-[15px] w-full" />
                    <Text weight="bold" className="mt-6 text-white text-[24px]">Add bio</Text>
                    <Input
                        value={description}
                        onChangeText={setDescription}
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
                            <PointTypeSwitch value={pointType} onChange={setPointType} />
                        </View>
                    </View>
                </View>
                <View className="mt-10 mb-9 flex items-center justify-center">
                    <Button
                        onPress={() => handleSubmit()}
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
            <CameraModalWidget storeKey="privateCamera" onPhotoTaken={(uri) => setPhotoUri(uri)} />
        </MainLayout>
    )
}
