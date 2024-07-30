import { create } from "zustand";

type OpenEditCategoryState = {
    id?: string;
    isOpen: boolean;
    onOpen: (id: string) => void;
    onClose: () => void;
}

type OpenNewCategoryState = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useOpenEditCategory = create<OpenEditCategoryState>((set) =>({
    id: undefined,
    isOpen: false,
    onOpen: (id: string) => set({ isOpen: true, id }),
    onClose: () => set({ isOpen: false , id: undefined})
}));

export const useOpenNewCategoryButton = create<OpenNewCategoryState>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({ isOpen: false})
}));