import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/src/app/config/apiClient";
import { AxiosError } from "axios";

export const useCreateMarker = () => {
    return useMutation<void, AxiosError, FormData>({
        mutationFn: async (formData) => {
            const response = await apiClient.post("/markers", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        }
    });
};