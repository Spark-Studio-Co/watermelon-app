import { apiClient } from "@/src/app/config/apiClient";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useUpdateMarker = (id: string) => {
    return useMutation<void, AxiosError, FormData>({
        mutationKey: ['updateMarker', id],
        mutationFn: async (formData: FormData) => {
            const response = await apiClient.patch(`/markers/${id}`, formData);
            return response.data;
        },
    });
};