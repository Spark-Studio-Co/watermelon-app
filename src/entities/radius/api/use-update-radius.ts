import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/src/app/config/apiClient";

export const useUpdateRadius = () => {
    return useMutation({
        mutationFn: async ({ id, value, color }: { id: string | null, value?: string, color?: string }) => {
            const response = await apiClient.patch(`/radius/${id}`, { value, color })
            return response.data
        },
        onSuccess: (data: any) => {
            console.log("Radius updated", data)
        },
        onError: (error: any) => {
            console.log("Radius update failed", error?.response?.data)
        }
    })
}