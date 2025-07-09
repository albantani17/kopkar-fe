import { create } from "zustand";

interface SearchState {
  search: string;
  setSearch: (search: string) => void;
}

const useSearchStore = create<SearchState>((set) => ({
  search: "",
  setSearch: (search: string) => set({ search }),
}));

export default useSearchStore;
