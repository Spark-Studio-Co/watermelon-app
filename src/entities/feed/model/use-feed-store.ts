import { create } from "zustand";

interface IFeedStore {
    postId: string | null
    setPostId: (postId: string) => void
}

export const useFeedStore = create<IFeedStore>(
    (set) => ({
        postId: null,
        setPostId: (postId) => set({ postId })
    })
)