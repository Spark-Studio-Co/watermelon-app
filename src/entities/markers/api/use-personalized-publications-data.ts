import { apiClient } from "@/src/app/config/apiClient";
import { useQuery } from "@tanstack/react-query";

export const usePersonalizedPublicationsData = (markerId?: string) => {
    return useQuery({
        queryKey: ['personalized-pub', markerId],
        queryFn: async ({ queryKey }) => {
            const [_, markerId] = queryKey;
            const url = `/feeds/personalized/${markerId}`;
            const response = await apiClient.get(url);
            return response.data;
        },
        staleTime: 1000 * 60 * 5,
        retry: 2
    })
}

