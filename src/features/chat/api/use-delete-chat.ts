import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteChat } from "./chat-api";
import { useNavigation } from "@react-navigation/native";

/**
 * Custom hook for deleting a chat globally (for owners only)
 */
export const useDeleteChat = () => {
  const queryClient = useQueryClient();
  const navigation = useNavigation();

  return useMutation({
    mutationFn: async (chatId: string) => {
      return await deleteChat(chatId);
    },
    onSuccess: () => {
      // Invalidate relevant queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["chatMessages"] });
      queryClient.invalidateQueries({ queryKey: ["chatMetadata"] });
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      
      // Navigate back after deleting the chat
      navigation.goBack();
    },
  });
};
