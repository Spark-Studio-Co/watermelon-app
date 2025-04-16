import { View, Image } from "react-native"
import Text from "@/src/shared/ui/text/text"
import { Button } from "@/src/shared/ui/button/button"
import * as ImagePicker from 'expo-image-picker';
import { ModalWrapper } from "@/src/shared/ui/modal-wrapper/modal-wrapper"
import { CameraModalWidget } from "@/src/widget/camera/ui/camera-modal-widget";

import GearIcon from "@/src/shared/icons/gear-icon"

import { useVisibleStore } from "@/src/shared/model/use-visible-store"
import { useCameraPermissions } from "expo-camera"
import { useCameraStore } from "@/src/widget/camera/model/camera-store";
import { useUpdateMarker } from "@/src/entities/markers/api/use-update-marker";
import { useMarkerStore } from "@/src/entities/markers/model/use-marker-store";
import { useQueryClient } from "@tanstack/react-query";
import { useMarkerDataById } from "@/src/entities/markers/api/use-marker-data-by-id";

interface IPointBioTab {
    pointname: string
    nickname: string
    image?: string | null
    onPress?: () => void
}

export const PointBioTab = ({ pointname, nickname, onPress }: Omit<IPointBioTab, 'image'>) => {
    const { setImage } = useCameraStore('pointImage');
    const { id } = useMarkerStore();
    const queryClient = useQueryClient();
    const { open: openChoice, close: closeChoice } = useVisibleStore("pointChoice");
    const { open } = useVisibleStore("pointImage");
    const { mutate } = useUpdateMarker(id);
    const { data: marker } = useMarkerDataById(id);
    const [permission, requestPermission] = useCameraPermissions();

    const handleUploadImage = (uri: string) => {
        const fileName = uri.split("/").pop() || "avatar.jpg";
        const fileType = fileName.split(".").pop();
        const mimeType = `image/${fileType}`;

        const formData = new FormData();
        formData.append("image", {
            uri,
            name: fileName,
            type: mimeType,
        } as any);

        mutate(formData, {
            onSuccess: (data: any) => {
                console.log(data)
                queryClient.invalidateQueries({ queryKey: ['markerById', id] });
                setImage(uri);
            },
            onError: (e) => {
                console.error("❌ Ошибка отправки изображения:", e);
            }
        });
    };

    const openCamera = async () => {
        const { granted } = await requestPermission();
        if (granted) {
            closeChoice();
            open();
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

        closeChoice();

        if (!result.canceled && result.assets?.length) {
            const uri = result.assets[0].uri;
            setImage(uri);
            handleUploadImage(uri);
        }
    };

    return (
        <View className="flex flex-row items-center justify-center gap-x-10 mt-8">
            <Button
                onPress={openChoice}
                style={{ height: 96, width: 96 }}
            >
                <Image
                    className='w-full h-full rounded-full'
                    source={marker?.image ? { uri: marker.image + `?t=${Date.now()}` } : require("../../../images/user_image.png")}
                />
            </Button>
            <View className="flex flex-col gap-y-2">
                <Text weight="regular" className="text-white text-[24px]">{pointname}</Text>
                <View className="flex flex-row items-center gap-x-2">
                    <Text weight="regular" className="text-white text-[14px]">@{nickname}</Text>
                </View>
            </View>
            <Button variant="custom" onPress={onPress}>
                <GearIcon />
            </Button>

            <ModalWrapper storeKey="pointChoice">
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

            <CameraModalWidget
                storeKey="pointImage"
                onPhotoTaken={(uri) => {
                    setImage(uri);
                    handleUploadImage(uri);
                }}
            />
        </View>
    );
};