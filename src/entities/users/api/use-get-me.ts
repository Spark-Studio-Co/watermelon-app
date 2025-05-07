import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/src/app/config/apiClient";

import { IUserMeRDO } from "./rdo/user-me.rdo";

export const useGetMe = () => {
    return useQuery<IUserMeRDO>({
        queryKey: ['userMe'],
        queryFn: async () => {
            const response = await apiClient.get("/users/get/me")
            return response.data
        },
        staleTime: 1000 * 60 * 5,
        retry: 2
    })
}

