import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/src/app/config/apiClient";

import { IGetUsersRDO } from "./rdo/get-users.rdo";

export const useGetUsers = () => {
    return useQuery<IGetUsersRDO>({
        queryKey: ["users"],
        queryFn: async () => {
            const response = await apiClient.get("/users")
            return response.data
        },
        staleTime: 1000 * 60 * 5,
        retry: 2
    })
}
