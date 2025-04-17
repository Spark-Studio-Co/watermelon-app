import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/src/app/config/apiClient";

export const useUploadImage = () => {
    return useMutation({
        mutationFn: async (FormData: FormData) => {
            const response = await apiClient.post('/feeds/upload-feed', FormData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            )
            return response.data
        },
        onSuccess: (data: any) => {
            console.log("Image uploaded", data)
        },
        onError: (error: any) => {
            console.log("Image upload failed", error?.response?.data)
        }
    })
}

