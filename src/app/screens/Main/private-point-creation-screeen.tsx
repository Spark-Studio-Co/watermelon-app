import { MainLayout } from "../../layouts/main-layout"
import { View, Image, Keyboard } from "react-native"
import Text from "@/src/shared/ui/text/text"
import { Input } from "@/src/shared/ui/input/input"
import { useRef } from "react"
import { Button } from "@/src/shared/ui/button/button"

import CameraIcon from "@/src/shared/icons/camera-icon"
import { PointTypeSwitch } from "@/src/shared/ui/point-type-switch/point-type-switch"

export const PrivatePointCreationScreen = () => {
    const bioInputRef = useRef(null);
    return (
        <MainLayout>
            <View className="flex flex-col items-end mt-4">
                <Text weight="bold" className="text-white text-[24px]">Point #12123</Text>
            </View>
            <Image source={require('@/src/images/point_image.png')} className="w-full h-[182px] rounded-[12px] mt-1" />
            <View style={{ boxShadow: '0px 4px 4px 0px #00000040' }} className="rounded-[12px] ">
                <View className="flex flex-col py-2  w-[95%] justify-center mx-auto">
                    <Input placeholder="Point name user" className="h-[65px] placeholder:text-[#5C5A5A] text-[#5C5A5A] text-[20px] pl-6 mt-6 border-[1px] border-[#999999] rounded-[15px] w-full" />
                    <Text weight="bold" className="mt-6 text-white text-[24px]">Add bio</Text>
                    <Input
                        ref={bioInputRef}
                        returnKeyType="done"
                        multiline
                        placeholder="bio information..."
                        className="placeholder:text-[#5C5A5A] text-[#5C5A5A] text-[20px] pl-6 mt-6 pt-6 border-[1px] h-[156px] border-[#999999] rounded-[15px] w-full"
                        onSubmitEditing={() => {
                            Keyboard.dismiss();
                        }}
                    />
                </View>
                <View className="flex flex-row justify-between w-[90%] mx-auto mt-5">
                    <View className="flex flex-col items-center gap-y-5">
                        <Text weight="bold" className="text-white text-[24px]">Add photo</Text>
                        <Button variant="custom" className="bg-[#1B1C1E] flex items-center justify-center border border-[#222328] rounded-[15px] w-[100px] h-[100px]" style={{ boxShadow: '0px 4px 4px 0px #00000040' }}>
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
                        variant="custom"
                        className='w-[134px] py-3.5 rounded-[6px] bg-[#14A278] flex items-center justify-center'>
                        <Text weight="regular" className="text-white text-[16px]">CREATE</Text>
                    </Button>
                </View>
            </View>
        </MainLayout>
    )
}
