import { create, StoreApi, UseBoundStore } from "zustand";

interface IActiveStore {
    active: string | null
    setActive: (active: string) => void
}

const activeStorage: Record<string, UseBoundStore<StoreApi<IActiveStore>>> = {};

export const useActiveStore = (storeKey: string, defaultActive: string | null) => {
    if (!activeStorage[storeKey]) {
        activeStorage[storeKey] = create<IActiveStore>((set) => ({
            active: defaultActive,
            setActive: (active: string) => set({ active })
        }));
    }
    return activeStorage[storeKey]();
}