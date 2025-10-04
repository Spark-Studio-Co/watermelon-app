import { create } from "zustand";

interface ISendVerificationStore {
  email: string;
  secretKey: string;
  setEmail: (email: string) => void;
  setSecretKey: (secretKey: string) => void;
  clearForm: () => void;
}

export const useSendVerificationStore = create<ISendVerificationStore>(
  (set, get) => ({
    email: "",
    secretKey: "",
    setEmail: (email: string) => set({ email: email }),
    setSecretKey: (secretKey: string) => set({ secretKey: secretKey }),
    clearForm: () => {
      // Сохраняем email для использования в других формах, очищаем только secretKey
      set({ secretKey: "" });
    },
  })
);
