import { apiClient } from "@/src/app/config/apiClient";
import { useQuery } from "@tanstack/react-query";

export const useCheckPendingRequest = (markerId: string | null) => {
    return useQuery({
        queryKey: ['markerPendingRequest', markerId],
        queryFn: async ({ queryKey }) => {
            const [, id] = queryKey;
            const response = await apiClient.get(`/markers/${id}/access-request/is-pending`);
            return response.data;
        },
        enabled: !!markerId,
        staleTime: 1000 * 60, // 1 minute
        retry: 1
    });
};
