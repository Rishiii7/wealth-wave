import { create } from "zustand";

type OpenEditAccountState = {
    id?: string;
    isOpen: boolean;
    onOpen: (id: string) => void;
    onClose: () => void;
}

export const useOpenEditAccount = create<OpenEditAccountState>((set) =>({
    id: undefined,
    isOpen: false,
    onOpen: (id: string) => set({ isOpen: true, id }),
    onClose: () => set({ isOpen: false , id: undefined})
}));