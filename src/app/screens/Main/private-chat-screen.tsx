import { useEffect, useState, useCallback } from "react";
import { MainLayout } from "../../layouts/main-layout";
import { View, Text, ActivityIndicator } from "react-native";
import { ChatMessage } from "@/src/features/chat/ui/chat-message";
import { useChatStore } from "@/src/features/chat/model/chat-store";
import { useGetMe } from "@/src/entities/users/api/use-get-me";
import { useRoute } from "@react-navigation/native";
import { useShallow } from "zustand/react/shallow";

import fallback from "../../../images/fallback.png";

import { ChatInputType } from "../../layouts/main-layout";

export const PrivateChatScreen = () => {
  const { data: me, isLoading: isLoadingMe } = useGetMe();
  const userId = me?.id;
  const route = useRoute();
  const [isLoading, setIsLoading] = useState(true);

  const { chatId, participants, chatType, markerId } = route.params as {
    chatId: string;
    participants: string[];
    chatType: string;
    markerId?: string;
  };

  const {
    avatar,
    messages,
    connect,
    disconnect,
    sendMessage,
    getStatuses,
    sendGroupMessage,
  } = useChatStore(
    useShallow((state) => ({
      avatar: state.avatar,
      messages: state.messages,
      connect: state.connect,
      disconnect: state.disconnect,
      sendMessage: state.sendMessage,
      getStatuses: state.getStatuses,
      sendGroupMessage: state.sendGroupMessage,
    }))
  );

  useEffect(() => {
    console.log("[PrivateChatScreen] chatId:", chatId);
    console.log("[PrivateChatScreen] participants:", participants);
    console.log("[PrivateChatScreen] chatType:", chatType);
    console.log("[PrivateChatScreen] markerId:", markerId);
  }, []);

  useEffect(() => {
    if (!userId || !chatId || !participants.length) return;

    let isMounted = true;
    setIsLoading(true);

    connect(chatId, userId, chatType === "group", markerId || "");
    getStatuses(participants);

    setIsLoading(false);

    return () => {
      isMounted = false;
      disconnect();
    };
  }, [userId, chatId, participants, chatType]);

  // Debug messages
  useEffect(() => {
    console.log(
      "[PrivateChatScreen] messages state updated:",
      messages.length,
      messages.length > 0
        ? `Latest: ${messages[messages.length - 1]?.text}`
        : ""
    );
  }, [messages]);

  const handleSendMessage = useCallback(
    (text: string) => {
      if (!text.trim()) {
        console.log("[PrivateChatScreen] Empty message, not sending");
        return;
      }

      if (!userId) {
        console.error("[PrivateChatScreen] Error: userId is undefined!");
        return;
      }

      if (!chatId) {
        console.error("[PrivateChatScreen] Error: chatId is undefined!");
        return;
      }

      // Для дебага
      console.log("[PrivateChatScreen] Sending message:", {
        text,
        chatId,
        userId,
        chatType,
      });

      if (chatType === "group") {
        sendGroupMessage(text, chatId, userId);
      } else {
        const receiverId = participants.find((id) => id !== userId);

        if (!receiverId) {
          console.error(
            "[PrivateChatScreen] Error: Could not determine receiverId!"
          );
          return;
        }

        sendMessage(text, chatId, userId, receiverId);
      }
    },
    [userId, chatId, participants, chatType]
  );

  if (isLoadingMe || !me) {
    return (
      <MainLayout isChat>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#0000ff" />
          <Text className="mt-4 text-gray-600">Loading your profile...</Text>
        </View>
      </MainLayout>
    );
  }

  return (
    <MainLayout
      isChat
      chatInputType={chatType as ChatInputType}
      onSend={handleSendMessage}
    >
      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="small" color="#0000ff" />
          <Text className="mt-2 text-gray-600">Loading messages...</Text>
        </View>
      ) : messages.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-600">
            No messages yet. Start the conversation!
          </Text>
        </View>
      ) : (
        messages.map((message, index) => (
          <View className="flex flex-col mb-10" key={index}>
            <ChatMessage
              avatar={message.avatar || (!message.isMy ? avatar : fallback)}
              {...message}
            />
          </View>
        ))
      )}
    </MainLayout>
  );
};
