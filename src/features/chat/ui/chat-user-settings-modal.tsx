import React from "react";
import { View } from "react-native";
import { ChatSettingsTab } from "./chat-settings-tab";
import { useVisibleStore } from "@/src/shared/model/use-visible-store";
import { useLeaveChat } from "../api/use-leave-chat";
import { useAuthStore } from "@/src/entities/registration/api/use-auth-store";
import { useChatStore } from "../model/chat-store";
import { useNavigation } from "@react-navigation/native";

export const ChatUserSettingsModal = () => {
  const { open } = useVisibleStore("chatViolations");
  const { close } = useVisibleStore("userChatSettings");

  const navigation = useNavigation();

  // Get current user ID and chat ID
  const { id: currentUserId } = useAuthStore();
  const currentChatId = useChatStore((state) => state.currentChatId);

  // Use the leave chat hook
  const { mutate: leaveChat } = useLeaveChat(currentUserId || "");

  const settings = [
    {
      title: "Поделиться",
      onPress: () => {},
    },
    {
      title: "Сообщить о нарушении",
      onPress: () => {
        close();
        open();
      },
    },
    {
      title: "Удалить чат",
      onPress: () => {
        close();

        if (currentChatId) {
          // Let the useLeaveChat hook handle navigation
          leaveChat(currentChatId);
        }
      },
    },
  ];

  return (
    <View
      className="bg-[#313034] w-full py-5 rounded-[15px] flex flex-col items-center justify-center relative"
      style={{ boxShadow: "0px 4px 4px 0px #00000040" }}
    >
      <View className="flex flex-col items-center w-[90%] gap-y-5">
        {settings.map((setting, index) => (
          <ChatSettingsTab
            key={index}
            title={setting.title}
            onPress={setting.onPress}
          />
        ))}
      </View>
    </View>
  );
};
