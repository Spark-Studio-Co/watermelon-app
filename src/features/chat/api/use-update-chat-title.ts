import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateChatTitle } from "./chat-api";

/**
 * Custom hook for updating a chat title
 */
export const useUpdateChatTitle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ chatId, title }: { chatId: string; title: string }) => {
      return await updateChatTitle(chatId, title);
    },
    onSuccess: () => {
      // Invalidate relevant queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["chatMetadata"] });
      queryClient.invalidateQueries({ queryKey: ["chatList"] });
    },
  });
};
