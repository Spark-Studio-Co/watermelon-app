import { create } from "zustand"
import { Comment } from "@/src/features/comments/types/comment"

interface ICommentsStore {
    comments: Comment[]
    addComment: (comment: Comment) => void
}

export const useCommentsStore = create<ICommentsStore>(
    (set) => ({
        comments: [{
            nickname: "@Yayz0",
            comment: 'Nice photo!',
            date: '9:20',
        },
        {
            nickname: "@novihype",
            comment: 'Same here!',
            date: '9:21',
        },
        {
            nickname: "@a3a4stoboi",
            comment: 'I dropped my wallet there :(',
            date: '9:24',
        },],
        addComment: (comment: Comment) => set((state) => ({
            comments: [...state.comments, comment],
        }))
    })
)
