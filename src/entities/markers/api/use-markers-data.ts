import { apiClient } from "@/src/app/config/apiClient";
import { useQuery } from "@tanstack/react-query";

export const useMarkersData = (isAvailable?: boolean) => {
  return useQuery({
    queryKey: ["markers", { isAvailable }],
    queryFn: async () => {
      const url = `/markers?isAvailable=${isAvailable}`;
      console.log("🌐 Fetching markers from:", url);
      const response = await apiClient.get(url);
      console.log("📦 Markers response:", {
        count: response.data?.length || 0,
        isAvailable,
        firstFewMarkers: response.data?.slice(0, 3)?.map((m: any) => ({
          id: m.id,
          isPrivate: m.isPrivate,
          ownerId: m.ownerId,
          name: m.name,
        })),
      });
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
};
