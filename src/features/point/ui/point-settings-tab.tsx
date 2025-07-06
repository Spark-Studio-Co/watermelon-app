import { Button } from "@/src/shared/ui/button/button";
import Text from "@/src/shared/ui/text/text";
import { View, ActivityIndicator } from "react-native";

import RightArrowIcon from "@/src/shared/icons/right-arrow-icon";
import { ReactNode } from "react";

interface IPointSettingsTab {
  isPrivate?: boolean;
  title: string;
  description?: string;
  onPress?: () => void;
  isClicked?: boolean;
  applications?: number | ReactNode;
  isLoading?: boolean;
}

export const PointSettingsTab = ({
  title,
  description,
  onPress,
  isPrivate,
  isClicked,
  applications,
  isLoading = false,
}: IPointSettingsTab) => {
  return (
    <Button
      className="flex flex-row justify-between items-center"
      onPress={onPress}
    >
      <View
        className={`flex ${
          applications ? "flex-row items-center" : "flex-col"
        }`}
      >
        <Text weight="regular" className="text-white text-[16px]">
          {title}
        </Text>
        {applications && (
          <View className="flex justify-center items-center bg-white rounded-[5px] w-[25.961538314819336px] h-[13px] ml-2">
            <Text className="text-[10px] text-dark">{applications}...</Text>
          </View>
        )}
        {description && (
          <Text weight="regular" className="text-[#6B6B6B] text-[14px]">
            {description}
          </Text>
        )}
      </View>
      {isPrivate ? (
        <View
          className={`border-white border-[2px] rounded-full w-[22px] h-[22px] flex items-center justify-center`}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            isClicked && (
              <View className="bg-white w-[14px] h-[14px] rounded-full"></View>
            )
          )}
        </View>
      ) : (
        <RightArrowIcon />
      )}
    </Button>
  );
};
