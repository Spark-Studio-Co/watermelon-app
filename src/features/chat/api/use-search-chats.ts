import { useQuery } from "@tanstack/react-query";
import { searchChats } from "./chat-api";

/**
 * Custom hook for searching chats by query string
 * @param query The search query string
 * @returns Query result with chat search data
 */
export const useSearchChats = (query: string) => {
  return useQuery({
    queryKey: ["searchChats", query],
    queryFn: () => searchChats(query),
    enabled: !!query && query.trim().length > 0,
    staleTime: 1000 * 60, // 1 minute
  });
};
