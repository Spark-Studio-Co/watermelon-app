import { View, Image } from "react-native"
import Text from "@/src/shared/ui/text/text"
import { Button } from "@/src/shared/ui/button/button"

import BigThreeDots from "@/src/shared/icons/bit-three-dot-icon"
import BackArrowIcon from "@/src/shared/icons/back-arrow-icon"

import { useChatStore } from "../model/chat-store"


interface IChatTabProps {
    isGlobal?: boolean
}

export const ChatTab = ({ isGlobal }: IChatTabProps) => {

    const { avatar, name, status, members, onlineAmount } = useChatStore()

    return (
        <View className={`${isGlobal ? 'w-[95%]' : 'w-[90%]'} flex flex-row justify-between ml-auto pr-8 items-center h-[54px] mb-8 mt-10`}>
            <View className="flex flex-row h-full items-center">
                {isGlobal && <Button className="mr-3">
                    <BackArrowIcon />
                </Button>}
                <Image source={avatar} className="w-[54px] h-full  rounded-full" />
                <View className="flex flex-col justify-between ml-7">
                    <Text weight="regular" className="text-white text-[17.4px]">{name}</Text>
                    {isGlobal ? <Text weight="regular" className="text-[#8E8E8E] text-[14px]">{members} members, {onlineAmount} amount</Text> : <Text weight="regular" className={`${status === 'Online' ? 'text-[#31A6FF]' : 'text-[#656565]'} text-[14px]`}>{status === 'Online' ? 'Online' : 'Offline'}</Text>
                    }
                </View>
            </View>
            <Button>
                <BigThreeDots />
            </Button>
        </View>
    )
}
