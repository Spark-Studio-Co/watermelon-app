import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/src/app/config/apiClient";
import { AxiosError } from "axios";

export const useApproveApplication = () => {
  return useMutation<void, AxiosError, string>({
    mutationKey: ["approveApplication"],
    mutationFn: async (requestId) => {
      await apiClient.patch(`/markers/access-request/${requestId}/approve`);
    },
    retry: 1,
  });
};
