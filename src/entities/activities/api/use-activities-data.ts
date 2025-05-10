import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/src/app/config/apiClient";

export const useActivitiesData = () => {
    return useQuery({
        queryKey: ["activities"],
        queryFn: async () => {
            const response = await apiClient.get("/activities")
            return response.data
        }
    })
}