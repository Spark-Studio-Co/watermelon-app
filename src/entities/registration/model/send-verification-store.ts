import { create } from "zustand";

interface ISendVerificationStore {
  email: string;
  secretKey: string;
  setEmail: (email: string) => void;
  setSecretKey: (secretKey: string) => void;
  clearForm: () => void;
}

export const useSendVerificationStore = create<ISendVerificationStore>(
  (set) => ({
    email: "",
    secretKey: "",
    setEmail: (email: string) => set({ email: email }),
    setSecretKey: (secretKey: string) => set({ secretKey: secretKey }),
    clearForm: () => set({ email: "", secretKey: "" }),
  })
);
