import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/src/app/config/apiClient";
import { AxiosError } from "axios";

export const useDeclineApplication = () => {
  return useMutation<void, AxiosError, string>({
    mutationKey: ["declineApplication"],
    mutationFn: async (requestId) => {
      await apiClient.patch(`/markers/access-request/${requestId}/decline`);
    },
    retry: 1,
  });
};
