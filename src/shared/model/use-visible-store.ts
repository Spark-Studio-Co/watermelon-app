import { create, StoreApi, UseBoundStore } from "zustand";

interface IVisibleStore {
    isVisible: boolean
    open: () => void
    close: () => void
    toggle: () => void
    setActive: (active: boolean) => void
}

const visibleStorage: Record<string, UseBoundStore<StoreApi<IVisibleStore>>> = {};

export const useVisibleStore = (storeKey: string) => {
    if (!visibleStorage[storeKey]) {
        visibleStorage[storeKey] = create<IVisibleStore>(
            (set) => ({
                isVisible: false,
                open: () => set(() => ({ isVisible: true })),
                close: () => set(() => ({ isVisible: false })),
                toggle: () => set((state) => ({ isVisible: !state.isVisible })),
                setActive: (active: boolean) => set(() => ({ isVisible: active }))
            }))
    }
    return visibleStorage[storeKey]();
}
