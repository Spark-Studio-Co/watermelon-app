import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/src/app/config/apiClient";
import { AxiosError } from "axios";

import { IUpdatePrivacyDTO } from "./dto/update-privacy.dto";

export const useUpdatePrivcy = (id: string | null) => {
    return useMutation<void, AxiosError, IUpdatePrivacyDTO>({
        mutationKey: ['updatePrivacy', id],
        mutationFn: async (data) => {
            if (!id) throw new Error("User ID is required");
            await apiClient.patch(`/users/update-privacy/${id}`, data)
        },
        retry: 2,
        retryDelay: 1000,
    })
}
