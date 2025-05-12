import { useMutation } from "@tanstack/react-query";
import { PrivateChatFullResponse, getOrCreatePrivateChat, createPrivateChat } from "./chat-api";

interface PrivateChatRequest {
  userId: string;
  targetUserId: string;
}

interface PrivateChatResponse {
  chatId: string;
  participants: string[];
}

/**
 * React Query hook to get or create a private chat between two users
 */
export const useGetPrivateChat = () => {
  return useMutation({
    mutationFn: async (data: PrivateChatRequest): Promise<PrivateChatResponse> => {
      try {
        // Use the get-or-create endpoint to either retrieve an existing chat or create a new one
        const chatId = await getOrCreatePrivateChat(data.userId, data.targetUserId);
        
        // Make sure we have a valid chat ID
        if (!chatId) {
          throw new Error("Failed to get a valid chat ID");
        }
        
        console.log("[useGetPrivateChat] Received chat ID:", chatId);
        
        // Return the chat ID and participants array
        return { 
          chatId, 
          participants: [data.userId, data.targetUserId]
        };
      } catch (error) {
        console.error("[useGetPrivateChat] Error:", error);
        throw error;
      }
    }
  });
};

/**
 * React Query hook to create a new private chat between two users
 */
export const useCreatePrivateChat = () => {
  return useMutation({
    mutationFn: async (data: { userA: string; userB: string }): Promise<PrivateChatFullResponse> => {
      try {
        const response = await createPrivateChat(data.userA, data.userB);
        
        // Make sure we have a valid response
        if (!response || !response.id) {
          throw new Error("Failed to get a valid chat response");
        }
        
        console.log("[useCreatePrivateChat] Created chat with ID:", response.id);
        
        return response;
      } catch (error) {
        console.error("[useCreatePrivateChat] Error:", error);
        throw error;
      }
    }
  });
};
