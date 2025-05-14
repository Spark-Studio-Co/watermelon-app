import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/src/app/config/apiClient";

export const useFavoritesData = () => {
    return useQuery({
        queryKey: ["favoritesMarkers"],
        queryFn: async () => {
            const response = await apiClient.get("/users/following/markers");
            return response.data;
        }
    })
}
