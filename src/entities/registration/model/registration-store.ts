import { create } from "zustand";

interface IRegistrationStore {
    email: string
    secretKey: string
    setEmail: (email: string) => void
    setSecretKey: (secretKey: string) => void
}

export const useRegistrationStore = create<IRegistrationStore>(
    (set) => ({
        email: '',
        secretKey: '',
        setEmail: (email: string) => set({ email: email }),
        setSecretKey: (secretKey: string) => set({ secretKey: secretKey })
    })
)