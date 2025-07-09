import { Key } from "react";
import { create } from "zustand";

interface CategoryState {
  categoryId: string;
  setCategoryId: (id: Key | null) => void;
}

const useCategoryStore = create<CategoryState>((set) => ({
  categoryId: "",
  setCategoryId: (id: Key | null) => set({ categoryId: `${id}` }),
}));

export default useCategoryStore;
