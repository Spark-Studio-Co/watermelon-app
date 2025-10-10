import React from "react";
import { View, Image } from "react-native";
import Text from "@/src/shared/ui/text/text";
import { Button } from "@/src/shared/ui/button/button";

interface IEnhancedPointTabProps {
  type: string | "Premium" | "Chat" | "Standard";
  name: string | null;
  subscribers?: number | null;
  views?: number | null;
  members?: number | null;
  image?: string;
  onPress?: () => void;
  newMessagesCount?: number;
}

export const EnhancedSavedPointTab = ({
  type,
  name,
  subscribers,
  views,
  members,
  image,
  onPress,
  newMessagesCount = 0,
}: IEnhancedPointTabProps) => {
  const hasNewMessages = newMessagesCount > 0;

  return (
    <Button
      onPress={onPress}
      className={`w-full flex justify-center pl-[15px] border-[0.94px] rounded-[15.1px] h-[76.46564483642578px] ${
        hasNewMessages
          ? "border-[#14A278] bg-[#181A20]" // Green border for new messages
          : type.toLowerCase() === "premium"
          ? "border-[#A009CD] bg-[#181A20]"
          : type === "chat"
          ? "border-[#93E0FF] bg-[#181A20]"
          : "border-[#262A34] bg-[#262A34]"
      }`}
    >
      <View className="flex flex-row relative">
        <View className="flex flex-row items-center">
          <View style={{ height: 37.76081466674805, width: 37.76081466674805 }}>
            <Image
              className="w-full h-full rounded-full"
              source={
                image ? { uri: image } : require("@/src/images/fallback.png")
              }
            />
          </View>
          <View className="flex flex-col ml-[15px]">
            <Text weight="regular" className="text-white text-[15.1px]">
              {name || "Point"}
            </Text>
            <Text
              weight="regular"
              className="text-[#5E6272] text-[11.33px] capitalize"
            >
              {type}
            </Text>
          </View>
        </View>
        {(type === "premium" || type === "standard") && !hasNewMessages && (
          <View className="flex flex-col ml-[30px]">
            <Text weight="regular" className="text-white text-[15.1px]">
              {subscribers || 0}
            </Text>
            <Text weight="regular" className="text-[#5E6272] text-[11.33px]">
              Saved
            </Text>
          </View>
        )}
        {(type === "premium" || type === "standard") && !hasNewMessages && (
          <View className="flex flex-col ml-[30px]">
            <Text weight="regular" className="text-white text-[15.1px]">
              {views || 0}
            </Text>
            <Text weight="regular" className="text-[#5E6272] text-[11.33px]">
              Views
            </Text>
          </View>
        )}
      </View>
    </Button>
  );
};
