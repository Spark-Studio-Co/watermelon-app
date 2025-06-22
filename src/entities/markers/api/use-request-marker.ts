import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/src/app/config/apiClient";
import { AxiosError } from "axios";

export const useRequestMarkerAccess = () => {
  return useMutation<void, AxiosError, string>({
    mutationKey: ["requestMarkerAccess"],
    mutationFn: async (markerId) => {
      await apiClient.post(`/api/markers/${markerId}/access-request`);
    },
    retry: 2,
    retryDelay: 1000,
  });
};
