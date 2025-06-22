import React from "react";
import { View } from "react-native";
import Text from "@/src/shared/ui/text/text";

import RightArrowIcon from "@/src/shared/icons/right-arrow-icon";
import { Button } from "@/src/shared/ui/button/button";

export const ChatSettingsTab = ({
  title,
  description,
  isRadioButton,
  isClicked = false,
  isApplication = false,
  applications,
  onPress,
}: {
  title: string;
  description?: string;
  isRadioButton?: boolean;
  isClicked?: boolean;
  isApplication?: boolean;
  applications?: number;
  onPress: () => void;
}) => {
  return (
    <View className={`flex flex-row justify-between items-center w-full`}>
      <View
        className={`flex ${
          isApplication ? "flex-row items-center" : "flex-col"
        }`}
      >
        <Text className={`text-[16px] text-white font-[400]`}>{title}</Text>
        {description && (
          <Text className="text-[14px] text-[#6B6B6B] mt-[2px]">
            {description}
          </Text>
        )}
      </View>
      <Button onPress={onPress}>
        {isRadioButton ? (
          <View
            className={`border-white border-[2px] rounded-full w-[22px] h-[22px] flex items-center justify-center`}
          >
            {isClicked && (
              <View className="bg-white w-[14px] h-[14px] rounded-full"></View>
            )}
          </View>
        ) : (
          <RightArrowIcon />
        )}
      </Button>
    </View>
  );
};
