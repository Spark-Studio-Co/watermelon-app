import { apiClient } from "@/src/app/config/apiClient";
import { useQuery } from "@tanstack/react-query";
import { AuctionSort } from "../types/auction-sort.t";

export const useAuctionsData = (id?: string, sort?: AuctionSort | null) => {
    const queryKey = ['auctions', { id, sort }];

    return useQuery({
        queryKey,
        queryFn: async () => {
            const url = id
                ? `/auctions/${id}`
                : `/auctions${sort ? `?sort=${sort}` : ''}`;
            const { data } = await apiClient.get(url);
            return data;
        },
        enabled: true,
        staleTime: 5 * 60 * 1000,
        retry: 2,
    });
};