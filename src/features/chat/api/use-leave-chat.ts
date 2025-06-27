import { useMutation, useQueryClient } from "@tanstack/react-query";
import { leaveChat, removeChatFromFavorites } from "./chat-api";
import { useNavigation } from "@react-navigation/native";

/**
 * Custom hook for leaving a chat and automatically removing it from favorites
 */
export const useLeaveChat = (userId: string) => {
  const queryClient = useQueryClient();
  const navigation = useNavigation();

  return useMutation({
    mutationFn: async (chatId: string) => {
      // First leave the chat
      const leaveResult = await leaveChat(chatId);

      console.log("Leave result:", leaveResult);

      if (leaveResult.success) {
        await removeChatFromFavorites(chatId, userId);
      }

      return leaveResult;
    },
    onSuccess: () => {
      // Invalidate relevant queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["chatMessages"] });
      queryClient.invalidateQueries({ queryKey: ["chatMetadata"] });
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      queryClient.invalidateQueries({ queryKey: ["favChats"] });
      queryClient.invalidateQueries({ queryKey: ["searchChats"] });

      // Navigate back after leaving the chat
      navigation.goBack();
    },
  });
};
