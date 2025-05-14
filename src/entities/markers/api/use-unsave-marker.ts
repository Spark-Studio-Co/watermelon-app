import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/src/app/config/apiClient";

export const useUnsaveMarker = () => {
    return useMutation({
        mutationFn: async (markerId: string | null) => {
            const response = await apiClient.delete(`/markers/favorite/${markerId}`);
            return response.data
        }
    })
}