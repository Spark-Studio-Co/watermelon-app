import { apiClient } from "@/src/app/config/apiClient";
import { useMutation } from "@tanstack/react-query";

export const useUnlikePost = (id: string | null) => {
    return useMutation({
        mutationFn: async () => {
            const response = await apiClient.post(`/feeds/${id}/unlike`)
            return response.data
        },
        onSuccess: () => {
            console.log("Unlike successful")
        },
        onError: (error: any) => {
            console.log("Unlike failed", error?.response?.data)
        }
    })
}
