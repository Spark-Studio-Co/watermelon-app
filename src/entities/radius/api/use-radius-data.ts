import { apiClient } from "@/src/app/config/apiClient";
import { useQuery } from "@tanstack/react-query";

export const useRadiusData = (id: string | null) => {
    useQuery({
        queryKey: ["radius", id],
        queryFn: async ({ queryKey }) => {
            [, id] = queryKey;
            const response = await apiClient.get(`/radius/${id}`)
            return response.data
        },
        staleTime: 1000 * 60 * 5,
        retry: 2
    })
}
