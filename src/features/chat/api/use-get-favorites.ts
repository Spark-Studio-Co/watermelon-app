import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/src/app/config/apiClient";

export const useFavoritesChats = () => {
  return useQuery({
    queryKey: ["favChats"],
    queryFn: async () => {
      const response = await apiClient.get("/chat/chat/favorites");
      return response.data;
    },
  });
};
