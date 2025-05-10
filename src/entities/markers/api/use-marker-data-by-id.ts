import { apiClient } from "@/src/app/config/apiClient";
import { useQuery } from "@tanstack/react-query";

export const useMarkerDataById = (id: string | null) => {
    return useQuery({
        queryKey: ['markerById', id],
        queryFn: async ({ queryKey }) => {
            [, id] = queryKey;
            const response = await apiClient.get(`/markers/${id}`)
            return response.data
        },
        enabled: !!id,
        staleTime: 1000 * 60 * 5,
        retry: 2
    })
}

