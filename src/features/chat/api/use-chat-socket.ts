import { useEffect, useCallback, useRef } from "react";
import { socket } from "./socket";
import { useChatStore } from "../model/chat-store";

export function useChatSocket(userId: string, chatId: string) {
  const { connect, disconnect, sendMessage } = useChatStore();

  const lastMessageRef = useRef<string | null>(null);

  useEffect(() => {
    if (!userId || !chatId) return;

    console.log("[useChatSocket] Connecting to chat:", chatId);
    connect(chatId, userId);

    return () => {
      console.log("[useChatSocket] Disconnecting from chat:", chatId);
      disconnect();
      lastMessageRef.current = null;
    };
  }, [userId, chatId, connect, disconnect]);

  const sendChatMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || !userId || !chatId) return;

      if (trimmed === lastMessageRef.current) return;

      lastMessageRef.current = trimmed;
      sendMessage(trimmed, chatId, userId);
    },
    [sendMessage, chatId, userId]
  );

  return {
    sendMessage: sendChatMessage,
  };
}
