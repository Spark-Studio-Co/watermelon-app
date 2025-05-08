import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/src/app/config/apiClient";

export type RequestAction = true | false;

type FriendRequestVariables = {
    id: string | null;
    accept: RequestAction;
};

export const useFriendRequestAction = () => {
    return useMutation({
        mutationFn: async (variables: FriendRequestVariables) => {
            const { id, accept } = variables;
            const response = await apiClient.patch(`/users/friend-request/${id}`, { accept: accept });
            return response.data;
        }
    });
}