import { apiClient } from "@/src/app/config/apiClient";
import { useQuery } from "@tanstack/react-query";

const searchPoints = async (query: string) => {
  const response = await apiClient.get(`/markers/marker/search?q=${query}`);
  return response.data;
};

export const useSearchPoints = (query: string) => {
  return useQuery({
    queryKey: ["search-points", query],
    queryFn: () => searchPoints(query),
    enabled: query.length > 0,
  });
};
