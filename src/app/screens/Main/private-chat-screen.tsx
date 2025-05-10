import { useEffect, useState, useCallback } from "react";
import { MainLayout } from "../../layouts/main-layout";
import { View, Text, ActivityIndicator } from "react-native";
import { ChatMessage } from "@/src/features/chat/ui/chat-message";
import { useChatStore } from "@/src/features/chat/model/chat-store";
import { useGetMe } from "@/src/entities/users/api/use-get-me";
import { useRoute } from "@react-navigation/native";
import { getChatMessages } from "@/src/features/chat/api/chat-api";
import { socket } from "@/src/features/chat/api/socket";

export const PrivateChatScreen = () => {
  const { data: me, isLoading: isLoadingMe } = useGetMe();
  const userId = me?.id;
  const route = useRoute();
  const [isLoading, setIsLoading] = useState(true);

  const { chatId, participants } = route.params as {
    chatId: string;
    participants: string[];
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

    // We don't need to set up socket listeners here as they're already in the store
    // This prevents duplicate message handling

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
      if (!text.trim() || !userId || !chatId) return;
      console.log("[PrivateChatScreen] Sending message:", text);
      sendMessage(text, chatId, userId);
    },
    [sendMessage, chatId, userId]
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
    <MainLayout isChat chatInputType="private" onSend={handleSendMessage}>
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
