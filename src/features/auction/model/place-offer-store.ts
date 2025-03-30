import { create } from "zustand";

type Offer = {
    points: number
    date: string
    time: string
}

interface IPlaceOffer {
    offer: Offer
    setOffer: (offer: Offer) => void
}

export const usePlaceOfferStore = create<IPlaceOffer>((set) => ({
    offer: {
        points: 0,
        date: '',
        time: ''
    },
    setOffer: (offer) => set({ offer })
}))
