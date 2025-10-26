import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/src/app/config/apiClient";

export interface MarkerWithNewMessages {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  totalNewMessages: number;
  ownerId?: string;
  image?: string;
  type?: string;
  favoriteCount?: number;
  views?: number;
  chats: {
    id: string;
    title: string;
    hasNewMessages: boolean;
    messageCount: number;
    newMessagesCount?: number;
    senderId?: string; // ID отправителя последнего сообщения
    participants?: string[]; // Список участников чата
    lastMessage: {
      id: string;
      text: string;
      sentAt: string;
      senderId?: string; // ID отправителя
    };
  }[];
}

export const useMyMarkersWithNewMessages = (search?: string) => {
  return useQuery<MarkerWithNewMessages[]>({
    queryKey: ["myMarkersWithNewMessages", search],
    queryFn: async () => {
      const params = search ? { search } : {};
      const response = await apiClient.get(
        "/markers/my-markers-with-new-messages",
        { params }
      );
      return response.data;
    },
    staleTime: 1000 * 60, // 1 minute
    retry: 2,
  });
};
