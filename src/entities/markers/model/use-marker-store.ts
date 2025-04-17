import { create } from "zustand";

import { ICreateMarkerDTO } from "../api/dto/create-marker.dto";

interface IMarkerStore extends ICreateMarkerDTO {
    setType: (type: string) => void;
    setLatitude: (value: number | null) => void;
    setLongitude: (value: number | null) => void;
    setName: (name: string | undefined) => void;
    setDescription: (description: string | undefined) => void;
    setOwnerId: (ownerId: string | null) => void;
    setIsPrivate: (isPrivate: boolean) => void;
    setRadius: (radius: number | undefined) => void;
    setRadiusColor: (radiusColor: string | undefined) => void;
    setImage: (image: any | undefined) => void;
    setId: (id: string) => void
    id: string
    reset: () => void;
}

const initialState: ICreateMarkerDTO = {
    type: null,
    latitude: null,
    longitude: null,
    name: undefined,
    description: undefined,
    ownerId: null,
    isPrivate: false,
    radius: undefined,
    radiusColor: undefined,
    image: undefined,
};

export const useMarkerStore = create<IMarkerStore>((set) => ({
    ...initialState,

    id: '',
    setId: (id: string) => set({ id }),
    setType: (type) => set({ type }),
    setLatitude: (value) => set({ latitude: value }),
    setLongitude: (value) => set({ longitude: value }),
    setName: (name) => set({ name }),
    setDescription: (description) => set({ description }),
    setOwnerId: (ownerId) => set({ ownerId }),
    setIsPrivate: (isPrivate) => set({ isPrivate }),
    setRadius: (radius) => set({ radius }),
    setRadiusColor: (radiusColor) => set({ radiusColor }),
    setImage: (image) => set({ image }),

    reset: () => set({ ...initialState }),
}));