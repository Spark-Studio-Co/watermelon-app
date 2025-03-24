import { useState } from "react"
import { LinearGradient } from "expo-linear-gradient"
import { TouchableOpacity, View } from "react-native"

import { hp, wp } from "../../utils/resize-dimensions"

// icons
import EarthIcon from "../../icons/earth-icon"
import ProfileIcon from "../../icons/profile-icon"

interface MapSwitchProps {
    switched: boolean
    onSwitch: (val: boolean) => void
}

export const MapSwitch = ({ switched, onSwitch }: MapSwitchProps) => {
    const handleSwitch = () => {
        onSwitch(!switched);
    }

    return (
        <TouchableOpacity onPress={handleSwitch} className="border-[1px] border-white rounded-[19.5px] w-[99px] h-[45px] relative" activeOpacity={1}>
            <LinearGradient
                colors={['#000000', '#2D2D2D']}
                start={{ x: 0.1, y: 0.1 }}
                style={{ width: '100%', height: '100%', borderRadius: 19.5 }}>
                <View className={`${switched ? 'translate-x-14' : 'translate-x-0'} bg-white w-[37%] h-[80%] rounded-full absolute`} style={{ top: hp(0.43), left: wp(1.4) }} />
                <View className="flex flex-row items-center justify-between px-[15px] h-full">
                    <View className="z-10" style={{ marginLeft: wp(-1.7) }}>
                        <EarthIcon color={!switched ? 'black' : 'white'} />
                    </View>
                    <View className="z-10" style={{ marginRight: wp(-0.5) }}>
                        <ProfileIcon color={switched ? 'black' : 'white'} />
                    </View>
                </View>
            </LinearGradient>
        </TouchableOpacity>
    )
}