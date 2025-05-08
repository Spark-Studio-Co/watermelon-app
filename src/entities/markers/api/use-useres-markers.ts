import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/src/app/config/apiClient";

export const useUsersMarkers = () => {
    return useQuery({
        queryKey: ["usersMarkers"],
        queryFn: async () => {
            const response = await apiClient.get("/markers/my-markers");
            return response.data;
        }
    })
}