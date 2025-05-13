import { useQuery } from "@tanstack/react-query";
import { ChatMetadata, getChatMetadata } from "./chat-api";

/**
 * Custom hook to fetch metadata for a specific chat
 * @param chatId The ID of the chat to fetch metadata for
 * @returns Query result with chat metadata
 */
export const useChatMetadata = (chatId: string | null) => {
  return useQuery<ChatMetadata>({
    queryKey: ['chatMetadata', chatId],
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey;
      if (!id) throw new Error("Chat ID is required");
      return await getChatMetadata(id as string);
    },
    enabled: !!chatId,
    staleTime: 1000 * 60, // 1 minute
    refetchInterval: 10000, // Refetch every 10 seconds to keep metadata updated
    refetchOnWindowFocus: true,
  });
};
