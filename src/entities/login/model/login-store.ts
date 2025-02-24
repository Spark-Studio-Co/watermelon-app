import { create } from 'zustand'

interface ILoginStore {
    username: string
    password: string
    setUsername: (username: string) => void
    setPassword: (password: string) => void
}

export const useLoginStore = create<ILoginStore>(
    (set) => ({
        username: '',
        password: '',
        setUsername: (username: string) => set({ username: username }),
        setPassword: (password: string) => set({ password: password }),
    })
)