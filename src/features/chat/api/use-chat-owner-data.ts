import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/src/app/config/apiClient";

export const useChatOwnerData = (chatId?: string) => {
  return useQuery({
    queryKey: ["chatOwner", chatId],
    queryFn: async () => {
      if (!chatId) throw new Error("chatId is required");
      const response = await apiClient.get(`/chat/${chatId}/owner`);
      return response.data;
    },
    enabled: !!chatId,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};
