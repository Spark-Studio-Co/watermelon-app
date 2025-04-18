import { apiClient } from "@/src/app/config/apiClient";
import { useQuery } from "@tanstack/react-query";

import { AuctionSort } from "../types/auction-sort.t";

export const useAuctionsData = (id?: string, sort?: AuctionSort | null) => {
    return useQuery({
        queryKey: ['auctions', { id: id ?? null, sort: sort ?? null }],
        queryFn: async ({ queryKey }) => {
            const [_, params] = queryKey;
            const { id, sort } = params as { id?: string | null, sort?: AuctionSort | null };
            const url = id ? `/auctions/${id}` : `/auctions${sort ? `?sort=${sort}` : ''}`;
            const response = await apiClient.get(url);
            console.log('API response:', response.data);

            return response.data;
        },
        enabled: true,
        staleTime: 1000 * 60 * 5,
        retry: 2
    });
};
