import { create } from "zustand";

interface IUserStore {
    name: string;
    username: string;
    password: string;
    confirmPassword: string;
    setName: (name: string) => void;
    setUserName: (username: string) => void;
    setPassword: (password: string) => void;
    setConfirmPassword: (confirmPassword: string) => void;
}

export const useUserData = create<IUserStore>((set) => ({
    name: '',
    username: '',
    password: '',
    confirmPassword: '',

    setName: (name) => set({ name }),
    setUserName: (username) => set({ username }),
    setPassword: (password) => set({ password }),
    setConfirmPassword: (confirmPassword) => set({ confirmPassword }),
}));