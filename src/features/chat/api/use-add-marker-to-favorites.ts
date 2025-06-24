import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addMarkerToFavorites } from "./chat-api";

export const useAddMarkerToFavorites = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (markerId: string) => addMarkerToFavorites(markerId),
    onSuccess: () => {
      // Invalidate the favorites query to refresh the data
      queryClient.invalidateQueries({ queryKey: ["favChats"] });
    }
  });
};
