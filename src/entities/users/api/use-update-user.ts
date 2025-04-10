import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/src/app/config/apiClient";

export const useUpdateUser = (id: string | null) => {
    return useMutation({
        mutationFn: async (data: FormData) => {
            const response = await apiClient.patch(`/users/update/${id}`, data);
            return response.data;
        },
    });
};