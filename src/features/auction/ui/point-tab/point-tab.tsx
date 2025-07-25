import React from "react";
import { View, Image } from "react-native";
import Text from "@/src/shared/ui/text/text";
import { Button } from "@/src/shared/ui/button/button";

import CirclePlus from "@/src/shared/icons/circle-plus";
import CircleMinus from "@/src/shared/icons/circle-minus";

import { useApproveApplication } from "@/src/entities/markers/api/use-approve-application";
import { useDeclineApplication } from "@/src/entities/markers/api/use-decline-application";
import { useQueryClient } from "@tanstack/react-query";

interface IPointTabProps {
  status?: "New" | "On sold" | "My bet";
  type: string | "Premium" | "Chat" | "Standard";
  name: string | null;
  subscribers?: number | null;
  views?: number | null;
  members?: number | null;
  avatar?: string | null;

  isApplication?: boolean;
  username?: string;
  requestId?: string;
}

export const PointTab = ({
  type,
  name,
  subscribers,
  views,
  members,
  avatar,
  isApplication = false,
  username,
  requestId,
}: IPointTabProps) => {
  const { mutate: approveApplication } = useApproveApplication();
  const { mutate: declineApplication } = useDeclineApplication();

  const queryClient = useQueryClient();

  return (
    <View
      className={`w-full flex justify-center pl-[15px] border-[0.94px] rounded-[15.1px] h-[76.46564483642578px] ${
        type === "premium"
          ? "border-[#A009CD] bg-[#181A20]"
          : type === "chat"
          ? "border-[#93E0FF] bg-[#181A20]"
          : "border-[#262A34] bg-[#262A34]"
      }`}
    >
      <View className="flex flex-row">
        <View className="flex flex-row items-center">
          <View style={{ height: 37.76081466674805, width: 37.76081466674805 }}>
            <Image
              className="w-full h-full rounded-full"
              source={
                avatar
                  ? { uri: avatar }
                  : require("../../../../images/fallback.png")
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
              {isApplication ? username : type}
            </Text>
          </View>
        </View>
        {!isApplication && (type === "premium" || type === "standard") && (
          <View className="flex flex-col ml-[30px]">
            <Text weight="regular" className="text-white text-[15.1px]">
              {subscribers || 0}
            </Text>
            <Text weight="regular" className="text-[#5E6272] text-[11.33px]">
              Subscribers
            </Text>
          </View>
        )}
        {!isApplication && (type === "premium" || type === "standard") && (
          <View className="flex flex-col ml-[30px]">
            <Text weight="regular" className="text-white text-[15.1px]">
              {views || 0}
            </Text>
            <Text weight="regular" className="text-[#5E6272] text-[11.33px]">
              Views
            </Text>
          </View>
        )}
        {!isApplication && type === "chat" && (
          <View className="flex flex-col ml-[30px]">
            <Text weight="regular" className="text-white text-[15.1px]">
              {members || 0}
            </Text>
            <Text weight="regular" className="text-[#5E6272] text-[11.33px]">
              Members
            </Text>
          </View>
        )}
        {isApplication && (
          <View className="flex flex-row ml-auto mt-2 gap-x-4 mr-4">
            <Button
              onPress={() =>
                declineApplication(requestId!, {
                  onSuccess: () => {
                    console.log("❌ Заявка отклонена:", requestId);
                    queryClient.invalidateQueries({
                      queryKey: ["markerApplications"],
                    });
                  },
                  onError: (error) => {
                    console.error("Ошибка при отклонении заявки:", error);
                  },
                })
              }
            >
              <CircleMinus />
            </Button>
            <Button
              onPress={() =>
                approveApplication(requestId!, {
                  onSuccess: () => {
                    console.log("✅ Заявка одобрена:", requestId);
                    queryClient.invalidateQueries({
                      queryKey: ["markerApplications"],
                    });
                  },
                  onError: (error) => {
                    console.error("Ошибка при одобрении заявки:", error);
                  },
                })
              }
            >
              <CirclePlus />
            </Button>
          </View>
        )}
      </View>
    </View>
  );
};
