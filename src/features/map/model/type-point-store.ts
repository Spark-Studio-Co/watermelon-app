import { create } from "zustand";

interface ITypePoint {
    type: string
    setType: (type: string) => void
}

export const useTypePointStore = create<ITypePoint>(
    (set) => ({
        type: '',
        setType: (type: string) => set({ type: type })
    })
)