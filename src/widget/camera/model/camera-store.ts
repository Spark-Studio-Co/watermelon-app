import { create, StoreApi, UseBoundStore } from "zustand";

export interface ICameraWidget {
    image: string | null;
    setImage: (uri: string | null) => void;
    clearImage: () => void;
}

const imagesStorage: Record<string, UseBoundStore<StoreApi<ICameraWidget>>> = {};

export const initCameraStore = (storeKey: string) => {
    if (!imagesStorage[storeKey]) {
        imagesStorage[storeKey] = create<ICameraWidget>((set) => ({
            image: null,
            setImage: (uri) => set({ image: uri }),
            clearImage: () => set({ image: null }),
        }));
    }
    return imagesStorage[storeKey];
};

export const useCameraStore = (storeKey: string) => {
    return initCameraStore(storeKey)();
};