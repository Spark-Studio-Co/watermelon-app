import { View, Image } from "react-native"
import Text from "@/src/shared/ui/text/text"
import { Button } from "@/src/shared/ui/button/button"

import BigThreeDots from "@/src/shared/icons/bit-three-dot-icon"

import { useChatStore } from "../model/chat-store"

type Status = "Online" | "Offline"

interface IChatTabProps {
    isGlobal?: boolean
}

export const ChatTab = ({ isGlobal }: IChatTabProps) => {

    const { avatar, name, status } = useChatStore()

    return (
        <View className="flex flex-row justify-between w-[90%] ml-auto pr-8 items-center h-[54px] mb-8 mt-10">
            <View className="flex flex-row h-full">
                <Image source={avatar} className="w-[54px] h-full  rounded-full" />
                <View className="flex flex-col justify-between ml-7">
                    <Text weight="regular" className="text-white text-[17.4px]">{name}</Text>
                    <Text weight="regular" className={`${status === 'Online' ? 'text-[#31A6FF]' : 'text-[#656565]'} text-[14px]`}>{status === 'Online' ? 'Online' : 'Offline'}</Text>
                </View>
            </View>
            <Button>
                <BigThreeDots />
            </Button>
        </View>
    )
}
