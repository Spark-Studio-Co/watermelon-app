import { apiClient } from "@/src/app/config/apiClient";

export interface ChatMessage {
  id: string;
  chatId: string;
  user: {
    id: string;
    avatar?: string; // Added avatar field to match API response
    name?: string; // Added name field for future use
  };
  text: string;
  sentAt: number;
}

export interface ChatMetadata {
  chatId: string;
  members: number;
  amount: number;
}

export interface CreatePrivateChatRequest {
  userA: string;
  userB: string;
}

export interface PrivateChatRequest {
  userId: string;
  targetUserId: string;
}

export interface PrivateChatResponse {
  chatId: string;
}

export interface PrivateChatFullResponse {
  id?: string;
  chatId?: string;
  isGroup?: boolean;
  ownerId?: string;
  receiverId?: string;
  participants?: {
    userId: string;
  }[];
}

/**
 * Create a new private chat between two users
 * @param userAId First user's ID
 * @param userBId Second user's ID
 * @returns Promise with full chat response
 */
export const createPrivateChat = async (
  userAId: string,
  userBId: string
): Promise<PrivateChatFullResponse> => {
  try {
    const response = await apiClient.post<PrivateChatFullResponse>(
      "/chat/private",
      { userA: userAId, userB: userBId }
    );

    // Log the full response for debugging
    console.log(
      "[createPrivateChat] Full response:",
      JSON.stringify(response.data)
    );

    // Check if we have a valid response
    if (!response.data) {
      console.error("[createPrivateChat] Empty response");
      throw new Error("Empty response from API");
    }

    // If the API returns chatId instead of id, normalize it
    if (response.data.chatId && !response.data.id) {
      response.data.id = response.data.chatId;
    }

    return response.data;
  } catch (error) {
    console.error("[createPrivateChat] Error creating private chat:", error);
    throw error;
  }
};

/**
 * Get or create a private chat between two users
 * @param userId Current user's ID
 * @param targetUserId Target user's ID
 * @returns Promise with chat ID
 */
export const getOrCreatePrivateChat = async (
  userId: string,
  targetUserId: string
): Promise<string> => {
  try {
    const response = await apiClient.post<PrivateChatFullResponse>(
      "/chat/private/get-or-create",
      { userId, targetUserId }
    );

    // Log the full response for debugging
    console.log(
      "[getOrCreatePrivateChat] Full response:",
      JSON.stringify(response.data)
    );

    // Check if we have a valid response with a chatId
    if (!response.data) {
      console.error("[getOrCreatePrivateChat] Empty response");
      throw new Error("Empty response from API");
    }

    // The API returns chatId, not id
    if (response.data.chatId) {
      return response.data.chatId;
    } else if (response.data.id) {
      return response.data.id;
    } else {
      console.error(
        "[getOrCreatePrivateChat] Missing chatId and id in response:",
        response.data
      );
      throw new Error("Missing chatId in API response");
    }
  } catch (error) {
    console.error(
      "[getOrCreatePrivateChat] Error getting private chat:",
      error
    );
    throw error;
  }
};

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

/**
 * Get messages for a private chat between two users
 * @param userId Current user's ID
 * @param targetUserId Target user's ID
 * @returns Promise with array of messages
 */
export const getPrivateChatMessages = async (
  userId: string,
  targetUserId: string
): Promise<ChatMessage[]> => {
  try {
    // First get the chat ID
    const chatId = await getOrCreatePrivateChat(userId, targetUserId);

    // Then get messages using that chat ID
    return await getChatMessages(chatId);
  } catch (error) {
    console.error("[getPrivateChatMessages] Error:", error);
    return [];
  }
};

/**
 * Fetch metadata for a specific chat
 * @param chatId The ID of the chat to fetch metadata for
 * @returns Promise with chat metadata
 */
export const getChatMetadata = async (
  chatId: string
): Promise<ChatMetadata> => {
  try {
    const response = await apiClient.get(`/chat/${chatId}/metadata`);
    return response.data;
  } catch (error) {
    console.error("[getChatMetadata] Error fetching chat metadata:", error);
    return {
      chatId,
      members: 0,
      amount: 0,
    };
  }
};

/**
 * Add a chat marker to favorites
 * @param markerId The ID of the marker to add to favorites
 * @returns Promise with success status
 */
export const addMarkerToFavorites = async (
  markerId: string
): Promise<{ success: boolean }> => {
  try {
    const response = await apiClient.post(`/chat/marker/${markerId}/favorite`);
    return response.data;
  } catch (error) {
    console.error(
      "[addMarkerToFavorites] Error adding marker to favorites:",
      error
    );
    return { success: false };
  }
};

/**
 * Search for chats by query string
 * @param query The search query string
 * @returns Promise with array of chat results
 */
export const searchChats = async (query: string): Promise<any[]> => {
  try {
    if (!query || query.trim() === "") {
      return [];
    }

    const response = await apiClient.get(`/chat/chat/search?q=${query}`);

    console.log("[searchChats] Search results:", response.data);
    return response.data || [];
  } catch (error) {
    console.error("[searchChats] Error searching chats:", error);
    return [];
  }
};

/**
 * Leave a chat (for the current user)
 * @param chatId The ID of the chat to leave
 * @returns Promise with success status
 */
export const leaveChat = async (
  chatId: string
): Promise<{ success: boolean }> => {
  try {
    const response = await apiClient.delete(`/chat/${chatId}/leave`);
    return response.data;
  } catch (error) {
    console.error("[leaveChat] Error leaving chat:", error);
    return { success: false };
  }
};

/**
 * Remove a chat from favorites
 * @param chatId The ID of the chat to remove from favorites
 * @param userId The ID of the user
 * @returns Promise with success status
 */
export const removeChatFromFavorites = async (
  chatId: string,
  userId: string
): Promise<{ success: boolean }> => {
  try {
    const response = await apiClient.delete(`/chat/${chatId}/favorite`, {
      data: { userId },
    });
    console.log("[removeChatFromFavorites] Successfully removed chat from favorites");
    return response.data;
  } catch (error: any) {
    // Check if this is a 500 error but the chat might already be removed
    if (error?.response?.status === 500) {
      console.log("[removeChatFromFavorites] Error 500 - Chat may already be removed from favorites");
      // Return success true since the end goal (chat not in favorites) is achieved
      return { success: true };
    }
    
    // For other errors, log and rethrow
    console.error("[removeChatFromFavorites] Error removing chat from favorites:", error);
    throw error;
  }
};

/**
 * Delete a chat globally (for owners only)
 * @param chatId The ID of the chat to delete
 * @returns Promise with success status
 */
export const deleteChat = async (
  chatId: string
): Promise<{ success: boolean }> => {
  try {
    const response = await apiClient.delete(`/chat/${chatId}`);
    return response.data;
  } catch (error) {
    console.error("[deleteChat] Error deleting chat:", error);
    return { success: false };
  }
};

/**
 * Report a violation (for point, chat, publication, or message)
 * @param type Type of entity ('point', 'chat', 'publication', 'message')
 * @param entityId ID of the entity being reported
 * @param reason Reason for the report
 * @param details Optional additional details
 * @returns Promise with success status
 */
export const reportViolation = async (
  type: "point" | "chat" | "publication" | "message",
  entityId: string,
  reason: string,
  details?: string
): Promise<{ success: boolean }> => {
  try {
    const response = await apiClient.post("/moderation/report", {
      type,
      entityId,
      reason,
      details,
    });
    return response.data;
  } catch (error) {
    console.error("[reportViolation] Error reporting violation:", error);
    return { success: false };
  }
};

/**
 * Update chat title
 * @param chatId The ID of the chat to update
 * @param title New title for the chat
 * @returns Promise with success status and title
 */
export const updateChatTitle = async (
  chatId: string,
  title: string
): Promise<{ success: boolean; title: string }> => {
  try {
    const response = await apiClient.post(`/chat/chat/${chatId}/title`, {
      title,
    });
    return response.data;
  } catch (error) {
    console.error("[updateChatTitle] Error updating chat title:", error);
    return { success: false, title: "" };
  }
};

/**
 * Get chat title
 * @param chatId The ID of the chat
 * @returns Promise with chat title
 */
export const getChatTitle = async (
  chatId: string
): Promise<{ title: string }> => {
  try {
    const response = await apiClient.get(`/chat/chat/${chatId}/title`);
    return response.data;
  } catch (error) {
    console.error("[getChatTitle] Error getting chat title:", error);
    return { title: "" };
  }
};
