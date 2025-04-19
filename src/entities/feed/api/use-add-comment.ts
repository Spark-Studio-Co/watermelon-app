import { apiClient } from "@/src/app/config/apiClient"
import { useMutation } from "@tanstack/react-query"

import { IAddCommentDTO } from "./dto/use-add-comment.dto"

export const useAddComment = (id: string | null) => {
    return useMutation({
        mutationFn: async (data: IAddCommentDTO) => {
            const response = await apiClient.post(`/feeds/${id}/comments`, data)
            return response.data
        },
        onSuccess: () => {
            console.log("Comment added")
        },
        onError: (error: any) => {
            console.log("Comment error", error?.response?.data)
        }
    })
}