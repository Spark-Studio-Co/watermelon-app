import { apiClient } from "@/src/app/config/apiClient";
import { useMutation } from "@tanstack/react-query";

export const useLikePost = () => {
    return useMutation({
        mutationFn: async (id: string) => {
            const response = await apiClient.post(`/feeds/${id}/like`)
            return response.data
        },
        onSuccess: (data: any) => {
            console.log("Like successful", data)
        },
        onError: (error: any) => {
            console.log("Like failed", error?.response?.data)
        }
    })
}
