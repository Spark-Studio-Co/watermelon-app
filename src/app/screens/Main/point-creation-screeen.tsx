import { MainLayout } from "../../layouts/main-layout"
import { View, Image, Keyboard } from "react-native"
import Text from "@/src/shared/ui/text/text"
import { Input } from "@/src/shared/ui/input/input"
import { useRef } from "react"

export const PointCreationScreen = () => {
    const bioInputRef = useRef(null);
    return (
        <MainLayout>
            <View className="flex flex-col items-end mt-4">
                <Text weight="bold" className="text-white text-[24px]">Point #12123</Text>
            </View>
            <Image source={require('@/src/images/point_image.png')} className="w-full h-[182px] rounded-[12px] mt-1" />
            <View style={{ boxShadow: '0px 4px 4px 0px #00000040' }} className="rounded-[12px] h-full">
                <View className="flex flex-col py-2  w-[95%] justify-center mx-auto">
                    <Input placeholder="Point name user" className="h-[65px] placeholder:text-[#5C5A5A] text-[#5C5A5A] text-[20px] pl-6 mt-6 border-[1px] border-[#999999] rounded-[15px] w-full" />
                    <Text weight="bold" className="mt-6 text-white text-[24px]">Add bio</Text>
                    <Input
                        ref={bioInputRef}
                        returnKeyType="done"
                        multiline
                        placeholder="bio information..."
                        className="placeholder:text-[#5C5A5A] text-[#5C5A5A] text-[20px] pl-6 mt-6 pt-6 border-[1px] min-h-[156px] border-[#999999] rounded-[15px] w-full"
                        onSubmitEditing={() => {
                            Keyboard.dismiss();
                        }}
                    // blurOnSubmit={true}
                    />
                </View>
            </View>
        </MainLayout>
    )
}
