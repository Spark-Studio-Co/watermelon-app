import { apiClient } from "@/src/app/config/apiClient";
import { useQuery } from "@tanstack/react-query";

export const usePrivatePublicationsData = (id: string) => {
    return useQuery({
        queryKey: ['private-publications', id],
        queryFn: async ({ queryKey }) => {
            const [_, id] = queryKey;
            const response = await apiClient.get(`/feeds/private/${id}`);
            return response.data;
        },
        enabled: !!id,
        staleTime: 1000 * 60 * 5,
        retry: 2
    })
}
