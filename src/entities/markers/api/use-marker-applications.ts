import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/src/app/config/apiClient";
import { AxiosError } from "axios";

export interface AccessRequest {
  markerId: string;
  id: string;
  username: string;
  name: string;
}

export const useMarkerApplications = (markerId: string | null) => {
  return useQuery<AccessRequest[], AxiosError>({
    queryKey: ["markerApplications", markerId],
    queryFn: async () => {
      const { data } = await apiClient.get(
        `/markers/${markerId}/access-requests`
      );
      return data;
    },
    enabled: !!markerId,
  });
};
