import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/src/app/config/apiClient";

export const useUpdateRadiusColor = () => {
    return useMutation({
        mutationFn: async ({ id, colorId }: { id: string, colorId?: string }) => {
            const response = await apiClient.post(`/users/${id}/colors/${colorId}`)
            return response.data
        },
        onError: (error: any) => {
            console.log("Radius color update failed", error?.response?.data)
        }
    })
}