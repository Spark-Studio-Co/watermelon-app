import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/src/app/config/apiClient";

import { IGetUsersRDO } from "./rdo/get-users.rdo";

export const useGetUsers = (id?: string) => {
    return useQuery<IGetUsersRDO>({
        queryKey: id ? ["usersById", id] : ["users"],
        queryFn: async () => {
            const url = id ? `/users/${id}` : '/users'
            const response = await apiClient.get(url)
            return response.data
        },
        staleTime: 1000 * 60 * 5,
        retry: 2
    })
}
