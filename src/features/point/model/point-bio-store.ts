import { create } from "zustand";

interface IPointBio {
    subscribed: boolean
    setSubscribed: () => void
}

export const usePointBioStore = create<IPointBio>(
    (set) => ({
        subscribed: false,
        setSubscribed: () => set((state) => ({ subscribed: !state.subscribed }))
    })
)