import { useState } from "react"
import { LinearGradient } from "expo-linear-gradient"
import { TouchableOpacity, View } from "react-native"

import { hp, wp } from "../../utils/resize-dimensions"

export const MapSwitch = () => {
    const [switched, setSwitched] = useState<boolean>(false)

    const handleSwitch = () => {
        setSwitched((prev) => !prev);
    }

    return (
        <TouchableOpacity onPress={handleSwitch} className="border-[1px] border-white rounded-[19.5px] w-[99px] h-[45px] relative" activeOpacity={0.7}>
            <LinearGradient
                colors={['#000000', '#2D2D2D']}
                start={{ x: 0.1, y: 0.1 }}
                style={{ width: '100%', height: '100%', borderRadius: 19.5 }}>
                <View className={`${switched ? 'translate-x-14' : 'translate-x-0'} bg-white w-[37%] h-[80%] rounded-full absolute`} style={{ top: hp(0.43), left: wp(1.4) }} />
            </LinearGradient>
        </TouchableOpacity>
    )
}
