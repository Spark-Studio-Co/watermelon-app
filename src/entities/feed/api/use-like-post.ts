import { apiClient } from "@/src/app/config/apiClient";
import { useMutation } from "@tanstack/react-query";

export const useLikePost = (id: string | null) => {
    return useMutation({
        mutationFn: async () => {
            const response = await apiClient.post(`/feeds/${id}/like`)
            return response.data
        },
        onSuccess: () => {
            console.log("Like successful")
        },
        onError: (error: any) => {
            console.log("Like failed", error?.response?.data)
        }
    })
}
