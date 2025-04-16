import { apiClient } from "@/src/app/config/apiClient";
import { useMutation } from "@tanstack/react-query";

export const useDeleteMarker = () => {
    return useMutation({
        mutationFn: async (id: string) => {
            const response = await apiClient.delete(`/markers/${id}`)
            return response.data
        },
        onSuccess: (data: any) => {
            console.log("Marker deleted", data)
        },
        onError: (error: any) => {
            console.log("Marker delete failed", error?.response?.data)
        }
    })
}
