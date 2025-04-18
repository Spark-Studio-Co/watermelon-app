import { MainLayout } from "../../layouts/main-layout"
import { View, TouchableOpacity, Image, Keyboard } from "react-native"
import { ModalWrapper } from "@/src/shared/ui/modal-wrapper/modal-wrapper"
import Text from "@/src/shared/ui/text/text"
import { PointBioTab } from "@/src/features/point/ui/point-bio-tab"
import { Button } from "@/src/shared/ui/button/button"
//@ts-ignore
import MasonryList from "react-native-masonry-list";
import { PointSettings } from "@/src/features/point/ui/point-settings"
import { PointRadiusSettings } from "@/src/features/point/ui/point-radius-settings"
import { RadiusColorSettings } from "@/src/features/point/ui/radius-color-settings"
import { PointNameSettings } from "@/src/features/point/ui/point-name-settings"
import { Input } from "@/src/shared/ui/input/input"
import { CameraModalWidget } from "@/src/widget/camera/ui/camera-modal-widget"
import { PointBioSettings } from "@/src/features/point/ui/point-bio-settings"


import MailIcon from "@/src/shared/icons/mail-icon"
import ThreeDotIcon from "@/src/shared/icons/three-dot-icon"
import SendFeedBackIcon from "@/src/shared/icons/send-feedback-icon"
import RightArrowIcon from "@/src/shared/icons/right-arrow-icon"
import PlusIcon from "@/src/shared/icons/plus-icon"
import CameraIcon from "@/src/shared/icons/camera-icon"

import { usePointBioStore } from "@/src/features/point/model/point-bio-store"
import { useActiveStore } from "@/src/shared/model/use-active-store"
import { useVisibleStore } from "@/src/shared/model/use-visible-store"
import { RouteProp, useNavigation } from "@react-navigation/native"
import { hp } from "@/src/shared/utils/resize-dimensions"
import { useEffect, useRef, useState } from "react"
import { useCameraPermissions } from "expo-camera"
import { useCameraStore } from "@/src/widget/camera/model/camera-store"
import { useMarkerDataById } from "@/src/entities/markers/api/use-marker-data-by-id"
import { useGetMe } from "@/src/entities/users/api/use-get-me"
import { useMarkerStore } from "@/src/entities/markers/model/use-marker-store"
import { useUploadImage } from "@/src/entities/markers/api/use-upload-image"
import { usePrivatePublicationsData } from "@/src/entities/markers/api/use-private-publications-data"

type PointBioRouteProp = {
    route: RouteProp<any, any>
}

type RouteParams = {
    id: string;
    ownerId: string
    isPrivate: boolean
}

export const PointBioScreen = ({ route }: PointBioRouteProp) => {
    const { id, ownerId, isPrivate } = route.params as RouteParams
    const { data: publications, isLoading } = usePrivatePublicationsData(id)
    const { mutate: uploadImage } = useUploadImage()
    const { setId, setIsPrivate } = useMarkerStore()

    useEffect(() => {
        setId(id)
        setIsPrivate(isPrivate)
    }, [id])

    const { data: marker } = useMarkerDataById(id)
    const { data: me } = useGetMe()

    const bioInputRef = useRef(null);
    const navigation = useNavigation()
    const { open: openPost } = useVisibleStore("post")
    const { active, setActive } = useActiveStore("pointBio", 'bio')
    const { subscribed, setSubscribed } = usePointBioStore()
    const { open } = useVisibleStore("pointBio")
    const { open: openSettings } = useVisibleStore("pointSettings")
    const [permission, requestPermission] = useCameraPermissions();
    const { image, clearImage } = useCameraStore('post')
    const { setImage } = useCameraStore('fullPost')
    const [caption, setCaption] = useState('');


    const buttons = [
        'bio', "Публикации"
    ]

    const alternatingHeightsImages = publications?.map((item: any, index: number) => {
        const isEven = index % 2 === 0;

        return {
            uri: item?.image,
            dimensions: {
                height: isEven ? 219.70872497558594 : 178.95631408691406,
            }
        };
    });

    const handleOpenSection = (label: string) => {
        setActive(label)
    }

    const openCamera = async () => {
        const { granted } = await requestPermission();
        if (granted) {
            openPost()
        } else {
            console.log('Camera permission not granted');
        }
    };

    const createPost = () => {
        const formData = new FormData();

        if (image) {
            formData.append('caption', caption);
            formData.append('image', image);
            formData.append('markerId', id);

            console.log(formData)

            uploadImage(formData)

            setTimeout(() => {
                clearImage()
            }, 500)

            setActive("Публикации");
        }
    }

    return (
        <MainLayout>
            <View className="w-[80%] mx-auto mt-4">
                <PointBioTab pointname={marker?.name} nickname="point_name" onPress={openSettings} />
            </View>
            <View className="flex flex-row items-center mt-12 w-[90%] mx-auto relative">
                {ownerId === me?.id ? <View className="ml-10" /> : <>
                    <Button variant="follow" onPress={setSubscribed}>
                        <Text weight="bold" className="text-[#5992FF] text-[13.82px]">{subscribed ? "Unfollow" : "+ Follow"}</Text>
                    </Button>
                    <Button onPress={() => navigation.navigate('PrivateChat' as never)} variant="custom" className="w-[32.822383880615234px] h-[32.822383880615234px] bg-[#8888882E] rounded-[7.77px] border-[0.86px] border-[#888888] flex items-center justify-center ml-2">
                        <MailIcon />
                    </Button>
                </>}
                <View className="flex flex-col ml-6">
                    <Text weight="medium" className="text-white text-[13.82px]">{marker?.followersCount}</Text>
                    <Text weight="regular" className="text-[#888888] text-[11.23px]">Followers</Text>
                </View>
                <View className="flex flex-col ml-4">
                    <Text weight="medium" className="text-white text-[13.82px]">787</Text>
                    <Text weight="regular" className="text-[#888888] text-[11.23px]">Following</Text>
                </View>
                <Button onPress={open} variant="custom" className="ml-6 w-[32.822383880615234px] h-[32.822383880615234px] bg-[#313034] rounded-[7.77px] flex items-center justify-center">
                    <ThreeDotIcon />
                </Button>
                <ModalWrapper storeKey="pointBio" isMini>
                    <Button activeOpacity={0.9} className="bg-[#313034] flex flex-row items-center justify-between w-[335px] h-[62px] rounded-[15px] px-6" style={{ top: hp(-17) }}>
                        <View className="flex flex-row items-center gap-x-4">
                            <SendFeedBackIcon />
                            <Text weight="regular" className="text-white text-[18px]">Поделиться</Text>
                        </View>
                        <RightArrowIcon />
                    </Button>
                </ModalWrapper>
            </View>
            <View className="mx-auto flex flex-row gap-x-4 items-center justify-center mt-6">
                {buttons.map((button, index) => (
                    <View className="flex flex-row items-center" key={index}>
                        <Button
                            storeKey="pointBio"
                            onPress={() => handleOpenSection(button)}
                            variant="settings"
                            label={button}
                        >
                            <Text weight="regular" className="text-white text-[14px]">
                                {button}
                            </Text>
                        </Button>
                    </View>
                ))}
                <TouchableOpacity
                    onPress={() => setActive('post')}
                    style={{
                        backgroundColor: '#5992FF',
                        width: 35,
                        height: 35,
                        borderRadius: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.3,
                        shadowRadius: 3,
                        elevation: 5,
                        zIndex: 999,
                    }}
                >
                    <PlusIcon color="white" />
                </TouchableOpacity>
            </View>
            <View className="w-[95%] mx-auto flex flex-col mt-6">
                {
                    active === 'bio' &&
                    <View>
                        <Text className="text-[#888888] text-[11.23px]">About</Text>
                        <Text className="text-white mt-1 text-[13.82px] w-[80%]">{marker?.description}</Text>
                    </View>
                }
                {
                    active === 'Публикации' &&
                    (publications === null ? <Text className="text-white mt-1 text-[13.82px] w-[80%]">No publications</Text> : <MasonryList
                        images={alternatingHeightsImages}
                        columns={2}
                        spacing={2}
                        backgroundColor="transparent"
                        imageContainerStyle={{ borderRadius: 23.03 }}
                        onPressImage={(item: any, index: number) => {
                            console.log("🖼️ Clicked item:", item);
                            setImage(item.uri);
                            //@ts-ignore
                            navigation.navigate("FullPost" as never, {
                                index,
                                storeKey: 'pointBio'
                            });
                        }}
                    />)
                }
                {
                    active === 'post' &&
                    <View className="flex items-center justify-center mt-8">
                        <Text weight="bold" className=" text-white text-[24px]">Add text</Text>
                        <Input
                            ref={bioInputRef}
                            returnKeyType="done"
                            value={caption}
                            multiline
                            onChangeText={setCaption}
                            placeholder="Ваше сообщение..."
                            className="placeholder:text-[#5C5A5A] text-[#5C5A5A] text-[20px] px-6 mt-6 pt-6 border-[1px] h-[156px] border-[#999999] rounded-[15px] w-full"
                            onSubmitEditing={() => {
                                Keyboard.dismiss();
                            }}
                        />
                        {image ? <Image
                            source={image ? { uri: image } : require('@/src/images/point_image.png')}
                            className="w-[100%] h-[300px] mt-7 rounded-[12px]"
                        /> :
                            <View className="mt-7 flex flex-col items-center gap-y-5">
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
                        }
                        <Button
                            onPress={createPost}
                            variant="custom"
                            className='w-[134px] mt-[55px] py-3.5 rounded-[6px] bg-[#14A278] flex items-center justify-center'>
                            <Text weight="regular" className="text-white text-[16px]">CREATE</Text>
                        </Button>
                    </View>
                }
            </View>
            <ModalWrapper storeKey="pointSettings" isMini className="w-[90%]">
                <PointSettings />
            </ModalWrapper>
            <ModalWrapper storeKey="pointRadius" isMini className="w-[90%]">
                <PointRadiusSettings />
            </ModalWrapper>
            <ModalWrapper storeKey="radiusColor" isMini className="w-[90%] -top-8">
                <RadiusColorSettings />
            </ModalWrapper>
            <ModalWrapper storeKey="pointName" isMini className="w-[90%] -top-8">
                <PointNameSettings />
            </ModalWrapper>
            <ModalWrapper storeKey="pointBioSettings" isMini className="w-[90%] -top-8">
                <PointBioSettings />
            </ModalWrapper>
            <CameraModalWidget storeKey="post" />
        </MainLayout >
    )
}
