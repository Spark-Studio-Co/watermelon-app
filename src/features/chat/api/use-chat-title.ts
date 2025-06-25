import { useQuery } from "@tanstack/react-query";
import { getChatTitle } from "./chat-api";

/**
 * Custom hook to fetch the title of a chat by chatId
 * @param chatId The ID of the chat
 * @returns Query result with chat title
 */
export const useChatTitle = (chatId?: string) => {
  return useQuery({
    queryKey: ["chatTitle", chatId],
    queryFn: async () => {
      if (!chatId) throw new Error("chatId is required");
      return await getChatTitle(chatId);
    },
    enabled: !!chatId,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 2,
  });
};
