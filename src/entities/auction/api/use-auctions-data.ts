import { apiClient } from "@/src/app/config/apiClient";
import { useQuery } from "@tanstack/react-query";

export const useAuctionsData = (id?: string) => {
    return useQuery({
        queryKey: id ? ['auctions', id] : ['auctions'],
        queryFn: async ({ queryKey }) => {
            const [_, id] = queryKey;
            const url = id ? `/auctions/${id}` : `/auctions`;
            const response = await apiClient.get(url);
            return response.data;
        },
        enabled: !!id || id === undefined,
        staleTime: 1000 * 60 * 5,
        retry: 2
    })
}
