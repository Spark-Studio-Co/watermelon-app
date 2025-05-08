import { ReactNode } from "react"
import { TouchableOpacity, View } from "react-native"
import { TouchableOpacityProps } from "react-native"
import Text from "../text/text"
import RightArrowIcon from "../../icons/right-arrow-icon"

import { useIncomingFriendsData } from "@/src/entities/friends/api/use-incoming-friends-data"

interface ISettingsButtonProps extends TouchableOpacityProps {
    label: string
    icon: ReactNode
    isFriendsSettings?: boolean
    isApplicationSettings?: boolean
    className?: string
}

export const SeettingsButton = ({ label, icon, className, isFriendsSettings, isApplicationSettings, ...props }: ISettingsButtonProps) => {
    const { data: incomingFriends } = useIncomingFriendsData()

    return (
        <TouchableOpacity activeOpacity={0.7} className={`${className} h-[62px] rounded-[15px] px-4 w-full mx-auto flex items-center justify-between flex-row ${isApplicationSettings ? '' : 'bg-[#262A34]'}`} {...props}>
            <View className="flex flex-row items-center gap-x-3">
                {icon}
                <Text weight="regular" className="text-white text-[16px]">{label}</Text>
            </View>
            {isFriendsSettings ? <View className='bg-white w-[20px] h-[20px] flex items-center justify-center rounded-full'><Text weight="regular" className="text-black text-[11px]">{incomingFriends?.length}</Text></View> : <RightArrowIcon />}
        </TouchableOpacity>
    )
}
