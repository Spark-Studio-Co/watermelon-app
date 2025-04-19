import { apiClient } from "@/src/app/config/apiClient";
import { useQuery } from "@tanstack/react-query";

export const useCommentsData = (id: string | null) => {
    const queryKey = ['comments', id]
    return useQuery({
        queryKey,
        queryFn: async ({ queryKey }) => {
            const [_, id] = queryKey;
            const response = await apiClient.get(`/feeds/${id}/comments`);
            console.log("Comments data", response.data)
            return response.data;
        }
    })
}