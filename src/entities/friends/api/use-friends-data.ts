import { apiClient } from "@/src/app/config/apiClient";
import { useQuery } from "@tanstack/react-query";


export const useGetFriends = () => {
    return useQuery({
        queryKey: ["myFriends"],
        queryFn: async () => {
            const response = await apiClient.get('/users/my/friends')
            return response.data
        },
        staleTime: 1000 * 60 * 5,
        retry: 2
    })
}
