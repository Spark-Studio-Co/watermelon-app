import { useEffect, useState, useCallback } from "react";
import { MainLayout } from "../../layouts/main-layout";
import { View, Text, ActivityIndicator } from "react-native";
import { ChatMessage } from "@/src/features/chat/ui/chat-message";
import { useChatStore } from "@/src/features/chat/model/chat-store";
import { useGetMe } from "@/src/entities/users/api/use-get-me";
import { useRoute } from "@react-navigation/native";

import { ChatInputType } from "../../layouts/main-layout";

export const PrivateChatScreen = () => {
  const { data: me, isLoading: isLoadingMe } = useGetMe();
  const userId = me?.id;
  const route = useRoute();
  const [isLoading, setIsLoading] = useState(true);

  const { chatId, participants, chatType } = route.params as {
    chatId: string;
    participants: string[];
    chatType: string
  };

  const { avatar, messages, connect, disconnect, sendMessage, getStatuses } =
    useChatStore();

  // Connect to chat and fetch messages
  useEffect(() => {
    if (!userId || !chatId || !participants.length) return;

    // Flag to track if component is mounted
    let isMounted = true;
    console.log("[PrivateChatScreen] Setting up chat:", chatId);

    const setupChat = async () => {
      setIsLoading(true);
      try {
        // Connect to chat room via socket
        // This will handle fetching messages via the store
        connect(chatId, userId);

        // Get user statuses
        getStatuses(participants);

        // We don't need to fetch messages here as the store already does it
        // This prevents duplicate messages
      } catch (error) {
        console.error("[PrivateChatScreen] Error setting up chat:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    setupChat();


    // Cleanup on unmount
    return () => {
      isMounted = false;
      console.log("[PrivateChatScreen] Disconnecting from chat:", chatId);
      disconnect();
    };
  }, [userId, chatId, participants, connect, disconnect, getStatuses]);

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

  // Function to send a message
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

      // Find the receiverId (the other participant in the chat)
      const receiverId = participants.find(id => id !== userId);

      if (!receiverId) {
        console.error("[PrivateChatScreen] Error: Could not determine receiverId!");
        // Continue anyway, as we might still be able to send the message
      }

      console.log("[PrivateChatScreen] Sending message with params:", {
        text,
        chatId,
        userId,
        receiverId
      });

      // Call the sendMessage function with all required parameters including receiverId
      sendMessage(text, chatId, userId, receiverId);
    },
    [sendMessage, userId, chatId, participants]
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
    <MainLayout isChat chatInputType={chatType as ChatInputType} onSend={handleSendMessage}>
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
              avatar={!message.isMy ? avatar : undefined}
              {...message}
            />
          </View>
        ))
      )}
    </MainLayout>
  );
};
