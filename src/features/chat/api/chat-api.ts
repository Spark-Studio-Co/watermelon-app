import { apiClient } from "@/src/app/config/apiClient";

export interface ChatMessage {
  id: string;
  chatId: string;
  user: {
    id: string;
  };
  text: string;
  sentAt: number;
}

/**
 * Fetch all messages for a specific chat
 * @param chatId The ID of the chat to fetch messages for
 * @returns Promise with array of messages
 */
export const getChatMessages = async (
  chatId: string
): Promise<ChatMessage[]> => {
  try {
    const response = await apiClient.get<ChatMessage[]>(
      `/chat/${chatId}/messages`
    );
    return response.data;
  } catch (error) {
    console.error("[getChatMessages] Error fetching chat messages:", error);
    return [];
  }
};
