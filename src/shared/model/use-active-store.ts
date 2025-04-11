import { create, StoreApi, UseBoundStore } from "zustand";

interface IActiveStore {
    active: string | null | boolean
    setActive: (active: string | boolean) => void
    toggle: (active: string | boolean) => void
}

const activeStorage: Record<string, UseBoundStore<StoreApi<IActiveStore>>> = {};

export const useActiveStore = (storeKey: string, defaultActive: string | null | boolean) => {
    if (!activeStorage[storeKey]) {
        activeStorage[storeKey] = create<IActiveStore>((set) => ({
            active: defaultActive,
            setActive: (active: string | boolean) => set({ active }),
            toggle: (active: string | boolean) => set((state) => ({ active: state.active === active ? null : active }))
        }));
    }
    return activeStorage[storeKey]();
}