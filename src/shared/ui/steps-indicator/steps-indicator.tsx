import { View } from "react-native";
import { useActiveStore } from "../../model/use-active-store";

export const StepsIndicator = () => {
    const { active } = useActiveStore("steps", "Registration");

    return (
        <View className="flex flex-row gap-x-2">
            {["Registration", "CodeConfirmation", "Password"].map((step, index) => (
                <View
                    key={index}
                    className={`${active === step ? "bg-[#57AEF1]" : "bg-[#EDECEF]"
                        } w-[20px] h-[4px] rounded-[2px]`}
                />
            ))}
        </View>
    );
};