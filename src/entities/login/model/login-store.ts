import { create } from 'zustand'

interface ILoginStore {
    email: string
    password: string
    setEmail: (email: string) => void
    setPassword: (password: string) => void
}

export const useLoginStore = create<ILoginStore>(
    (set) => ({
        email: '',
        password: '',
        setEmail: (email: string) => set({ email: email }),
        setPassword: (password: string) => set({ password: password }),
    })
)