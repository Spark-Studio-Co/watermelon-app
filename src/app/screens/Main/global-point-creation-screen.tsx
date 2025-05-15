import { MainLayout } from "../../layouts/main-layout"
import { View, Image, Keyboard } from "react-native"
import Text from "@/src/shared/ui/text/text"
import { Input } from "@/src/shared/ui/input/input"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/src/shared/ui/button/button"
import { useCameraPermissions } from 'expo-camera';
import { CameraModalWidget } from "@/src/widget/camera/ui/camera-modal-widget"
import * as ImagePicker from 'expo-image-picker';

import CameraIcon from "@/src/shared/icons/camera-icon"

import { useVisibleStore } from "@/src/shared/model/use-visible-store"
import { useNavigation } from "@react-navigation/native"
import { useCameraStore } from "@/src/widget/camera/model/camera-store"
import { ModalWrapper } from "@/src/shared/ui/modal-wrapper/modal-wrapper"
import { useMarkerStore } from "@/src/entities/markers/model/use-marker-store"
import { useMarkerDataById } from "@/src/entities/markers/api/use-marker-data-by-id"
import { useUpdateMarker } from "@/src/entities/markers/api/use-update-marker"
import queryClient from "../../config/queryClient"

export const GlobalPointCreationScreen = ({ route }: {
    route: {
        params: { id: any; name: any }
    }
}) => {
    const { name, id } = route.params;
    const { image, setImage } = useCameraStore('globalCamera')
    const { open } = useVisibleStore('globalCamera')
    const { open: openGlobalChoice, close: closeGlobalChoice } = useVisibleStore('globalChoice')
    const navigation = useNavigation()
    const bioInputRef = useRef(null);

    const { data: markerData } = useMarkerDataById(id)
    const { mutate: updatePoint } = useUpdateMarker(id)
    const { setName, setDescription, description, name: pointName } = useMarkerStore()

    const [permission, requestPermission] = useCameraPermissions();
    const [photoUri, setPhotoUri] = useState<string | null>(null);

    useEffect(() => {
        console.log(markerData)
    }, [markerData])

    const openCamera = async () => {
        const { granted } = await requestPermission();
        if (granted) {
            closeGlobalChoice()
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
        closeGlobalChoice()

        if (!result.canceled && result.assets?.length) {
            setImage(result.assets[0].uri);
        } else {
            setImage(null);
        }
    };

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


        if (name) data.append("name", pointName ?? 'Point');
        if (description) data.append("description", description);
        if (markerData?.type) data.append("type", String(markerData?.type));
        if (markerData?.latitude) data.append("latitude", String(markerData?.latitude));
        if (markerData?.longitude) data.append("longitude", String(markerData?.longitude));
        if (markerData?.ownerId) data.append("ownerId", markerData?.ownerId);
        data.append("isPrivate", "false");

        console.log(data)

        updatePoint(data, {
            onSuccess: (data: any) => {
                console.log("✅ Маркер успешно создан!", data);
                queryClient.invalidateQueries({
                    queryKey: ['markers']
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
                <Text weight="bold" className="text-white text-[24px]">{name}</Text>
            </View>
            <Image
                source={image ? { uri: image } : require('@/src/images/point_image.png')}
                className="w-full h-[182px] rounded-[12px] mt-1"
            />
            <View style={{ boxShadow: '0px 4px 4px 0px #00000040' }} className="rounded-[12px] ">
                <View className="flex flex-col py-2  w-[95%] justify-center mx-auto">
                    <Input placeholder="Point name user" className="h-[65px] placeholder:text-[#5C5A5A] text-[#5C5A5A] text-[20px] pl-6 mt-6 border-[1px] border-[#999999] rounded-[15px] w-full" onChangeText={setName} />
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
                        onChangeText={setDescription}
                    />
                </View>
                <View className="flex items-center justify-center mt-5">
                    <View className="flex flex-col items-center gap-y-5">
                        <Text weight="bold" className="text-white text-[24px]">Add photo</Text>
                        <Button
                            onPress={openGlobalChoice}
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
                        onPress={handleSubmit}
                        variant="custom"
                        className='w-[134px] py-3.5 rounded-[6px] bg-[#14A278] flex items-center justify-center'>
                        <Text weight="regular" className="text-white text-[16px]">CREATE</Text>
                    </Button>
                </View>
            </View>
            <ModalWrapper storeKey="globalChoice">
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
            <CameraModalWidget storeKey="globalCamera" />
        </MainLayout>
    )
}


