import { View } from "react-native";
import { useActiveStore } from "../../model/use-active-store";

export const StepsIndicator = () => {
  const { active } = useActiveStore("steps", "Registration");

  const steps = [
    "Registration",
    "CodeConfirmation",
    "Password",
    "AccountCreation",
  ];
  const currentStepIndex = steps.indexOf(active as string);

  return (
    <View className="flex flex-row gap-x-2">
      {steps.map((step, index) => (
        <View
          key={index}
          className={`${
            index <= currentStepIndex ? "bg-[#57AEF1]" : "bg-[#EDECEF]"
          } w-[20px] h-[4px] rounded-[2px]`}
        />
      ))}
    </View>
  );
};
