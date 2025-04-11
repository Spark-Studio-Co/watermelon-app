import { apiClient } from "@/src/app/config/apiClient";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useSendFriendRequest = () => {
    return useMutation<void, AxiosError, string>({
        mutationKey: ['friendRequest'],
        mutationFn: async (receiverId) => {
            const response = await apiClient.post(`/users/friend-request/${receiverId}`);
            return response.data;
        }
    });
};
