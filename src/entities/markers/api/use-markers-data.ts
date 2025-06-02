import { apiClient } from "@/src/app/config/apiClient";
import { useQuery } from "@tanstack/react-query";

export const useMarkersData = (isAvailable?: boolean) => {
    return useQuery({
        queryKey: ['markers', { isAvailable }],
        queryFn: async () => {
            const response = await apiClient.get(`/markers?isAvailable=${isAvailable}`,);
            return response.data;
        },
        staleTime: 1000 * 60 * 5,
        retry: 2
    });
}

