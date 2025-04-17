import { apiClient } from "@/src/app/config/apiClient";
import { useQuery } from "@tanstack/react-query";

export const usePublicationsData = (id?: string) => {
    return useQuery({
        queryKey: id ? ['publications', id] : ['publications'],
        queryFn: async ({ queryKey }) => {
            const [_, id] = queryKey;
            const url = id ? `/feeds/${id}` : `/feeds`;
            const response = await apiClient.get(url);
            return response.data;
        },
        enabled: !!id || id === undefined,
        staleTime: 1000 * 60 * 5,
        retry: 2
    })
}
