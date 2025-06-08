import { useEffect } from "react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import EventSource from "react-native-sse";

export const useBidsData = (id: string | null) => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["bids", id],
    queryFn: async () => {
      const res = await fetch(
        `https://watermelon-backend-production.up.railway.app/api/bids/${id}`
      );
      if (!res.ok) throw new Error("Failed to fetch bids");
      return await res.json();
    },
    staleTime: Infinity,
    retry: 2,
    enabled: !!id,
  });

  useEffect(() => {
    if (!id) return;

    const eventSource = new EventSource(
      `https://watermelon-backend-production.up.railway.app/api/bids/stream/${id}`
    );

    eventSource.addEventListener("open", () => {
      console.log("SSE connected");
    });

    eventSource.addEventListener("message", (event) => {
      const data = JSON.parse(event?.data || "{}");

      queryClient.setQueryData(["bids", id], (old: any[] = []) => {
        if (old.some((bid) => bid.id === data.id)) return old;
        return [...old, data];
      });
    });

    eventSource.addEventListener("error", (err) => {
      console.log("SSE error:", err);
      eventSource.close();
    });

    return () => {
      eventSource.close();
    };
  }, [id, queryClient]);

  return query;
};
