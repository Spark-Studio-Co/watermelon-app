import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/src/app/config/apiClient";
import { AxiosError } from "axios";

import { IUpdateNotificationsDTO } from "./dto/update-notification.dto";

export const useUpdateNotifications = (id: string | null) => {
    return useMutation<void, AxiosError, IUpdateNotificationsDTO>({
        mutationKey: ['updateNotifications', id],
        mutationFn: async (data) => {
            if (!id) throw new Error("User ID is required");
            await apiClient.patch(`/users/update-notifications/${id}`, data)
        },
        retry: 2,
        retryDelay: 1000,
    })
}
