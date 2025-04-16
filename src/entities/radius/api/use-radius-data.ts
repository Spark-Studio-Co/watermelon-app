import { apiClient } from "@/src/app/config/apiClient";
import { useQuery } from "@tanstack/react-query";

export const useRadiusData = () => {
    return useQuery({
        queryKey: ["radius"],
        queryFn: async () => {
            const response = await apiClient.get(`/radius`)
            return response.data
        },
        staleTime: 1000 * 60 * 5,
        retry: 2
    })
}
