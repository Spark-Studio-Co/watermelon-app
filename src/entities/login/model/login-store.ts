import { create } from 'zustand'

interface ILoginStore {
    email: string
    password: string
    setEmail: (email: string) => void
    setPassword: (password: string) => void
    responseData: any
    setResponseData: (data: any) => void
}

export const useLoginStore = create<ILoginStore>(
    (set) => ({
        email: '',
        password: '',
        responseData: '',
        setEmail: (email: string) => set({ email: email }),
        setPassword: (password: string) => set({ password: password }),
        setResponseData: (data: any) => set({ responseData: data })
    })
)