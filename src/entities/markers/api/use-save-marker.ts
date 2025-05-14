import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/src/app/config/apiClient";

export const useSaveMarker = () => {
    return useMutation({
        mutationFn: async (markerId: string | null) => {
            const response = await apiClient.post("/markers/favorite", { markerId: markerId });
            return response.data
        }
    })
}