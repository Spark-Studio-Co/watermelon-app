import { create } from "zustand";

interface IMarkerPosition {
    markerPosition: { latitude: number, longitude: number } | null
    setMarkerPosition: (position: { latitude: number, longitude: number } | null) => void
}

export const useMarkerPositionStore = create<IMarkerPosition>(
    (set) => ({
        markerPosition: null,
        setMarkerPosition: (position: { latitude: number, longitude: number } | null) => set({ markerPosition: position })
    })
)