import { apiClient } from "@/src/app/config/apiClient";
import { useQuery } from "@tanstack/react-query";

export const useCheckMarkerAccess = (markerId: string | null) => {
    return useQuery({
        queryKey: ['markerAccess', markerId],
        queryFn: async ({ queryKey }) => {
            const [, id] = queryKey;
            const response = await apiClient.get(`/markers/access/${id}/has-access`);
            return response.data;
        },
        enabled: !!markerId,
        staleTime: 1000 * 60, // 1 minute
        retry: 1
    });
};
