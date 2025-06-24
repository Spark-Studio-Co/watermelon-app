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
