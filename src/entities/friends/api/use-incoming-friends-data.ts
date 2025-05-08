import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/src/app/config/apiClient";

export const useIncomingFriendsData = () => {
    return useQuery({
        queryKey: ["friendsIncoming"],
        queryFn: async () => {
            const response = await apiClient.get('/users/friend-requests/incoming');
            return response.data
        }
    })
}