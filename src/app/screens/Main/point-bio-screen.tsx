import { MainLayout } from "../../layouts/main-layout"
import { View, TouchableOpacity, Platform } from "react-native"
import { ModalWrapper } from "@/src/shared/ui/modal-wrapper/modal-wrapper"
import Text from "@/src/shared/ui/text/text"
import { PointBioTab } from "@/src/features/point/ui/point-bio-tab"
import { Button } from "@/src/shared/ui/button/button"
//@ts-ignore
import MasonryList from "react-native-masonry-list";
import { PointSettings } from "@/src/features/point/ui/point-settings"
import { PointRadiusSettings } from "@/src/features/point/ui/point-radius-settings"
import { RadiusColorSettings } from "@/src/features/point/ui/radius-color-settings"
import { PhotoOptionsModal } from "@/src/features/point/ui/photo-options-modal"
import { PostCreationModal } from "@/src/features/point/ui/post-creation-modal"
import { useState, useRef } from "react"

import MailIcon from "@/src/shared/icons/mail-icon"
import ThreeDotIcon from "@/src/shared/icons/three-dot-icon"
import SendFeedBackIcon from "@/src/shared/icons/send-feedback-icon"
import RightArrowIcon from "@/src/shared/icons/right-arrow-icon"
import PlusIcon from "@/src/shared/icons/plus-icon"

import { usePointBioStore } from "@/src/features/point/model/point-bio-store"
import { useActiveStore } from "@/src/shared/model/use-active-store"
import { useVisibleStore } from "@/src/shared/model/use-visible-store"
import { useNavigation } from "@react-navigation/native"
import { hp } from "@/src/shared/utils/resize-dimensions"
import { useCameraStore } from "@/src/widget/camera/model/camera-store"


export const PointBioScreen = () => {
    const navigation = useNavigation()
    const { active, setActive } = useActiveStore("pointBio", 'bio')
    const { subscribed, setSubscribed } = usePointBioStore()
    const { open } = useVisibleStore("pointBio")
    const { open: openSettings } = useVisibleStore("pointSettings")
    const { open: openAddPost, close: closeAddPost } = useVisibleStore("addPost")
    const { open: openPhotoOptions } = useVisibleStore("photoOptions")

    const { clearImage } = useCameraStore("addPost")

    const buttons = [
        'bio', "Публикации"
    ]

    const images = [
        { uri: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80' },
        { uri: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' },
        { uri: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' },
        { uri: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80' },
        { uri: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' },
        { uri: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80' },
        { uri: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' },
        { uri: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' }
    ]

    const alternatingHeightsImages = images.map((item, index) => {
        const isEven = index % 2 === 0;

        return {
            ...item,
            dimensions: {
                height: isEven ? 219.70872497558594 : 178.95631408691406,
            }
        };
    });

    const handleOpenSection = (label: string) => {
        setActive(label)
    }

    const handleAddPost = (caption: string) => {
        clearImage()
        closeAddPost()
        setActive('Публикации')
    }

    const cancelPost = () => {
        clearImage()
        closeAddPost()
    }

    return (
        <MainLayout >
            <View className="w-[80%] mx-auto mt-4">
                <PointBioTab pointname="Point Name" nickname="point_name" onPress={openSettings} />
            </View>
            <View className="flex flex-row items-center mt-12 w-[90%] mx-auto relative">
                <Button variant="follow" onPress={setSubscribed}>
                    <Text weight="bold" className="text-[#5992FF] text-[13.82px]">{subscribed ? "Unfollow" : "+ Follow"}</Text>
                </Button>
                <Button variant="custom" className="w-[32.822383880615234px] h-[32.822383880615234px] bg-[#8888882E] rounded-[7.77px] border-[0.86px] border-[#888888] flex items-center justify-center ml-2">
                    <MailIcon />
                </Button>
                <View className="flex flex-col ml-6">
                    <Text weight="medium" className="text-white text-[13.82px]">787</Text>
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
                        {active === 'Публикации' && button === 'Публикации' && <TouchableOpacity
                            onPress={openPhotoOptions}
                            style={{
                                backgroundColor: '#5992FF',
                                width: 35,
                                height: 35,
                                marginLeft: 10,
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
                        </TouchableOpacity>}
                    </View>
                ))}
            </View>
            <View className="w-[95%] mx-auto flex flex-col mt-6">
                {
                    active === 'bio' &&
                    <View>
                        <Text className="text-[#888888] text-[11.23px]">About</Text>
                        <Text className="text-white mt-1 text-[13.82px] w-[80%]">Text bio 1132392094 smblsmany www.top.ru text more and - h wew</Text>
                    </View>
                }
                {
                    active === 'Публикации' &&
                    <MasonryList
                        images={alternatingHeightsImages}
                        columns={2}
                        spacing={2}
                        backgroundColor="transparent"
                        imageContainerStyle={{ borderRadius: 23.03 }}
                        onPressImage={(item: any, index: number) => {
                            //@ts-ignore
                            navigation.navigate('FullPost' as never, {
                                imageUri: item.uri,
                                index,
                            })
                        }}
                    />
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


            <ModalWrapper storeKey="photoOptions" isMini className="w-[90%]">
                <PhotoOptionsModal />
            </ModalWrapper>

            <ModalWrapper storeKey="addPost" isMini className="w-[90%]">
                <PostCreationModal
                    storeKey="addPost"
                    onPost={handleAddPost}
                    onCancel={cancelPost}
                />
            </ModalWrapper>
        </MainLayout >
    )
}
