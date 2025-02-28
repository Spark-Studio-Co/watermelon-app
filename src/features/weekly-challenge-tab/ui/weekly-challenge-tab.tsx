import { View } from "react-native";
import Text from "@/src/shared/ui/text/text";
import { LinearGradient } from "expo-linear-gradient";
import { ProgressBar } from "./progress-bar";

import ChallengeIcon from "@/src/shared/icons/challenge-icon";

export const WeeklyChallengeTab = () => {
    return (
        <LinearGradient
            colors={['#87DECC', '#A5AEFE', '#ABB4EF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ width: '100%', height: 135, borderRadius: 15, paddingLeft: 26, display: "flex", flexDirection: 'column', marginTop: 17 }}
        >
            <View className="flex flex-row justify-between w-full">
                <View className="flex flex-col mt-6">
                    <Text weight="bold" className="text-[20px]">Create the first point</Text>
                    <Text weight="light" className="text-[12px] ml-2 mt-1">Set the first point on the map</Text>
                </View>
                <View className="mt-2">
                    <ChallengeIcon />
                </View>
            </View>
            <ProgressBar />
        </LinearGradient>
    );
};