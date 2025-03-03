import { create } from "zustand";

interface IActiveButtonStore {
    active: string
    setActive: (active: string) => void
}

export const useActiveStore = create<IActiveButtonStore>(
    (set) => ({
        active: 'Dashboard',
        setActive: (active: string) => set({ active: active })
    })
)