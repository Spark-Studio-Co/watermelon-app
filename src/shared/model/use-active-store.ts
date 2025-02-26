import { create, StoreApi, UseBoundStore } from "zustand";

interface IActiveStore {
    active: string | null
    setActive: (active: string) => void
}

const activeStorage: Record<string, UseBoundStore<StoreApi<IActiveStore>>> = {};

export const useActiveStore = (storeKey: string, dafaultActive: string | null) => {
    if (!activeStorage[storeKey]) {
        activeStorage[storeKey] = create<IActiveStore>((set) => ({
            active: dafaultActive,
            setActive: (active: string) => set({ active })
        }))
    }
    return activeStorage[storeKey]();
}