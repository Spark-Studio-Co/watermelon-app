import { apiClient } from "@/src/app/config/apiClient";
import { useQuery } from "@tanstack/react-query";
import { AuctionSort } from "../types/auction-sort.t";

type AuctionStatus = 'active' | 'sold' | 'myBets' | 'new';

/**
 * Build query parameters string for auctions API
 */
const buildQueryParams = (sort?: AuctionSort | null, status?: AuctionStatus): string => {
    const params = new URLSearchParams();
    
    if (sort) {
        params.append('sort', sort);
    }
    
    if (status) {
        params.append('status', status);
    }
    
    const queryString = params.toString();
    return queryString ? `?${queryString}` : '';
};

export const useAuctionsData = (id?: string, sort?: AuctionSort | null, status: AuctionStatus = 'new') => {
    const queryKey = ['auctions', { id, sort, status }];

    return useQuery({
        queryKey,
        queryFn: async () => {
            const url = id
                ? `/auctions/${id}`
                : `/auctions${buildQueryParams(sort, status)}`;
            const { data } = await apiClient.get(url);
            return data;
        },
        enabled: true,
        staleTime: 5 * 60 * 1000,
        retry: 2,
    });
};