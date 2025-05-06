import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/src/app/config/apiClient";

export type TasksCategories = 'Coins' | 'Exp' | 'Boost'

export const useTasksData = (category: TasksCategories) => {
    const queryKey = ['tasks', category]
    return useQuery({
        queryKey: queryKey,
        queryFn: async () => {
            const response = apiClient.get(`/tasks?category=${category}`)
            return (await response).data
        }
    })
}