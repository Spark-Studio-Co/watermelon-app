import { create } from "zustand";

import { ICreateMarkerDTO } from "../api/dto/create-marker.dto";

interface IMarkerStore extends ICreateMarkerDTO {
  setStartBet: (startBet: number) => void;
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
  setId: (id: string) => void;
  id: string;
  startBet: number | null;
  reset: () => void;
}

const initialState: ICreateMarkerDTO = {
  type: null,
  latitude: null,
  longitude: null,
  name: undefined,
  description: undefined,
  ownerId: null,
  isPrivate: true, // Changed default to true for privacy by default
  radius: undefined,
  radiusColor: undefined,
  image: undefined,
};

export const useMarkerStore = create<IMarkerStore>((set) => ({
  ...initialState,

  id: "",
  startBet: null,
  setId: (id: string) => set({ id }),
  setStartBet: (startBet: number) => set({ startBet }),
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
