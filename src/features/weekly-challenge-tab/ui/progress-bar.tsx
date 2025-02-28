import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Text from "@/src/shared/ui/text/text";

export const ProgressBar = () => {
    return (
        <View className="w-[93%] h-[23px] flex-row items-center bg-[#D9D9D9] rounded-full overflow-hidden px-2 mt-1">
            <LinearGradient
                colors={["#202229", "#363738"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                    position: "absolute",
                    left: 0,
                    height: "100%",
                    width: "50%",
                    borderRadius: 11.5,
                }}
            />
            <View className="absolute right-2">
                <Text className="text-black text-[15px]">0|1</Text>
            </View>
        </View>
    );
};