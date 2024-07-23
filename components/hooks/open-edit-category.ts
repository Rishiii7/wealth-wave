import { create } from "zustand";

type OpenEditCategoryState = {
    id?: string;
    isOpen: boolean;
    onOpen: (id: string) => void;
    onClose: () => void;
}

export const useOpenEditCategory = create<OpenEditCategoryState>((set) =>({
    id: undefined,
    isOpen: false,
    onOpen: (id: string) => set({ isOpen: true, id }),
    onClose: () => set({ isOpen: false , id: undefined})
}));