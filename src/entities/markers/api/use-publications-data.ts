import { apiClient } from "@/src/app/config/apiClient";
import { useQuery } from "@tanstack/react-query";

export const usePublicationsData = (id?: string) => {
    return useQuery({
        queryKey: ['publicationsId', id],
        queryFn: async ({ queryKey }) => {
            const [_, id] = queryKey;
            const url = `/feeds/${id}`;
            const response = await apiClient.get(url);
            return response.data;
        },
        staleTime: 1000 * 60 * 5,
        retry: 2
    })
}

