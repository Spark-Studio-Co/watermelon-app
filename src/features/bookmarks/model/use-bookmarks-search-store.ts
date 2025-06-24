import { create } from 'zustand';

interface BookmarksSearchState {
  search: string;
  setSearch: (search: string) => void;
}

export const useBookmarksSearchStore = create<BookmarksSearchState>((set) => ({
  search: '',
  setSearch: (search) => set({ search }),
}));
