import { create } from 'zustand';

interface AccountCreationState {
  // Form fields
  fullName: string;
  username: string;
  
  // UI state
  isLoading: boolean;
  usernameError: string | null;
  
  // Actions
  setFullName: (fullName: string) => void;
  setUsername: (username: string) => void;
  setUsernameError: (error: string | null) => void;
  setIsLoading: (loading: boolean) => void;
  validateUsername: (username: string) => boolean;
  resetForm: () => void;
  canSubmit: () => boolean;
}

export const useAccountCreationStore = create<AccountCreationState>((set, get) => ({
  // Initial state
  fullName: '',
  username: '',
  isLoading: false,
  usernameError: null,
  
  // Actions
  setFullName: (fullName: string) => set({ fullName }),
  
  setUsername: (username: string) => {
    set({ username });
    // Clear error when user starts typing
    if (get().usernameError) {
      set({ usernameError: null });
    }
  },
  
  setUsernameError: (error: string | null) => set({ usernameError: error }),
  
  setIsLoading: (loading: boolean) => set({ isLoading: loading }),
  
  validateUsername: (username: string) => {
    // Username should only contain letters, numbers, and underscores
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    
    if (!username.trim()) {
      set({ usernameError: 'Username is required' });
      return false;
    }
    
    if (username.length < 3) {
      set({ usernameError: 'Username must be at least 3 characters' });
      return false;
    }
    
    if (!usernameRegex.test(username)) {
      set({ usernameError: 'Only letters, numbers and underscores allowed' });
      return false;
    }
    
    set({ usernameError: null });
    return true;
  },
  
  resetForm: () => set({
    fullName: '',
    username: '',
    isLoading: false,
    usernameError: null,
  }),
  
  canSubmit: () => {
    const { fullName, username, isLoading, usernameError } = get();
    return fullName.trim() !== '' && 
           username.trim() !== '' && 
           !isLoading && 
           !usernameError;
  },
}));
