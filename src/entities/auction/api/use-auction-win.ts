import { apiClient } from "@/src/app/config/apiClient";
import { useQuery } from "@tanstack/react-query";

export const useAuctionWin = (id: string | null) => {
    const queryKey = ['isWin', id];
    return useQuery({
        queryKey,
        queryFn: async () => {
            const response = await apiClient.get(`/auctions/${id}/is-win`)
            return response.data
        },
        enabled: true,
        staleTime: 5 * 60 * 1000,
        retry: 2,
    }
    )
}