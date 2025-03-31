import { MainLayout } from "../../layouts/main-layout"
import { View } from "react-native"
import { ModalWrapper } from "@/src/shared/ui/modal-wrapper/modal-wrapper"
import Text from "@/src/shared/ui/text/text"
import { PointBioTab } from "@/src/features/point/ui/point-bio-tab"
import { Button } from "@/src/shared/ui/button/button"
//@ts-ignore
import MasonryList from "react-native-masonry-list";

import MailIcon from "@/src/shared/icons/mail-icon"
import ThreeDotIcon from "@/src/shared/icons/three-dot-icon"
import SendFeedBackIcon from "@/src/shared/icons/send-feedback-icon"
import RightArrowIcon from "@/src/shared/icons/right-arrow-icon"

import { usePointBioStore } from "@/src/features/point/model/point-bio-store"
import { useActiveStore } from "@/src/shared/model/use-active-store"
import { useVisibleStore } from "@/src/shared/model/use-visible-store"
import { hp } from "@/src/shared/utils/resize-dimensions"


export const PointBioScreen = () => {
    const { active, setActive } = useActiveStore("pointBio", 'bio')
    const { subscribed, setSubscribed } = usePointBioStore()
    const { open } = useVisibleStore("pointBio")

    const buttons = [
        'bio', "Публикации"
    ]

    const images = [
        { uri: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80' },
        { uri: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' },
        { uri: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=735&q=80' },
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

    return (
        <MainLayout >
            <View className="w-[80%] mx-auto mt-4">
                <PointBioTab pointname="Point Name" nickname="point_name" />
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
                    <View className="bg-[#313034] flex flex-row items-center justify-between w-[335px] h-[62px] rounded-[15px] px-6" style={{ top: hp(-17) }}>
                        <View className="flex flex-row items-center gap-x-4">
                            <SendFeedBackIcon />
                            <Text weight="regular" className="text-white text-[18px]">Поделиться</Text>
                        </View>
                        <Button>
                            <RightArrowIcon />
                        </Button>
                    </View>
                </ModalWrapper>
            </View>
            <View className="mx-auto flex flex-row gap-x-4 items-center justify-center mt-6">
                {buttons.map((button, index) => (
                    <Button
                        storeKey="pointBio"
                        key={index}
                        onPress={() => handleOpenSection(button)}
                        variant="settings"
                        label={button}
                    >
                        <Text weight="regular" className="text-white text-[14px]">
                            {button}
                        </Text>
                    </Button>
                ))}
            </View>
            <View className="w-[90%] mx-auto flex flex-col mt-6">
                {
                    active === 'bio' &&
                    <View>
                        <Text className="text-[#888888] text-[11.23px]">About</Text>
                        <Text className="text-white mt-1 text-[13.82px] w-[80%]">Text bio 1132392094 smblsmany www.top.ru text more and - h wew</Text>
                    </View>
                }
                {
                    active === 'Публикации' &&
                    <View className="">
                        <MasonryList
                            images={alternatingHeightsImages}
                            columns={2}
                            spacing={2}
                            backgroundColor="transparent"
                            imageContainerStyle={{ borderRadius: 23.03 }}
                        />
                    </View>
                }
            </View>
        </MainLayout>
    )
}
