import { apiClient } from "@/src/app/config/apiClient";
import { useQuery } from "@tanstack/react-query";

export const useFeedData = () => {
    return useQuery({
        queryKey: ["feedAll"],
        queryFn: async () => {
            const response = await apiClient.get('/feeds/all')
            return response.data
        }
    })
}