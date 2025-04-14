import { apiClient } from "@/src/app/config/apiClient";
import { useQuery } from "@tanstack/react-query";

export const useMarkersData = () => {
    return useQuery({
        queryKey: ['markers'],
        queryFn: async () => {
            const response = await apiClient.get("/markers")
            return response.data
        },
        staleTime: 1000 * 60 * 5,
        retry: 2
    })
}

