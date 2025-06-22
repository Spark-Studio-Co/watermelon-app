import { useMutation } from "@tanstack/react-query";
import { apiClient } from "@/src/app/config/apiClient";
import { AxiosError } from "axios";

export const useSubscribePremium = () => {
  return useMutation<void, AxiosError>({
    mutationKey: ["subscribePremium"],
    mutationFn: async () => {
      await apiClient.post("/users/premium/mock");
      console.log("✅ Подписка на премиум выполнена");
    },
    retry: 2,
    retryDelay: 1000,
  });
};
