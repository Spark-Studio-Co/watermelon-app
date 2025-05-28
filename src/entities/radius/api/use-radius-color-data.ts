import { apiClient } from "@/src/app/config/apiClient";
import { useQuery } from "@tanstack/react-query";

export const useRadiusColorData = () => {
    return useQuery({
        queryKey: ["color"],
        queryFn: async () => {
            const response = await apiClient.get(`/users/all/colors`)
            return response.data
        },
        staleTime: 1000 * 60 * 5,
        retry: 2
    })
}
