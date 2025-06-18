import { apiClient } from "@/src/app/config/apiClient";
import { useQuery } from "@tanstack/react-query";

export const useCheckNickname = (username: string) => {
  return useQuery({
    queryKey: ["check-nickname"],
    queryFn: () =>
      apiClient.get(`/users/user/check-username?username=${username}`),
    enabled: !!username,
    retry: 2,
    staleTime: 1000 * 60 * 5,
  });
};
