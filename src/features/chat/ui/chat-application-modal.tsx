import React, { useEffect } from "react";
import { ScrollView, View } from "react-native";
import Text from "@/src/shared/ui/text/text";
import { Button } from "@/src/shared/ui/button/button";
import { PointTab } from "../../auction/ui/point-tab/point-tab";

import { useVisibleStore } from "@/src/shared/model/use-visible-store";
import { useMarkerApplications } from "@/src/entities/markers/api/use-marker-applications";
import { useChatStore } from "../../chat/model/chat-store";

import CrossIcon from "@/src/shared/icons/cross-icon";

export const ChatApplicationModal = () => {
  const { close } = useVisibleStore("chatApplications");
  const { currentChatMarkerId } = useChatStore();

  const { data: applications, isLoading } = useMarkerApplications(
    currentChatMarkerId || ""
  );

  return (
    <View
      className="bg-[#313034] w-full py-5 rounded-[15px] flex flex-col items-center justify-center relative"
      style={{ boxShadow: "0px 4px 4px 0px #00000040" }}
    >
      <Text weight="regular" className="text-white text-[20px]">
        Заявки
      </Text>
      <Button className="absolute right-3 top-3" onPress={close}>
        <CrossIcon />
      </Button>
      <ScrollView
        className="w-[90%] max-h-[60vh] mt-6"
        showsVerticalScrollIndicator={false}
      >
        {!currentChatMarkerId ? (
          <View className="py-4 px-2">
            <Text weight="regular" className="text-gray-400 text-center">
              No chat marker selected. Please select a chat point first.
            </Text>
          </View>
        ) : isLoading ? (
          <View className="py-4 px-2">
            <Text weight="regular" className="text-gray-400 text-center">
              Loading applications...
            </Text>
          </View>
        ) : applications && applications.length > 0 ? (
          applications.map((application, index) => (
            <View key={index} className="mb-4">
              <PointTab
                type="standard"
                isApplication
                //@ts-ignore
                username={application.user.username}
                //@ts-ignore
                name={application.user.name}
                //@ts-ignore
                avatar={application.user.avatar}
                requestId={application.id}
              />
            </View>
          ))
        ) : (
          <View className="py-4 px-2">
            <Text weight="regular" className="text-gray-400 text-center">
              No applications found for this chat.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};
