import { apiClient } from "@/src/app/config/apiClient";
import { useQuery } from "@tanstack/react-query";

const searchFriends = async (query: string) => {
  const response = await apiClient.get(`/users?name=${query}`);
  return response.data;
};

export const useSearchFriends = (query: string) => {
  return useQuery({
    queryKey: ["search-friends", query],
    queryFn: () => searchFriends(query),
    enabled: query.length > 0,
  });
};
